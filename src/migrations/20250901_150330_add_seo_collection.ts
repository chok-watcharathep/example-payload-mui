import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "categories_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "categories_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "categories_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_meta_meta_image_idx" ON "products_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "_products_v_version_meta_version_meta_image_idx" ON "_products_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "categories_meta_meta_image_idx" ON "categories_locales" USING btree ("meta_image_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_locales" DROP CONSTRAINT "products_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "_products_v_locales" DROP CONSTRAINT "_products_v_locales_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "categories_locales" DROP CONSTRAINT "categories_locales_meta_image_id_media_id_fk";
  
  DROP INDEX "products_meta_meta_image_idx";
  DROP INDEX "_products_v_version_meta_version_meta_image_idx";
  DROP INDEX "categories_meta_meta_image_idx";
  ALTER TABLE "products_locales" DROP COLUMN "meta_title";
  ALTER TABLE "products_locales" DROP COLUMN "meta_description";
  ALTER TABLE "products_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_meta_title";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_meta_description";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "categories_locales" DROP COLUMN "meta_title";
  ALTER TABLE "categories_locales" DROP COLUMN "meta_description";
  ALTER TABLE "categories_locales" DROP COLUMN "meta_image_id";`)
}
