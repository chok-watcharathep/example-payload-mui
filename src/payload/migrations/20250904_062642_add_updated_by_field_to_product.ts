import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "products" ADD CONSTRAINT "products_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_updated_by_idx" ON "products" USING btree ("updated_by_id");
  CREATE INDEX "_products_v_version_version_updated_by_idx" ON "_products_v" USING btree ("version_updated_by_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP CONSTRAINT "products_updated_by_id_users_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_updated_by_id_users_id_fk";
  
  DROP INDEX "products_updated_by_idx";
  DROP INDEX "_products_v_version_version_updated_by_idx";
  ALTER TABLE "products" DROP COLUMN "updated_by_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_updated_by_id";`)
}
