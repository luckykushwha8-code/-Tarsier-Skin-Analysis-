import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  skinType: text("skin_type"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  imageUrl: text("image_url"),
  overallScore: integer("overall_score"),
  skinAge: integer("skin_age"),
  analysis: jsonb("analysis"),
  recommendations: jsonb("recommendations"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  price: integer("price"),
  rating: integer("rating"),
  ingredients: jsonb("ingredients"),
  suitableFor: jsonb("suitable_for"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const routines = pgTable("routines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'morning' | 'evening'
  steps: jsonb("steps").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userProducts = pgTable("user_products", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  plan: text("plan").notNull(), // 'free' | 'premium'
  status: text("status").notNull(), // 'active' | 'cancelled' | 'expired'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
