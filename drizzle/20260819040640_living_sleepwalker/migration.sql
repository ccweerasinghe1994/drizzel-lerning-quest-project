CREATE TABLE "memberships" (
	"user_id" integer,
	"quest_id" integer,
	"role" "membership_role" DEFAULT 'member'::"membership_role" NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "memberships_pkey" PRIMARY KEY("user_id","quest_id")
);
--> statement-breakpoint
CREATE INDEX "memberships_quest_id_idx" ON "memberships" ("quest_id");--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_quest_id_quests_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE CASCADE;