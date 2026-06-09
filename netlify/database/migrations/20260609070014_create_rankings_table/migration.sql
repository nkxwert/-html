CREATE TABLE "rankings" (
	"id" serial PRIMARY KEY,
	"nickname" text NOT NULL,
	"total_asset" bigint NOT NULL,
	"return_rate" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
