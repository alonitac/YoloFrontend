import { NextRequest, NextResponse } from "next/server";

const YOLO_API_URL =
  process.env.YOLO_API_URL ?? "http://localhost:8080";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxy(req, await params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxy(req, await params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxy(req, await params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxy(req, await params);
}

async function proxy(req: NextRequest, params: { path: string[] }) {
  const upstreamPath = params.path.join("/");
  const search = req.nextUrl.search;
  const url = `${YOLO_API_URL}/${upstreamPath}${search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");

  const upstream = await fetch(url, {
    method: req.method,
    headers,
    body: req.body,
    // @ts-expect-error – Node.js fetch supports duplex
    duplex: "half",
  });

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
}
