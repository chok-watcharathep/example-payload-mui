import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_categories_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "categories_deleted_at_idx" ON "categories" USING btree ("deleted_at");
  CREATE INDEX "_categories_v_version_version_deleted_at_idx" ON "_categories_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "categories_deleted_at_idx";
  DROP INDEX "_categories_v_version_version_deleted_at_idx";
  ALTER TABLE "categories" DROP COLUMN "deleted_at";
  ALTER TABLE "_categories_v" DROP COLUMN "version_deleted_at";`)
}
