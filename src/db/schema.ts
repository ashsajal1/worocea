import { text, timestamp, pgTable, serial, primaryKey } from "drizzle-orm/pg-core";

export const workSpace = pgTable("workspace", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  creatorId: text("creator_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const Type = pgTable("type", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const WorkspaceType = pgTable("workspace_type", {
  workspaceId: text("workspace_id").notNull(),
  typeId: text("type_id").notNull(),
}, table => {
  return {
    pk: primaryKey({columns: [table.workspaceId, table.typeId]}),
  }
});