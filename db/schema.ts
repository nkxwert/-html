import { pgTable, serial, text, bigint, real, timestamp } from "drizzle-orm/pg-core";

export const rankings = pgTable("rankings", {
  id: serial().primaryKey(),
  nickname: text().notNull(),
  total_asset: bigint("total_asset", { mode: "number" }).notNull(),
  return_rate: real("return_rate").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
