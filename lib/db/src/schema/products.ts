import { pgTable, text, serial, decimal, real, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  subCategory: text("sub_category"),
  price: decimal("price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  productUrl: text("product_url"),
  description: text("description"),
  ingredients: text("ingredients"),
  size: text("size"),
  rating: real("rating").default(4.2),
  reviewCount: integer("review_count").default(0),
  availability: text("availability").default("in_stock"),
  isFeatured: boolean("is_featured").default(false),
  skinConcerns: text("skin_concerns").array(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
