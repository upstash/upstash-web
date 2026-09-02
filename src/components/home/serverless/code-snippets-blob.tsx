import { CodeSnippets, CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsBlob = () => {
  return <CodeSnippets data={data} codeBodyClassName="h-[420px]" />;
};

const data: CodeSnippetsData = [
  {
    title: "Upload from the server",
    snippets: [
      {
        language: "js",
        code: `
import { Bucket } from "@upstash/blob"

// Reads UPSTASH_BLOB_TOKEN
const bucket = Bucket.fromEnv()

const blob = await bucket.put("avatars/me.png", file, {
  contentType: "image/png",
})

console.log(blob.url)  // served from the global CDN

await bucket.get("avatars/me.png")   // record + ReadableStream body
await bucket.info("avatars/me.png")  // metadata only
await bucket.list({ prefix: "avatars/", limit: 100 })
await bucket.del("avatars/me.png")
`,
      },
    ],
  },
  {
    title: "Direct browser upload",
    snippets: [
      {
        language: "js",
        code: `
// lib/uploads.ts
import "server-only"
import { BlobError, uniquePath, uploadHandler } from "@upstash/blob"

export const uploads = uploadHandler({
  constraints: {
    maxBytes: "20mb",
    contentTypes: ["image/*", "application/pdf"],
  },

  onBeforeUpload: async ({ request, file }) => {
    const user = await getUser(request)
    if (!user) throw new BlobError("unauthorized")
    return {
      path: uniquePath\`\${user.id}/\${file.name}\`,
      metadata: { owner: user.id },
    }
  },

  onUploadComplete: async ({ metadata, url }) => {
    await db.files.insert({ owner: metadata.owner, url })
  },
})

// app/api/upload/route.ts
export const { GET, POST } = uploads
`,
      },
    ],
  },
  {
    title: "React hook",
    snippets: [
      {
        language: "js",
        code: `
"use client"

import { uploadHooks } from "@upstash/blob/react"
import type { uploads } from "@/lib/uploads"

const { useUpload } = uploadHooks<typeof uploads>()

export default function Page() {
  const { start, upload, accept } = useUpload()

  return (
    <div>
      <input
        type="file"
        accept={accept}
        onChange={(e) => start({ file: e.target.files?.[0] })}
      />

      {upload?.pending && (
        <progress value={upload.percent} max={100} />
      )}
      {upload?.status === "done" && (
        <a href={upload.blob.url}>{upload.blob.path}</a>
      )}
    </div>
  )
}
`,
      },
    ],
  },
  {
    title: "Signed URLs",
    snippets: [
      {
        language: "js",
        code: `
import { Bucket } from "@upstash/blob"

// Token of a private bucket: no public URLs, every read is signed
const bucket = Bucket.fromEnv()

// Short-lived read link
const { url, expiresAt } = await bucket.signedReadUrl(
  "private/report.pdf",
  { downloadAs: "report.pdf" },
)

// Let a client PUT straight to storage
const upload = await bucket.signedUploadUrl("u/7/report.pdf", {
  contentType: "application/pdf",
  size,
})

await fetch(upload.url, {
  method: "PUT",
  headers: upload.headers,
  body,
})
`,
      },
    ],
  },
  {
    title: "Use the S3 API",
    snippets: [
      {
        language: "js",
        code: `
import { Bucket } from "@upstash/blob"
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"

const bucket = Bucket.fromEnv()

// Temporary S3 credentials, refreshed automatically
const { endpoint, region, bucket: name, credentials } = bucket.s3()

const s3 = new S3Client({ endpoint, region, credentials })

const { Contents } = await s3.send(
  new ListObjectsV2Command({ Bucket: name, Prefix: "avatars/" }),
)

console.log(Contents?.map((o) => o.Key))
`,
      },
    ],
  },
];
