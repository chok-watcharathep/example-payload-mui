import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "slug" varchar;
  ALTER TABLE "products" ADD COLUMN "description" jsonb;
  ALTER TABLE "products" ADD COLUMN "category_id" integer;
  ALTER TABLE "products" ADD COLUMN "image_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_description" jsonb;
  ALTER TABLE "_products_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX "_products_v_version_version_image_idx" ON "_products_v" USING btree ("version_image_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "categories" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT "products_category_id_categories_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_image_id_media_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_category_id_categories_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  DROP INDEX "products_category_idx";
  DROP INDEX "products_image_idx";
  DROP INDEX "_products_v_version_version_category_idx";
  DROP INDEX "_products_v_version_version_image_idx";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  ALTER TABLE "products" DROP COLUMN "slug";
  ALTER TABLE "products" DROP COLUMN "description";
  ALTER TABLE "products" DROP COLUMN "category_id";
  ALTER TABLE "products" DROP COLUMN "image_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_slug";
  ALTER TABLE "_products_v" DROP COLUMN "version_description";
  ALTER TABLE "_products_v" DROP COLUMN "version_category_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_image_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";`)
}
