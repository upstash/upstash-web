import { CodeSnippets, type CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsBlob = () => {
  return <CodeSnippets data={data} codeBodyClassName="h-[420px]" />;
};

const data: CodeSnippetsData = [
  {
    title: "Server upload",
    description:
      "Install @upstash/blob and set UPSTASH_BLOB_TOKEN on your server. Public buckets return a CDN URL.",
    snippets: [
      {
        language: "ts",
        filename: "lib/files.ts",
        code: `
import "server-only"
import { Bucket } from "@upstash/blob"

const bucket = Bucket.fromEnv()

export async function saveImage(file: File) {
  const blob = await bucket.put("avatars/me.png", file, {
    contentType: file.type,
  })

  return blob.url // undefined for private buckets
}
`,
      },
    ],
  },
  {
    title: "Browser upload",
    description:
      "Authorize uploads on your server, then send files straight to storage with the React hook. getUser is your app's authentication helper.",
    snippets: [
      {
        language: "ts",
        filename: "lib/uploads.ts",
        code: `
import "server-only"
import { BlobError, uniquePath, uploadHandler } from "@upstash/blob"
import { getUser } from "@/lib/auth"

export const uploads = uploadHandler({
  constraints: {
    maxSize: "20mb",
    contentTypes: ["image/*", "application/pdf"],
  },
  onBeforeUpload: async ({ request, file }) => {
    const user = await getUser(request)
    if (!user) throw new BlobError("unauthorized")
    return { path: uniquePath\`\${user.id}/\${file.name}\` }
  },
})
`,
      },
      {
        language: "ts",
        filename: "app/api/upload/route.ts",
        code: `
import { uploads } from "@/lib/uploads"

export const { GET, POST } = uploads
`,
      },
    ],
  },
  {
    title: "React hook",
    description:
      "Use the handler and API route from Browser upload. The hook provides progress, results, and errors.",
    snippets: [
      {
        language: "tsx",
        filename: "app/upload/page.tsx",
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
        aria-label="Choose a file to upload"
        type="file"
        accept={accept}
        disabled={upload?.pending}
        onChange={(e) => start({ file: e.target.files?.[0] })}
      />
      {upload?.pending && (
        <progress aria-label="Upload progress" value={upload.percent} max={100} />
      )}
      {upload?.status === "done" && (
        upload.blob.url
          ? <a href={upload.blob.url}>{upload.blob.path}</a>
          : <p>Uploaded {upload.blob.path}</p>
      )}
      {upload?.status === "error" && (
        <p role="alert">{upload.error.message}</p>
      )}
    </div>
  )
}
`,
      },
    ],
  },
  {
    title: "Read & list files",
    description:
      "Read file contents and metadata, or list files by prefix. Use the returned cursor to fetch the next page.",
    snippets: [
      {
        language: "ts",
        filename: "lib/read-files.ts",
        code: `
import "server-only"
import { Bucket } from "@upstash/blob"

const bucket = Bucket.fromEnv()

const image = await bucket.get("avatars/me.png")
console.log(image.body) // ReadableStream

const info = await bucket.info("avatars/me.png")
console.log(info.size, info.contentType)

const { blobs, cursor } = await bucket.list({
  prefix: "avatars/",
  limit: 100,
})

console.log(blobs.map((blob) => blob.path), cursor)
`,
      },
    ],
  },
  {
    title: "Signed URLs",
    description:
      "Create a private bucket and set its token on your server. Check file ownership before issuing a temporary download link.",
    snippets: [
      {
        language: "ts",
        filename: "lib/downloads.ts",
        code: `
import "server-only"
import { BlobError, Bucket } from "@upstash/blob"
import { getUser } from "@/lib/auth"

const bucket = Bucket.fromEnv()

export async function downloadReport(request: Request) {
  const user = await getUser(request)
  if (!user) throw new BlobError("unauthorized")

  // The path belongs to the authenticated user.
  return bucket.signedReadUrl(\`reports/\${user.id}.pdf\`, {
    expiresIn: "5m",
    downloadAs: "report.pdf",
  })
}
`,
      },
    ],
  },
  {
    title: "S3 API",
    description:
      "Install @aws-sdk/client-s3 alongside @upstash/blob. The SDK refreshes temporary S3 credentials automatically.",
    snippets: [
      {
        language: "ts",
        filename: "lib/s3.ts",
        code: `
import "server-only"
import { Bucket } from "@upstash/blob"
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"

const bucket = Bucket.fromEnv()
const { endpoint, region, bucket: name, credentials } = bucket.s3()

const s3 = new S3Client({ endpoint, region, credentials })

const { Contents } = await s3.send(
  new ListObjectsV2Command({ Bucket: name, Prefix: "avatars/" }),
)

console.log(Contents?.map((object) => object.Key))
`,
      },
    ],
  },
];
