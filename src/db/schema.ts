import {
  integer,
  text,
  boolean,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";

export const workSpace = pgTable("workspace", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  creatorId: text("creator_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  deletedAt: timestamp("deleted_at"),
});
