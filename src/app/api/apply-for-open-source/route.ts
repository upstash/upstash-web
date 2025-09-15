import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  twitter: z.string().min(1),
  githubRepo: z.string().min(1),
  notes: z.string().optional(),
});

export const POST = async (req: Request) => {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return new Response("Invalid request", { status: 400 });
  }

  const { name, twitter, githubRepo, notes } = result.data;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            name,
            twitter,
            githubRepo,
            notes,
          },
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }

  return new Response("OK", { status: 200 });
};
