import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_link_curriculums_faculties" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"faculty_id" integer
  );
  
  CREATE TABLE "products_link_curriculums" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"university_id" integer
  );
  
  CREATE TABLE "_products_v_version_link_curriculums_faculties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"faculty_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_link_curriculums" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"university_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "majors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faculties" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "universities_faculties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"faculty_id" integer NOT NULL
  );
  
  CREATE TABLE "universities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "universities_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"majors_id" integer
  );
  
  ALTER TABLE "products_rels" ADD COLUMN "majors_id" integer;
  ALTER TABLE "_products_v_rels" ADD COLUMN "majors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "majors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faculties_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "universities_id" integer;
  ALTER TABLE "products_link_curriculums_faculties" ADD CONSTRAINT "products_link_curriculums_faculties_faculty_id_faculties_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_link_curriculums_faculties" ADD CONSTRAINT "products_link_curriculums_faculties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_link_curriculums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_link_curriculums" ADD CONSTRAINT "products_link_curriculums_university_id_universities_id_fk" FOREIGN KEY ("university_id") REFERENCES "public"."universities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_link_curriculums" ADD CONSTRAINT "products_link_curriculums_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_link_curriculums_faculties" ADD CONSTRAINT "_products_v_version_link_curriculums_faculties_faculty_id_faculties_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_link_curriculums_faculties" ADD CONSTRAINT "_products_v_version_link_curriculums_faculties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_link_curriculums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_link_curriculums" ADD CONSTRAINT "_products_v_version_link_curriculums_university_id_universities_id_fk" FOREIGN KEY ("university_id") REFERENCES "public"."universities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_link_curriculums" ADD CONSTRAINT "_products_v_version_link_curriculums_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "universities_faculties" ADD CONSTRAINT "universities_faculties_faculty_id_faculties_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "universities_faculties" ADD CONSTRAINT "universities_faculties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."universities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "universities_rels" ADD CONSTRAINT "universities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."universities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "universities_rels" ADD CONSTRAINT "universities_rels_majors_fk" FOREIGN KEY ("majors_id") REFERENCES "public"."majors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_link_curriculums_faculties_order_idx" ON "products_link_curriculums_faculties" USING btree ("_order");
  CREATE INDEX "products_link_curriculums_faculties_parent_id_idx" ON "products_link_curriculums_faculties" USING btree ("_parent_id");
  CREATE INDEX "products_link_curriculums_faculties_faculty_idx" ON "products_link_curriculums_faculties" USING btree ("faculty_id");
  CREATE INDEX "products_link_curriculums_order_idx" ON "products_link_curriculums" USING btree ("_order");
  CREATE INDEX "products_link_curriculums_parent_id_idx" ON "products_link_curriculums" USING btree ("_parent_id");
  CREATE INDEX "products_link_curriculums_university_idx" ON "products_link_curriculums" USING btree ("university_id");
  CREATE INDEX "_products_v_version_link_curriculums_faculties_order_idx" ON "_products_v_version_link_curriculums_faculties" USING btree ("_order");
  CREATE INDEX "_products_v_version_link_curriculums_faculties_parent_id_idx" ON "_products_v_version_link_curriculums_faculties" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_link_curriculums_faculties_faculty_idx" ON "_products_v_version_link_curriculums_faculties" USING btree ("faculty_id");
  CREATE INDEX "_products_v_version_link_curriculums_order_idx" ON "_products_v_version_link_curriculums" USING btree ("_order");
  CREATE INDEX "_products_v_version_link_curriculums_parent_id_idx" ON "_products_v_version_link_curriculums" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_link_curriculums_university_idx" ON "_products_v_version_link_curriculums" USING btree ("university_id");
  CREATE INDEX "majors_updated_at_idx" ON "majors" USING btree ("updated_at");
  CREATE INDEX "majors_created_at_idx" ON "majors" USING btree ("created_at");
  CREATE INDEX "faculties_updated_at_idx" ON "faculties" USING btree ("updated_at");
  CREATE INDEX "faculties_created_at_idx" ON "faculties" USING btree ("created_at");
  CREATE INDEX "universities_faculties_order_idx" ON "universities_faculties" USING btree ("_order");
  CREATE INDEX "universities_faculties_parent_id_idx" ON "universities_faculties" USING btree ("_parent_id");
  CREATE INDEX "universities_faculties_faculty_idx" ON "universities_faculties" USING btree ("faculty_id");
  CREATE INDEX "universities_updated_at_idx" ON "universities" USING btree ("updated_at");
  CREATE INDEX "universities_created_at_idx" ON "universities" USING btree ("created_at");
  CREATE INDEX "universities_rels_order_idx" ON "universities_rels" USING btree ("order");
  CREATE INDEX "universities_rels_parent_idx" ON "universities_rels" USING btree ("parent_id");
  CREATE INDEX "universities_rels_path_idx" ON "universities_rels" USING btree ("path");
  CREATE INDEX "universities_rels_majors_id_idx" ON "universities_rels" USING btree ("majors_id");
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_majors_fk" FOREIGN KEY ("majors_id") REFERENCES "public"."majors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_majors_fk" FOREIGN KEY ("majors_id") REFERENCES "public"."majors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_majors_fk" FOREIGN KEY ("majors_id") REFERENCES "public"."majors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faculties_fk" FOREIGN KEY ("faculties_id") REFERENCES "public"."faculties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_universities_fk" FOREIGN KEY ("universities_id") REFERENCES "public"."universities"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_rels_majors_id_idx" ON "products_rels" USING btree ("majors_id");
  CREATE INDEX "_products_v_rels_majors_id_idx" ON "_products_v_rels" USING btree ("majors_id");
  CREATE INDEX "payload_locked_documents_rels_majors_id_idx" ON "payload_locked_documents_rels" USING btree ("majors_id");
  CREATE INDEX "payload_locked_documents_rels_faculties_id_idx" ON "payload_locked_documents_rels" USING btree ("faculties_id");
  CREATE INDEX "payload_locked_documents_rels_universities_id_idx" ON "payload_locked_documents_rels" USING btree ("universities_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_link_curriculums_faculties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_link_curriculums" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_link_curriculums_faculties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_link_curriculums" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "majors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faculties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "universities_faculties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "universities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "universities_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_link_curriculums_faculties" CASCADE;
  DROP TABLE "products_link_curriculums" CASCADE;
  DROP TABLE "_products_v_version_link_curriculums_faculties" CASCADE;
  DROP TABLE "_products_v_version_link_curriculums" CASCADE;
  DROP TABLE "majors" CASCADE;
  DROP TABLE "faculties" CASCADE;
  DROP TABLE "universities_faculties" CASCADE;
  DROP TABLE "universities" CASCADE;
  DROP TABLE "universities_rels" CASCADE;
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_majors_fk";
  
  ALTER TABLE "_products_v_rels" DROP CONSTRAINT "_products_v_rels_majors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_majors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faculties_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_universities_fk";
  
  DROP INDEX "products_rels_majors_id_idx";
  DROP INDEX "_products_v_rels_majors_id_idx";
  DROP INDEX "payload_locked_documents_rels_majors_id_idx";
  DROP INDEX "payload_locked_documents_rels_faculties_id_idx";
  DROP INDEX "payload_locked_documents_rels_universities_id_idx";
  ALTER TABLE "products_rels" DROP COLUMN "majors_id";
  ALTER TABLE "_products_v_rels" DROP COLUMN "majors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "majors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faculties_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "universities_id";`)
}
