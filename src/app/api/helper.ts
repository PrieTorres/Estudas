interface ResponseReq {
  message: string;
  status: number;
}

export function checkAuth(req: Request): ResponseReq | undefined {
  const TOKEN = process.env.AUTH_TOKEN;

  if (!TOKEN) {
    return { message: "Server configuration error: AUTH_TOKEN is not set", status: 500 };
  }

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== TOKEN) {
    return { message: "Unauthorized",  status: 401 };
  }
}