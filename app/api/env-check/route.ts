export async function GET() {
  return Response.json({
    hasServiceDomain: !!process.env.MICROCMS_SERVICE_DOMAIN,
    hasApiKey: !!process.env.MICROCMS_API_KEY,
  });
}
