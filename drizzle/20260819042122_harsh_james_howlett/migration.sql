CREATE TABLE "task_completions" (
	"user_id" integer,
	"task_id" integer,
	"xp_awarded" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "task_completions_pkey" PRIMARY KEY("user_id","task_id"),
	CONSTRAINT "task_completions_xp_nonnegative" CHECK ("xp_awarded" >= 0)
);
--> statement-breakpoint
CREATE INDEX "task_completions_task_id_idx" ON "task_completions" ("task_id");--> statement-breakpoint
ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_task_id_tasks_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE;