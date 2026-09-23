import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "rate_limit_entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"attempts" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rate_limit_entries_id" integer;
  CREATE UNIQUE INDEX "rate_limit_entries_key_idx" ON "rate_limit_entries" USING btree ("key");
  CREATE INDEX "rate_limit_entries_updated_at_idx" ON "rate_limit_entries" USING btree ("updated_at");
  CREATE INDEX "rate_limit_entries_created_at_idx" ON "rate_limit_entries" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rate_limit_entries_fk" FOREIGN KEY ("rate_limit_entries_id") REFERENCES "public"."rate_limit_entries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_rate_limit_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("rate_limit_entries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "rate_limit_entries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "rate_limit_entries" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rate_limit_entries_fk";
  
  DROP INDEX "payload_locked_documents_rels_rate_limit_entries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rate_limit_entries_id";`)
}
