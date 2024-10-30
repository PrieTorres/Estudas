export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const verificationUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/assessments?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;

      const response = await fetch(verificationUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: {
            token,
            siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            expectedAction: 'submit'
          }
        })
      });

      const data = await response.json();

      if (data.tokenProperties.valid && data.riskAnalysis.score > 0.5) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, error: 'Invalid token' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).end();
  }
}
