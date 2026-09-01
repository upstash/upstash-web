// Questions mirror real search intent for "blob storage" and "object storage".
export const BLOB_FAQ = [
  {
    question: "What is Upstash Blob?",
    answer:
      "Upstash Blob is serverless, S3-compatible object storage for files. You create a bucket in the console, get a token, and upload from your server or straight from the browser with the @upstash/blob SDK. Public files are served from a global CDN and private files are read through signed URLs.",
  },
  {
    question: "What is blob storage?",
    answer:
      "Blob storage, also called object storage, stores files as objects in a flat namespace instead of on a filesystem or in database rows. Each object has a path, a body, a content type, and metadata. It is the standard way to store images, documents, videos, backups, and any other unstructured data at scale.",
  },
  {
    question: "Is Upstash Blob S3 compatible?",
    answer:
      "Yes. Your bucket token exchanges for temporary S3 credentials, so you can use the AWS SDK, the AWS CLI, or any S3-compatible tool alongside the @upstash/blob SDK. The SDK exposes this directly through bucket.s3(), which hands the AWS SDK a credential provider that refreshes itself.",
  },
  {
    question: "Do I need to choose a region?",
    answer:
      "No. A bucket is global. Every file is replicated to a CDN worldwide, so a reader in Singapore and a reader in Frankfurt are both served from close by without any configuration. There is one rate sheet and no charge for replication or cross-region transfer.",
  },
  {
    question: "Can users upload files directly from the browser?",
    answer:
      "Yes. The upload handler runs on your server to authorize the upload and sign it, then the browser sends the bytes straight to storage. Your server never handles the file body. Uploads over 16 MB go up as multipart, so they can pause, resume, and retry, and a completion callback runs in your own route once the object exists.",
  },
  {
    question: "Can I keep files private?",
    answer:
      "Yes. A public bucket gets its own URL and anyone with a link can read from it, while writes still require credentials. A private bucket has no public URL and every read goes through a short-lived signed URL that you generate on the server.",
  },
  {
    question: "What is the maximum file size?",
    answer:
      "5 TB per object. Files over 16 MB are uploaded as multipart automatically, and multipart is recommended for anything over 100 MB so uploads can pause, resume, and retry per part.",
  },
  {
    question: "How much does Upstash Blob cost?",
    answer:
      "Upstash Blob has a free tier with 1 GB of storage and 10 GB of bandwidth per month. Beyond that it is pay as you go: $0.02 per GB stored, $0.02 per GB of outbound bandwidth, $0.30 per million simple operations, and $4.50 per million advanced operations. Uploads and deletes are free. See the pricing page for details.",
  },
  {
    question: "How does Blob fit with the rest of Upstash?",
    answer:
      "Blob shares your Upstash account, billing, and free tier with Redis, Vector, QStash, Workflow, and Box. A common pattern is to store the file in Blob, then kick off a Workflow or QStash job from the upload completion callback to generate thumbnails, transcribe audio, or index the document in Vector.",
  },
];
