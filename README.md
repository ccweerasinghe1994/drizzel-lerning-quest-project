# Drizzel Learning Quest

A Next.js learning project for a quest and task-tracking application backed by PostgreSQL and Drizzle ORM.

## Tech Stack

- **[Next.js](https://nextjs.org/)** - Application framework
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM and migrations
- **[PostgreSQL](https://www.postgresql.org/)** with `pg` - Database
- **[Zod](https://zod.dev/)** - Schema validation
- **[Dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management
- **[Prettier](https://prettier.io/)** - Code formatting

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local Development

Start PostgreSQL locally with Docker:

```
docker run --name questboard-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=questboard -p 54331:5432 -d postgres:18-alpine
```

## Database Management

The database schema is defined in `db/schema.ts` and migrations are stored in `drizzle/`:

- `pnpm run db:generate` - Generate SQL migration files from schema changes.
- `pnpm run db:migrate` - Run pending migrations against the database.
- `pnpm run db:check` - Check for schema mismatches.
- `pnpm run db:studio` - Launch Drizzle Studio, a visual database explorer.
- `pnpm run db:push` - Push schema changes directly to the database for rapid prototyping.

## Code Formatting

Prettier is configured for the application and project configuration files:

- `pnpm run format` - Format the project files.
- `pnpm run format:check` - Check formatting without changing files.

## Database Structure

```mermaid
erDiagram
    users ||--o{ quests : "owns"
    quests ||--o{ tasks : "contains"
    users ||--o{ memberships : "joins"
    quests ||--o{ memberships : "has members"
    users ||--o{ task_completions : "records"
    tasks ||--o{ task_completions : "completed by"
    quests ||--o{ quest_tags : "uses"
    tags ||--o{ quest_tags : "labels"
    users ||--o{ activity_log : "performs"
    quests o|--o{ activity_log : "related to"

    quest_status {
        enum draft
        enum active
        enum completed
        enum archived
    }
    membership_role {
        enum member
        enum moderator
    }
    users {
        integer id PK
        text email UK
        text display_name
        integer xp
        timestamp created_at
    }
    quests {
        integer id PK
        integer owner_id FK
        text title
        text description
        quest_status status
        integer difficulty
        timestamp created_at
        timestamp updated_at
    }
    tasks {
        integer id PK
        integer quest_id FK
        text title
        integer position
        integer xp_reward
        timestamp due_at
        timestamp created_at
    }
    memberships {
        integer user_id PK, FK
        integer quest_id PK, FK
        membership_role role
        timestamp joined_at
    }
    task_completions {
        integer user_id PK, FK
        integer task_id PK, FK
        integer xp_awarded
        timestamp completed_at
    }
    tags {
        integer id PK
        text slug UK
        text label
    }
    quest_tags {
        integer quest_id PK, FK
        integer tag_id PK, FK
    }
    activity_log {
        integer id PK
        integer user_id FK
        integer quest_id FK "nullable"
        text kind
        jsonb metadata
        timestamp created_at
    }
```
