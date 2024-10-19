import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./config";

async function validateRecaptcha(token: string): Promise<boolean> {
  const verificationUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/assessments?key=${process.env.RECAPTCHA_SECRET_KEY}`;
  
  const response = await fetch(verificationUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: {
        token,
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        expectedAction: 'submit',
      }
    })
  });

  const data = await response.json();
  return data.tokenProperties.valid && data.riskAnalysis.score > 0.5;
}

export async function middleware(request: NextRequest) {
  const recaptchaToken = request.headers.get('recaptcha-token');

  if (!recaptchaToken) {
    return NextResponse.json({ message: 'reCAPTCHA token is missing' }, { status: 400 });
  }

  const isRecaptchaValid = await validateRecaptcha(recaptchaToken);

  if (!isRecaptchaValid) {
    return NextResponse.json({ message: 'Invalid reCAPTCHA' }, { status: 400 });
  }

  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
