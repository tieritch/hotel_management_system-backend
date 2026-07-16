const { z } = require("zod");
const { refineValidator, refineErrorMsg } = require("../utilities");
const { errorMsg } = require("../utilities/message");
/**model InventoryItem {
  id              String            @id @default(uuid())
  name            String            @unique
  currentStock    Decimal           @db.Decimal(12, 2) @default(0.00) @map("current_stock")
  minStockLevel   Decimal?          @db.Decimal(12, 2) @map("min_stock_level")
  unitCost        Decimal           @db.Decimal(12, 2) @default(0.00) @map("unit_cost")
  retailPrice     Decimal?          @db.Decimal(12, 2) @map("retail_price")
  createdAt       DateTime          @default(now()) @map("created_at")
  updatedAt       DateTime          @updatedAt @map("updated_at")

  purchaseUnitId  Int               @map("purchase_unit_id")
  retailUnitId    Int               @map("retail_unit_id")

  purchaseUnit    MeasuringUnit     @relation("PurchaseUnitRelation", fields: [purchaseUnitId], references: [id])
  retailUnit      MeasuringUnit     @relation("RetailUnitRelation", fields: [retailUnitId], references: [id])
  
  movements       StockMovement[]
  purchaseItems   PurchaseOrderItem[]

  @@index([purchaseUnitId])
  @@index([retailUnitId])
  @@map("inventory_items")
} */

const idSch = z
  .string({ error: " Produdct ID must be a valid string " })
  .min(1, "Product ID can't be empty");

const nameSch = z
  .string({ error: " Produdct name must be a valid string " })
  .trim()
  .toLowerCase()
  .min(1, "Product name can't be empty");

const quantitySch = z
  .number({ error: "Quantity must be a valid number" })
  .positive({ error: "Quantity must be a positive number" });

const minStockLevelSch = z
  .union([
    z.literal("").transform(() => undefined),
    z
      .number({ error: "Min stock level a valid number" })
      .positive({ error: "Min stock level must be a positive number" }),
  ])
  .optional();

const unitCostSch = z
  .number({ error: "Unit cost must be a valid number" })
  .positive({ error: "Unit must be a positive number" });

const retailPriceSch = z
  .number({ error: "Retail price a must be valid number" })
  .positive({ error: "Retail price must be a positive number" });

const purchaseUnitIdSch = z
  /*.string({
    error: "purchase measure unit must be a string",
  })
  .trim()
  .toLowerCase()
  .min(1, "purchase measure unit can't be empty");*/
  .number({ error: "Purchase measure unit id must be a valid number" })
  .positive({ error: "Purchase measure unit id must be a positive number" });

const retailUnitIdSch = z
  /*.string({
    error: "retail measure unit must be a string",
  })
  .trim()
  .toLowerCase()
  .min(1, "retail measure unit can't be empty");*/
  .number({ error: "Retail measure unit id must be a valid number" })
  .positive({ error: "Retail measure unit id must be a positive number" });

const create = {
  body: z.object({
    name: nameSch,
    currentStock: quantitySch,
    minStockLevel: minStockLevelSch,
    unitCost: unitCostSch,
    retailPrice: retailPriceSch,
    purchaseUnitId: purchaseUnitIdSch,
    retailUnitId: retailUnitIdSch,
  }),
};

const update = {
  params: z.object({ id: idSch }),
  body: z
    .object({
      name: z
        .union([z.literal("").transform(() => undefined), nameSch])
        .optional(),
      currentStock: z
        .union([z.literal("").transform(() => undefined), quantitySch])
        .optional(),
      minStockLevel: z
        .union([z.literal("").transform(() => undefined), minStockLevelSch])
        .optional(),
      unitCost: z
        .union([z.literal("").transform(() => undefined), unitCostSch])
        .optional(),
      retailPrice: z
        .union([z.literal("").transform(() => undefined), retailPriceSch])
        .optional(),
      purchaseUnitId: z
        .union([z.literal("").transform(() => undefined), purchaseUnitIdSch])
        .optional(),
      retailUnitId: z
        .union([z.literal("").transform(() => undefined), retailPriceSch])
        .optional(),
    })
    .refine(refineValidator(), errorMsg),
};

const remove = {
  params: z.object({ id: idSch }),
};

module.exports = { create, update, remove };
