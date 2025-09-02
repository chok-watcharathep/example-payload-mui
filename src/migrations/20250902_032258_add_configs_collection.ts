import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "configs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"value" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "configs_id" integer;
  CREATE UNIQUE INDEX "configs_key_idx" ON "configs" USING btree ("key");
  CREATE INDEX "configs_updated_at_idx" ON "configs" USING btree ("updated_at");
  CREATE INDEX "configs_created_at_idx" ON "configs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_configs_fk" FOREIGN KEY ("configs_id") REFERENCES "public"."configs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_configs_id_idx" ON "payload_locked_documents_rels" USING btree ("configs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "configs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "configs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_configs_fk";
  
  DROP INDEX "payload_locked_documents_rels_configs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "configs_id";`)
}
