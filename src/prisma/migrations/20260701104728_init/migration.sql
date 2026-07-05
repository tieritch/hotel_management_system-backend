/*
  Warnings:

  - The primary key for the `actions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `actions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `positions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `positions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `resources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `resources` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `room_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `room_types` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `position_id` on the `employees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `action_id` on the `permissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `resource_id` on the `permissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `room_type_id` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_position_id_fkey";

-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_action_id_fkey";

-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_room_type_id_fkey";

-- AlterTable
ALTER TABLE "actions" DROP CONSTRAINT "actions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "actions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "position_id",
ADD COLUMN     "position_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "action_id",
ADD COLUMN     "action_id" INTEGER NOT NULL,
DROP COLUMN "resource_id",
ADD COLUMN     "resource_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "positions" DROP CONSTRAINT "positions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "positions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "resources" DROP CONSTRAINT "resources_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "resources_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "room_types" DROP CONSTRAINT "room_types_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "room_types_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "room_type_id",
ADD COLUMN     "room_type_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "employees_position_id_idx" ON "employees"("position_id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_resource_id_action_id_key" ON "permissions"("resource_id", "action_id");

-- CreateIndex
CREATE INDEX "rooms_room_type_id_idx" ON "rooms"("room_type_id");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
