import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  const response = await fetch(
    `${process.env.STRAPI_API_BASE_URL}/api/${path}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_ACCESS_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
