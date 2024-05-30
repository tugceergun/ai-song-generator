
import crypto from "crypto";
import type { NextRequest } from "next/server";
import Replicate from "replicate";

import { env } from "~/env";

function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});

const customVoiceWebhookHandler = async (req: NextRequest) => {
  const rawBody = await req.text();

  // verify this request if this is coming from replicate, if it is not, send forbidden access code
  const webhook_id = req.headers.get("Webhook-Id");
  const webhook_timestamp = req.headers.get("Webhook-Timestamp");
  const webhook_signatures_from_replicate =
    req.headers.get("webhook-signature");

  const signedContent = `${webhook_id}.${webhook_timestamp}.${rawBody}`;

  const secretFromReplicate = await replicate.webhooks.default.secret.get();

  const secret = secretFromReplicate.key;

  if (!secret) {
    return Response.json(
      { message: "replicate server is not responding!" },
      {
        status: 400,
      },
    );
  }

  // Base64 decode the secret
  const secretBytes = Buffer.from(secret.split("_")[1]!, "base64");
  const signature = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  const expectedSignatures = webhook_signatures_from_replicate
    ?.split(" ")
    .map((sig) => sig.split(",")[1]);

  const isValid = expectedSignatures?.some(
    (expectedSignature) => expectedSignature === signature,
  );

  if (!isValid) {
    return Response.json(
      { message: "signatures don't match!" },
      {
        status: 403,
      },
    );
  }

  console.log(
    "signature matched, starting training new model",
    "we are inside voice dataset finished webhook",
  );

  const parsedBody = JSON.parse(rawBody);

  const { searchParams } = new URL(req.url);

  const voiceId = searchParams.get("voiceId");

  if (!parsedBody?.output) {
    return Response.json(
      { message: "output zip file not found!" },
      {
        status: 400,
      },
    );
  }

  
  await replicate.predictions.create({
    version: "0397d5e28c9b54665e1e5d29d5cf4f722a7b89ec20e9dbf31487235305b1a101",
    input: {
      epoch: 80,
      version: "v2",
      f0method: "rmvpe_gpu",
      batch_size: "7",
      dataset_zip: parsedBody?.output,
      sample_rate: "48k",
    },
    webhook: `${process.env.REPLICATE_WEBHOOK_URL}/api/replicate/model-training-finished?voiceId=${voiceId}`,
    webhook_events_filter: ["completed"],
  });

  

  return Response.json({ hello: "world" });
};

export { customVoiceWebhookHandler as POST };