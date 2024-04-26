import { Webhook } from "svix";
import { env } from "@/env";
import { db } from "@/server/db";

import type { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { users } from "@/server/db/schema";

// check out the documentation for more details

export async function POST(request: Request) {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await request.json();

  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  switch (eventType) {
    // Below will create a new user when the user is created
    case "user.created": {
      const user = await db.query.users.findFirst({
        where: eq(users.userId, evt.data.id),
      });

      if (!user) {
        await db.insert(users).values({
          userId: evt.data.id,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          email: evt.data.email_addresses[0]?.email_address,
        });
        console.log("user created");
        return new Response("success", { status: 200 });
      }
      if (user) {
        console.log("user exist");
        return new Response("user already exists", { status: 200 });
      }
    }
    // Incase you want to update the user data
    case "user.updated": {
      await db
        .update(users)
        .set({
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          email: evt.data.email_addresses[0]?.email_address,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where(eq(users.userId, evt.data.id));

      console.log("user updated");
      return new Response("success", { status: 200 });
    }

    default: {
      return console.error("Unknown event type:", eventType);
    }
  }
}
