import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'reviewer');
  CREATE TYPE "public"."enum_practice_areas_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__practice_areas_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__practice_areas_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_industries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__industries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__industries_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_lawyers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__lawyers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__lawyers_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_articles_category" AS ENUM('guides', 'updates', 'business', 'litigation', 'family', 'criminal', 'corporate', 'maritime', 'customs', 'employment', 'real-estate', 'faqs');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_category" AS ENUM('guides', 'updates', 'business', 'litigation', 'family', 'criminal', 'corporate', 'maritime', 'customs', 'employment', 'real-estate', 'faqs');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('ar', 'en');
  CREATE TYPE "public"."enum_redirects_status_code" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_consultation_submissions_client_type" AS ENUM('individual', 'company');
  CREATE TYPE "public"."enum_consultation_submissions_preferred_contact" AS ENUM('phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_consultation_submissions_urgency" AS ENUM('urgent', 'normal');
  CREATE TYPE "public"."enum_consultation_submissions_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "practice_areas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"featured" boolean DEFAULT false,
  	"legal_reviewer_id" integer,
  	"last_reviewed_date" timestamp(3) with time zone,
  	"status" "enum_practice_areas_status" DEFAULT 'draft',
  	"seo_canonical_override" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_practice_areas_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "practice_areas_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"overview" jsonb,
  	"who_we_help" jsonb,
  	"legal_issues_covered" jsonb,
  	"how_we_assist" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "practice_areas_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"industries_id" integer,
  	"lawyers_id" integer,
  	"faqs_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "_practice_areas_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_legal_reviewer_id" integer,
  	"version_last_reviewed_date" timestamp(3) with time zone,
  	"version_status" "enum__practice_areas_v_version_status" DEFAULT 'draft',
  	"version_seo_canonical_override" varchar,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__practice_areas_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__practice_areas_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_practice_areas_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_overview" jsonb,
  	"version_who_we_help" jsonb,
  	"version_legal_issues_covered" jsonb,
  	"version_how_we_assist" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_practice_areas_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"industries_id" integer,
  	"lawyers_id" integer,
  	"faqs_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"status" "enum_industries_status" DEFAULT 'draft',
  	"seo_canonical_override" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_industries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "industries_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"business_problems" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "industries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"practice_areas_id" integer
  );
  
  CREATE TABLE "_industries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_status" "enum__industries_v_version_status" DEFAULT 'draft',
  	"version_seo_canonical_override" varchar,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__industries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__industries_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_industries_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_business_problems" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_industries_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"practice_areas_id" integer
  );
  
  CREATE TABLE "lawyers_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "lawyers_education_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "lawyers_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "lawyers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"photo_id" integer,
  	"is_founder" boolean DEFAULT false,
  	"court_admission_level" varchar,
  	"years_experience" numeric,
  	"linked_in" varchar,
  	"email" varchar,
  	"status" "enum_lawyers_status" DEFAULT 'draft',
  	"seo_canonical_override" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_lawyers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "lawyers_locales" (
  	"name" varchar,
  	"role" varchar,
  	"professional_summary" jsonb,
  	"selected_experience" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "lawyers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"practice_areas_id" integer,
  	"industries_id" integer
  );
  
  CREATE TABLE "_lawyers_v_version_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lawyers_v_version_education_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_lawyers_v_version_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lawyers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_photo_id" integer,
  	"version_is_founder" boolean DEFAULT false,
  	"version_court_admission_level" varchar,
  	"version_years_experience" numeric,
  	"version_linked_in" varchar,
  	"version_email" varchar,
  	"version_status" "enum__lawyers_v_version_status" DEFAULT 'draft',
  	"version_seo_canonical_override" varchar,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__lawyers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__lawyers_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_lawyers_v_locales" (
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_professional_summary" jsonb,
  	"version_selected_experience" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_lawyers_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"practice_areas_id" integer,
  	"industries_id" integer
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_articles_category",
  	"cover_image_id" integer,
  	"author_id" integer,
  	"legal_reviewer_id" integer,
  	"publish_date" timestamp(3) with time zone,
  	"last_reviewed_date" timestamp(3) with time zone,
  	"status" "enum_articles_status" DEFAULT 'draft',
  	"seo_canonical_override" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"practice_areas_id" integer,
  	"industries_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__articles_v_version_category",
  	"version_cover_image_id" integer,
  	"version_author_id" integer,
  	"version_legal_reviewer_id" integer,
  	"version_publish_date" timestamp(3) with time zone,
  	"version_last_reviewed_date" timestamp(3) with time zone,
  	"version_status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"version_seo_canonical_override" varchar,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__articles_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"practice_areas_id" integer,
  	"industries_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"related_practice_area_id" integer,
  	"related_industry_id" integer,
  	"status" "enum_faqs_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"seo_canonical_override" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"version_seo_canonical_override" varchar,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_body" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "history_timeline" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "history_timeline_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from_path" varchar NOT NULL,
  	"to_path" varchar NOT NULL,
  	"status_code" "enum_redirects_status_code" DEFAULT '301',
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "consultation_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"client_type" "enum_consultation_submissions_client_type",
  	"legal_area" varchar,
  	"preferred_contact" "enum_consultation_submissions_preferred_contact",
  	"message" varchar,
  	"urgency" "enum_consultation_submissions_urgency",
  	"consent" boolean DEFAULT false NOT NULL,
  	"source_page" varchar,
  	"submitted_at" timestamp(3) with time zone,
  	"status" "enum_consultation_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"practice_areas_id" integer,
  	"industries_id" integer,
  	"lawyers_id" integer,
  	"articles_id" integer,
  	"faqs_id" integer,
  	"pages_id" integer,
  	"history_timeline_id" integer,
  	"redirects_id" integer,
  	"consultation_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"founding_year" numeric DEFAULT 1983,
  	"phone_display" varchar,
  	"phone_international" varchar,
  	"whatsapp_number" varchar,
  	"email" varchar,
  	"facebook_url" varchar,
  	"linked_in_url" varchar,
  	"instagram_url" varchar,
  	"google_business_profile_url" varchar,
  	"default_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"legal_name" varchar,
  	"tagline" varchar,
  	"address" varchar,
  	"disclaimer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas" ADD CONSTRAINT "practice_areas_legal_reviewer_id_users_id_fk" FOREIGN KEY ("legal_reviewer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practice_areas" ADD CONSTRAINT "practice_areas_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practice_areas_locales" ADD CONSTRAINT "practice_areas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas_rels" ADD CONSTRAINT "practice_areas_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas_rels" ADD CONSTRAINT "practice_areas_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas_rels" ADD CONSTRAINT "practice_areas_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas_rels" ADD CONSTRAINT "practice_areas_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practice_areas_rels" ADD CONSTRAINT "practice_areas_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v" ADD CONSTRAINT "_practice_areas_v_parent_id_practice_areas_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_practice_areas_v" ADD CONSTRAINT "_practice_areas_v_version_legal_reviewer_id_users_id_fk" FOREIGN KEY ("version_legal_reviewer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_practice_areas_v" ADD CONSTRAINT "_practice_areas_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_locales" ADD CONSTRAINT "_practice_areas_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_practice_areas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_rels" ADD CONSTRAINT "_practice_areas_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_practice_areas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_rels" ADD CONSTRAINT "_practice_areas_v_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_rels" ADD CONSTRAINT "_practice_areas_v_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_rels" ADD CONSTRAINT "_practice_areas_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_practice_areas_v_rels" ADD CONSTRAINT "_practice_areas_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_locales" ADD CONSTRAINT "industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_rels" ADD CONSTRAINT "industries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_rels" ADD CONSTRAINT "industries_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_parent_id_industries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."industries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v_locales" ADD CONSTRAINT "_industries_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_rels" ADD CONSTRAINT "_industries_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_rels" ADD CONSTRAINT "_industries_v_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_education" ADD CONSTRAINT "lawyers_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_education_locales" ADD CONSTRAINT "lawyers_education_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers_education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_languages" ADD CONSTRAINT "lawyers_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers" ADD CONSTRAINT "lawyers_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lawyers" ADD CONSTRAINT "lawyers_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lawyers_locales" ADD CONSTRAINT "lawyers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_rels" ADD CONSTRAINT "lawyers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_rels" ADD CONSTRAINT "lawyers_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_rels" ADD CONSTRAINT "lawyers_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_version_education" ADD CONSTRAINT "_lawyers_v_version_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lawyers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_version_education_locales" ADD CONSTRAINT "_lawyers_v_version_education_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lawyers_v_version_education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_version_languages" ADD CONSTRAINT "_lawyers_v_version_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lawyers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v" ADD CONSTRAINT "_lawyers_v_parent_id_lawyers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lawyers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lawyers_v" ADD CONSTRAINT "_lawyers_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lawyers_v" ADD CONSTRAINT "_lawyers_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lawyers_v_locales" ADD CONSTRAINT "_lawyers_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lawyers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_rels" ADD CONSTRAINT "_lawyers_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_lawyers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_rels" ADD CONSTRAINT "_lawyers_v_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lawyers_v_rels" ADD CONSTRAINT "_lawyers_v_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_lawyers_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."lawyers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_legal_reviewer_id_users_id_fk" FOREIGN KEY ("legal_reviewer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_author_id_lawyers_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."lawyers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_legal_reviewer_id_users_id_fk" FOREIGN KEY ("version_legal_reviewer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_related_practice_area_id_practice_areas_id_fk" FOREIGN KEY ("related_practice_area_id") REFERENCES "public"."practice_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_related_industry_id_industries_id_fk" FOREIGN KEY ("related_industry_id") REFERENCES "public"."industries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "history_timeline_locales" ADD CONSTRAINT "history_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."history_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_practice_areas_fk" FOREIGN KEY ("practice_areas_id") REFERENCES "public"."practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_history_timeline_fk" FOREIGN KEY ("history_timeline_id") REFERENCES "public"."history_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consultation_submissions_fk" FOREIGN KEY ("consultation_submissions_id") REFERENCES "public"."consultation_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "practice_areas_slug_idx" ON "practice_areas" USING btree ("slug");
  CREATE INDEX "practice_areas_legal_reviewer_idx" ON "practice_areas" USING btree ("legal_reviewer_id");
  CREATE INDEX "practice_areas_seo_seo_og_image_idx" ON "practice_areas" USING btree ("seo_og_image_id");
  CREATE INDEX "practice_areas_updated_at_idx" ON "practice_areas" USING btree ("updated_at");
  CREATE INDEX "practice_areas_created_at_idx" ON "practice_areas" USING btree ("created_at");
  CREATE INDEX "practice_areas__status_idx" ON "practice_areas" USING btree ("_status");
  CREATE UNIQUE INDEX "practice_areas_locales_locale_parent_id_unique" ON "practice_areas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "practice_areas_rels_order_idx" ON "practice_areas_rels" USING btree ("order");
  CREATE INDEX "practice_areas_rels_parent_idx" ON "practice_areas_rels" USING btree ("parent_id");
  CREATE INDEX "practice_areas_rels_path_idx" ON "practice_areas_rels" USING btree ("path");
  CREATE INDEX "practice_areas_rels_industries_id_idx" ON "practice_areas_rels" USING btree ("industries_id");
  CREATE INDEX "practice_areas_rels_lawyers_id_idx" ON "practice_areas_rels" USING btree ("lawyers_id");
  CREATE INDEX "practice_areas_rels_faqs_id_idx" ON "practice_areas_rels" USING btree ("faqs_id");
  CREATE INDEX "practice_areas_rels_articles_id_idx" ON "practice_areas_rels" USING btree ("articles_id");
  CREATE INDEX "_practice_areas_v_parent_idx" ON "_practice_areas_v" USING btree ("parent_id");
  CREATE INDEX "_practice_areas_v_version_version_slug_idx" ON "_practice_areas_v" USING btree ("version_slug");
  CREATE INDEX "_practice_areas_v_version_version_legal_reviewer_idx" ON "_practice_areas_v" USING btree ("version_legal_reviewer_id");
  CREATE INDEX "_practice_areas_v_version_seo_version_seo_og_image_idx" ON "_practice_areas_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_practice_areas_v_version_version_updated_at_idx" ON "_practice_areas_v" USING btree ("version_updated_at");
  CREATE INDEX "_practice_areas_v_version_version_created_at_idx" ON "_practice_areas_v" USING btree ("version_created_at");
  CREATE INDEX "_practice_areas_v_version_version__status_idx" ON "_practice_areas_v" USING btree ("version__status");
  CREATE INDEX "_practice_areas_v_created_at_idx" ON "_practice_areas_v" USING btree ("created_at");
  CREATE INDEX "_practice_areas_v_updated_at_idx" ON "_practice_areas_v" USING btree ("updated_at");
  CREATE INDEX "_practice_areas_v_snapshot_idx" ON "_practice_areas_v" USING btree ("snapshot");
  CREATE INDEX "_practice_areas_v_published_locale_idx" ON "_practice_areas_v" USING btree ("published_locale");
  CREATE INDEX "_practice_areas_v_latest_idx" ON "_practice_areas_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_practice_areas_v_locales_locale_parent_id_unique" ON "_practice_areas_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_practice_areas_v_rels_order_idx" ON "_practice_areas_v_rels" USING btree ("order");
  CREATE INDEX "_practice_areas_v_rels_parent_idx" ON "_practice_areas_v_rels" USING btree ("parent_id");
  CREATE INDEX "_practice_areas_v_rels_path_idx" ON "_practice_areas_v_rels" USING btree ("path");
  CREATE INDEX "_practice_areas_v_rels_industries_id_idx" ON "_practice_areas_v_rels" USING btree ("industries_id");
  CREATE INDEX "_practice_areas_v_rels_lawyers_id_idx" ON "_practice_areas_v_rels" USING btree ("lawyers_id");
  CREATE INDEX "_practice_areas_v_rels_faqs_id_idx" ON "_practice_areas_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_practice_areas_v_rels_articles_id_idx" ON "_practice_areas_v_rels" USING btree ("articles_id");
  CREATE UNIQUE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  CREATE INDEX "industries_seo_seo_og_image_idx" ON "industries" USING btree ("seo_og_image_id");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "industries__status_idx" ON "industries" USING btree ("_status");
  CREATE UNIQUE INDEX "industries_locales_locale_parent_id_unique" ON "industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "industries_rels_order_idx" ON "industries_rels" USING btree ("order");
  CREATE INDEX "industries_rels_parent_idx" ON "industries_rels" USING btree ("parent_id");
  CREATE INDEX "industries_rels_path_idx" ON "industries_rels" USING btree ("path");
  CREATE INDEX "industries_rels_practice_areas_id_idx" ON "industries_rels" USING btree ("practice_areas_id");
  CREATE INDEX "_industries_v_parent_idx" ON "_industries_v" USING btree ("parent_id");
  CREATE INDEX "_industries_v_version_version_slug_idx" ON "_industries_v" USING btree ("version_slug");
  CREATE INDEX "_industries_v_version_seo_version_seo_og_image_idx" ON "_industries_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_industries_v_version_version_updated_at_idx" ON "_industries_v" USING btree ("version_updated_at");
  CREATE INDEX "_industries_v_version_version_created_at_idx" ON "_industries_v" USING btree ("version_created_at");
  CREATE INDEX "_industries_v_version_version__status_idx" ON "_industries_v" USING btree ("version__status");
  CREATE INDEX "_industries_v_created_at_idx" ON "_industries_v" USING btree ("created_at");
  CREATE INDEX "_industries_v_updated_at_idx" ON "_industries_v" USING btree ("updated_at");
  CREATE INDEX "_industries_v_snapshot_idx" ON "_industries_v" USING btree ("snapshot");
  CREATE INDEX "_industries_v_published_locale_idx" ON "_industries_v" USING btree ("published_locale");
  CREATE INDEX "_industries_v_latest_idx" ON "_industries_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_industries_v_locales_locale_parent_id_unique" ON "_industries_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_industries_v_rels_order_idx" ON "_industries_v_rels" USING btree ("order");
  CREATE INDEX "_industries_v_rels_parent_idx" ON "_industries_v_rels" USING btree ("parent_id");
  CREATE INDEX "_industries_v_rels_path_idx" ON "_industries_v_rels" USING btree ("path");
  CREATE INDEX "_industries_v_rels_practice_areas_id_idx" ON "_industries_v_rels" USING btree ("practice_areas_id");
  CREATE INDEX "lawyers_education_order_idx" ON "lawyers_education" USING btree ("_order");
  CREATE INDEX "lawyers_education_parent_id_idx" ON "lawyers_education" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "lawyers_education_locales_locale_parent_id_unique" ON "lawyers_education_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "lawyers_languages_order_idx" ON "lawyers_languages" USING btree ("_order");
  CREATE INDEX "lawyers_languages_parent_id_idx" ON "lawyers_languages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "lawyers_slug_idx" ON "lawyers" USING btree ("slug");
  CREATE INDEX "lawyers_photo_idx" ON "lawyers" USING btree ("photo_id");
  CREATE INDEX "lawyers_seo_seo_og_image_idx" ON "lawyers" USING btree ("seo_og_image_id");
  CREATE INDEX "lawyers_updated_at_idx" ON "lawyers" USING btree ("updated_at");
  CREATE INDEX "lawyers_created_at_idx" ON "lawyers" USING btree ("created_at");
  CREATE INDEX "lawyers__status_idx" ON "lawyers" USING btree ("_status");
  CREATE UNIQUE INDEX "lawyers_locales_locale_parent_id_unique" ON "lawyers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "lawyers_rels_order_idx" ON "lawyers_rels" USING btree ("order");
  CREATE INDEX "lawyers_rels_parent_idx" ON "lawyers_rels" USING btree ("parent_id");
  CREATE INDEX "lawyers_rels_path_idx" ON "lawyers_rels" USING btree ("path");
  CREATE INDEX "lawyers_rels_practice_areas_id_idx" ON "lawyers_rels" USING btree ("practice_areas_id");
  CREATE INDEX "lawyers_rels_industries_id_idx" ON "lawyers_rels" USING btree ("industries_id");
  CREATE INDEX "_lawyers_v_version_education_order_idx" ON "_lawyers_v_version_education" USING btree ("_order");
  CREATE INDEX "_lawyers_v_version_education_parent_id_idx" ON "_lawyers_v_version_education" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_lawyers_v_version_education_locales_locale_parent_id_unique" ON "_lawyers_v_version_education_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_lawyers_v_version_languages_order_idx" ON "_lawyers_v_version_languages" USING btree ("_order");
  CREATE INDEX "_lawyers_v_version_languages_parent_id_idx" ON "_lawyers_v_version_languages" USING btree ("_parent_id");
  CREATE INDEX "_lawyers_v_parent_idx" ON "_lawyers_v" USING btree ("parent_id");
  CREATE INDEX "_lawyers_v_version_version_slug_idx" ON "_lawyers_v" USING btree ("version_slug");
  CREATE INDEX "_lawyers_v_version_version_photo_idx" ON "_lawyers_v" USING btree ("version_photo_id");
  CREATE INDEX "_lawyers_v_version_seo_version_seo_og_image_idx" ON "_lawyers_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_lawyers_v_version_version_updated_at_idx" ON "_lawyers_v" USING btree ("version_updated_at");
  CREATE INDEX "_lawyers_v_version_version_created_at_idx" ON "_lawyers_v" USING btree ("version_created_at");
  CREATE INDEX "_lawyers_v_version_version__status_idx" ON "_lawyers_v" USING btree ("version__status");
  CREATE INDEX "_lawyers_v_created_at_idx" ON "_lawyers_v" USING btree ("created_at");
  CREATE INDEX "_lawyers_v_updated_at_idx" ON "_lawyers_v" USING btree ("updated_at");
  CREATE INDEX "_lawyers_v_snapshot_idx" ON "_lawyers_v" USING btree ("snapshot");
  CREATE INDEX "_lawyers_v_published_locale_idx" ON "_lawyers_v" USING btree ("published_locale");
  CREATE INDEX "_lawyers_v_latest_idx" ON "_lawyers_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_lawyers_v_locales_locale_parent_id_unique" ON "_lawyers_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_lawyers_v_rels_order_idx" ON "_lawyers_v_rels" USING btree ("order");
  CREATE INDEX "_lawyers_v_rels_parent_idx" ON "_lawyers_v_rels" USING btree ("parent_id");
  CREATE INDEX "_lawyers_v_rels_path_idx" ON "_lawyers_v_rels" USING btree ("path");
  CREATE INDEX "_lawyers_v_rels_practice_areas_id_idx" ON "_lawyers_v_rels" USING btree ("practice_areas_id");
  CREATE INDEX "_lawyers_v_rels_industries_id_idx" ON "_lawyers_v_rels" USING btree ("industries_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "articles_legal_reviewer_idx" ON "articles" USING btree ("legal_reviewer_id");
  CREATE INDEX "articles_seo_seo_og_image_idx" ON "articles" USING btree ("seo_og_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_practice_areas_id_idx" ON "articles_rels" USING btree ("practice_areas_id");
  CREATE INDEX "articles_rels_industries_id_idx" ON "articles_rels" USING btree ("industries_id");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_cover_image_idx" ON "_articles_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_articles_v_version_version_author_idx" ON "_articles_v" USING btree ("version_author_id");
  CREATE INDEX "_articles_v_version_version_legal_reviewer_idx" ON "_articles_v" USING btree ("version_legal_reviewer_id");
  CREATE INDEX "_articles_v_version_seo_version_seo_og_image_idx" ON "_articles_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_snapshot_idx" ON "_articles_v" USING btree ("snapshot");
  CREATE INDEX "_articles_v_published_locale_idx" ON "_articles_v" USING btree ("published_locale");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_articles_v_locales_locale_parent_id_unique" ON "_articles_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_practice_areas_id_idx" ON "_articles_v_rels" USING btree ("practice_areas_id");
  CREATE INDEX "_articles_v_rels_industries_id_idx" ON "_articles_v_rels" USING btree ("industries_id");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id");
  CREATE INDEX "faqs_related_practice_area_idx" ON "faqs" USING btree ("related_practice_area_id");
  CREATE INDEX "faqs_related_industry_idx" ON "faqs" USING btree ("related_industry_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "history_timeline_updated_at_idx" ON "history_timeline" USING btree ("updated_at");
  CREATE INDEX "history_timeline_created_at_idx" ON "history_timeline" USING btree ("created_at");
  CREATE UNIQUE INDEX "history_timeline_locales_locale_parent_id_unique" ON "history_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "redirects_from_path_idx" ON "redirects" USING btree ("from_path");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "consultation_submissions_updated_at_idx" ON "consultation_submissions" USING btree ("updated_at");
  CREATE INDEX "consultation_submissions_created_at_idx" ON "consultation_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_practice_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("practice_areas_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_lawyers_id_idx" ON "payload_locked_documents_rels" USING btree ("lawyers_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_history_timeline_id_idx" ON "payload_locked_documents_rels" USING btree ("history_timeline_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_consultation_submissions_i_idx" ON "payload_locked_documents_rels" USING btree ("consultation_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "practice_areas" CASCADE;
  DROP TABLE "practice_areas_locales" CASCADE;
  DROP TABLE "practice_areas_rels" CASCADE;
  DROP TABLE "_practice_areas_v" CASCADE;
  DROP TABLE "_practice_areas_v_locales" CASCADE;
  DROP TABLE "_practice_areas_v_rels" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "industries_locales" CASCADE;
  DROP TABLE "industries_rels" CASCADE;
  DROP TABLE "_industries_v" CASCADE;
  DROP TABLE "_industries_v_locales" CASCADE;
  DROP TABLE "_industries_v_rels" CASCADE;
  DROP TABLE "lawyers_education" CASCADE;
  DROP TABLE "lawyers_education_locales" CASCADE;
  DROP TABLE "lawyers_languages" CASCADE;
  DROP TABLE "lawyers" CASCADE;
  DROP TABLE "lawyers_locales" CASCADE;
  DROP TABLE "lawyers_rels" CASCADE;
  DROP TABLE "_lawyers_v_version_education" CASCADE;
  DROP TABLE "_lawyers_v_version_education_locales" CASCADE;
  DROP TABLE "_lawyers_v_version_languages" CASCADE;
  DROP TABLE "_lawyers_v" CASCADE;
  DROP TABLE "_lawyers_v_locales" CASCADE;
  DROP TABLE "_lawyers_v_rels" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_locales" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_locales" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "history_timeline" CASCADE;
  DROP TABLE "history_timeline_locales" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "consultation_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_practice_areas_status";
  DROP TYPE "public"."enum__practice_areas_v_version_status";
  DROP TYPE "public"."enum__practice_areas_v_published_locale";
  DROP TYPE "public"."enum_industries_status";
  DROP TYPE "public"."enum__industries_v_version_status";
  DROP TYPE "public"."enum__industries_v_published_locale";
  DROP TYPE "public"."enum_lawyers_status";
  DROP TYPE "public"."enum__lawyers_v_version_status";
  DROP TYPE "public"."enum__lawyers_v_published_locale";
  DROP TYPE "public"."enum_articles_category";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_category";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum__articles_v_published_locale";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_redirects_status_code";
  DROP TYPE "public"."enum_consultation_submissions_client_type";
  DROP TYPE "public"."enum_consultation_submissions_preferred_contact";
  DROP TYPE "public"."enum_consultation_submissions_urgency";
  DROP TYPE "public"."enum_consultation_submissions_status";`)
}
