import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable } from "@workspace/db";
import { sql, ilike, or } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const { category, search, concern, limit = "30", offset = "0" } = req.query as Record<string, string>;

    let query = db.select().from(productsTable);

    const conditions: any[] = [];

    if (search) {
      conditions.push(
        or(
          ilike(productsTable.name, `%${search}%`),
          ilike(productsTable.brand, `%${search}%`),
          ilike(productsTable.description, `%${search}%`)
        )
      );
    }

    if (category && category !== "All") {
      conditions.push(ilike(productsTable.category, `%${category}%`));
    }

    if (concern) {
      conditions.push(sql`${productsTable.skinConcerns} @> ARRAY[${concern}]::text[]`);
    }

    let results = await db
      .select()
      .from(productsTable)
      .where(conditions.length > 0 ? sql`${conditions.reduce((a: any, b: any) => sql`${a} AND ${b}`)}` : undefined)
      .limit(parseInt(limit))
      .offset(parseInt(offset))
      .orderBy(sql`rating DESC NULLS LAST`);

    res.json(results);
  } catch (e: any) {
    console.error("Products error:", e.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/recommend", async (req, res) => {
  try {
    const { concerns = "general", limit = "12" } = req.query as Record<string, string>;
    const concernList = concerns.split(",").map((c) => c.trim());

    // Get a mix of products matching any of the concerns
    const results = await db
      .select()
      .from(productsTable)
      .where(
        sql`${productsTable.skinConcerns} && ARRAY[${sql.join(
          concernList.map((c) => sql`${c}`),
          sql`, `
        )}]::text[]`
      )
      .orderBy(sql`rating DESC NULLS LAST`)
      .limit(parseInt(limit));

    res.json(results);
  } catch (e: any) {
    console.error("Recommend error:", e.message);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});

router.get("/categories", async (_req, res) => {
  try {
    const result = await db
      .selectDistinct({ category: productsTable.category })
      .from(productsTable)
      .orderBy(productsTable.category);
    res.json(result.map((r) => r.category));
  } catch (e: any) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [product] = await db
      .select()
      .from(productsTable)
      .where(sql`${productsTable.id} = ${id}`);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (e: any) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

export default router;
