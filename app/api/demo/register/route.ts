import { handleDemoRegistrationRequest } from "@/lib/demo-registration.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request): Promise<Response> {
  return handleDemoRegistrationRequest(request);
}
