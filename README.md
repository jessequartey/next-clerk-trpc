# Next.js + Clerk + tRPC (T3 setup)

Clerk core 2.0 came with a new setup which frustrated me a bit.  
I have setup Clerk middleware, tRPC protectedProcedure, clerk webhooks and a few other things.
Feel free to use this as a starting point for your own project.
You can contribute to it to improve it. Clerk all the way.
By the way i hope you like shadcn UI too.

## To get started

1. Clone the repository and install the dependencies:

   ```bash
   # Clone repository
   git clone git@github.com:jessequartey/next-clerk-trpc.git

   # Install dependencies
   npm i
   ```

2. Copy `.env.example` to `.env` and update the variables accordingly.

   ```bash
   cp .env.example .env
   ```

3. Sync the Drizzle schema with your database

   ```bash
   npm db:push
   ```

4. Start the development server:

   ```bash
   npm dev
   ```
