This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack
This project has been set up with the following additional tools:
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM
- **PostgreSQL** (`pg`) - Database driver
- **[Zod](https://zod.dev/)** - Schema validation
- **Dotenv** - Environment variable management

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Local development 

```
docker run --name questboard-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=questboard -p 54331:5432 -d postgres:18-alpine
```

## Database Management

This project uses [Drizzle ORM](https://orm.drizzle.team/) and [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview). The following scripts are available for managing the database:

- `pnpm run db:generate` - Generate SQL migration files based on schema changes.
- `pnpm run db:migrate` - Run pending migrations against the database.
- `pnpm run db:check` - Check for schema mismatches.
- `pnpm run db:studio` - Launch Drizzle Studio, a visual database explorer.
- `pnpm run db:push` - Push schema changes directly to the database (useful for rapid prototyping).

## Database Structure

Below is the entity-relationship diagram of our current database schema:

```mermaid
erDiagram
    quest_status {
        enum draft
        enum active
        enum completed
        enum archived
    }
```