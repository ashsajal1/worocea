CREATE TABLE IF NOT EXISTS "type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspace_type" (
	"workspace_id" text NOT NULL,
	"type_id" text NOT NULL,
	CONSTRAINT "workspace_type_workspace_id_type_id_pk" PRIMARY KEY("workspace_id","type_id")
);
--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "deleted_at" DROP DEFAULT;