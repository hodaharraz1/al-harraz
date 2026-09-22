import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "practice_areas" ADD COLUMN "order" numeric DEFAULT 100;
  ALTER TABLE "_practice_areas_v" ADD COLUMN "version_order" numeric DEFAULT 100;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "practice_areas" DROP COLUMN "order";
  ALTER TABLE "_practice_areas_v" DROP COLUMN "version_order";`)
}
