import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const skinConditionsTable = pgTable("skin_conditions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  category: text("category").notNull(),
  severity: text("severity"),
  description: text("description"),
  symptoms: text("symptoms").array(),
  triggers: text("triggers").array(),
  recommendedIngredients: text("recommended_ingredients").array(),
  avoidIngredients: text("avoid_ingredients").array(),
  productCategories: text("product_categories").array(),
  aiKeywords: text("ai_keywords").array(),
  treatmentSteps: text("treatment_steps").array(),
});

export type SkinCondition = typeof skinConditionsTable.$inferSelect;
