/*
  Warnings:

  - You are about to drop the `ACTIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BOOKINGS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CUSTOMERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EMPLOYEES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EMPLOYEE_SCHEDULES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `INVOICES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MEASURING_UNITS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MENU_ITEMS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ORDERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ORDER_ITEMS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PERMISSIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `POSITIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RESOURCES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ROLES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ROLE_PERMISSIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ROOMS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ROOM_CLEANINGS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ROOM_TYPES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `STAYS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TRANSACTIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USER_ROLES` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BOOKINGS" DROP CONSTRAINT "BOOKINGS_created_by_fkey";

-- DropForeignKey
ALTER TABLE "BOOKINGS" DROP CONSTRAINT "BOOKINGS_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "BOOKINGS" DROP CONSTRAINT "BOOKINGS_room_id_fkey";

-- DropForeignKey
ALTER TABLE "BOOKINGS" DROP CONSTRAINT "BOOKINGS_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "CUSTOMERS" DROP CONSTRAINT "CUSTOMERS_created_by_fkey";

-- DropForeignKey
ALTER TABLE "CUSTOMERS" DROP CONSTRAINT "CUSTOMERS_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EMPLOYEES" DROP CONSTRAINT "EMPLOYEES_position_id_fkey";

-- DropForeignKey
ALTER TABLE "EMPLOYEES" DROP CONSTRAINT "EMPLOYEES_user_id_fkey";

-- DropForeignKey
ALTER TABLE "EMPLOYEE_SCHEDULES" DROP CONSTRAINT "EMPLOYEE_SCHEDULES_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "INVOICES" DROP CONSTRAINT "INVOICES_stay_id_fkey";

-- DropForeignKey
ALTER TABLE "ORDERS" DROP CONSTRAINT "ORDERS_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "ORDER_ITEMS" DROP CONSTRAINT "ORDER_ITEMS_measuring_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "ORDER_ITEMS" DROP CONSTRAINT "ORDER_ITEMS_menu_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ORDER_ITEMS" DROP CONSTRAINT "ORDER_ITEMS_order_id_fkey";

-- DropForeignKey
ALTER TABLE "PERMISSIONS" DROP CONSTRAINT "PERMISSIONS_action_id_fkey";

-- DropForeignKey
ALTER TABLE "PERMISSIONS" DROP CONSTRAINT "PERMISSIONS_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "ROLE_PERMISSIONS" DROP CONSTRAINT "ROLE_PERMISSIONS_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "ROLE_PERMISSIONS" DROP CONSTRAINT "ROLE_PERMISSIONS_role_id_fkey";

-- DropForeignKey
ALTER TABLE "ROOMS" DROP CONSTRAINT "ROOMS_room_type_id_fkey";

-- DropForeignKey
ALTER TABLE "ROOM_CLEANINGS" DROP CONSTRAINT "ROOM_CLEANINGS_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "ROOM_CLEANINGS" DROP CONSTRAINT "ROOM_CLEANINGS_room_id_fkey";

-- DropForeignKey
ALTER TABLE "STAYS" DROP CONSTRAINT "STAYS_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "STAYS" DROP CONSTRAINT "STAYS_created_by_fkey";

-- DropForeignKey
ALTER TABLE "STAYS" DROP CONSTRAINT "STAYS_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "STAYS" DROP CONSTRAINT "STAYS_room_id_fkey";

-- DropForeignKey
ALTER TABLE "STAYS" DROP CONSTRAINT "STAYS_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "TRANSACTIONS" DROP CONSTRAINT "TRANSACTIONS_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "USER_ROLES" DROP CONSTRAINT "USER_ROLES_role_id_fkey";

-- DropForeignKey
ALTER TABLE "USER_ROLES" DROP CONSTRAINT "USER_ROLES_user_id_fkey";

-- DropTable
DROP TABLE "ACTIONS";

-- DropTable
DROP TABLE "BOOKINGS";

-- DropTable
DROP TABLE "CUSTOMERS";

-- DropTable
DROP TABLE "EMPLOYEES";

-- DropTable
DROP TABLE "EMPLOYEE_SCHEDULES";

-- DropTable
DROP TABLE "INVOICES";

-- DropTable
DROP TABLE "MEASURING_UNITS";

-- DropTable
DROP TABLE "MENU_ITEMS";

-- DropTable
DROP TABLE "ORDERS";

-- DropTable
DROP TABLE "ORDER_ITEMS";

-- DropTable
DROP TABLE "PERMISSIONS";

-- DropTable
DROP TABLE "POSITIONS";

-- DropTable
DROP TABLE "RESOURCES";

-- DropTable
DROP TABLE "ROLES";

-- DropTable
DROP TABLE "ROLE_PERMISSIONS";

-- DropTable
DROP TABLE "ROOMS";

-- DropTable
DROP TABLE "ROOM_CLEANINGS";

-- DropTable
DROP TABLE "ROOM_TYPES";

-- DropTable
DROP TABLE "STAYS";

-- DropTable
DROP TABLE "TRANSACTIONS";

-- DropTable
DROP TABLE "USERS";

-- DropTable
DROP TABLE "USER_ROLES";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "resource_id" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hire_date" TIMESTAMP(3),
    "phone_num" TEXT,
    "position_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_schedules" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "phone_num" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "expected_check_in" TIMESTAMP(3) NOT NULL,
    "expected_check_out" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "room_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "base_price" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "room_type_id" TEXT NOT NULL,
    "room_num" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stays" (
    "id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "room_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "stays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_cleanings" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "cleaned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "room_cleanings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "price" DECIMAL(12,2) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "total_amount" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "menu_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(12,2) NOT NULL,
    "measuring_unit_id" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "stay_id" TEXT NOT NULL,
    "total_amount" DECIMAL(12,2) NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measuring_units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "measuring_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resources_name_key" ON "resources"("name");

-- CreateIndex
CREATE UNIQUE INDEX "actions_name_key" ON "actions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_resource_id_action_id_key" ON "permissions"("resource_id", "action_id");

-- CreateIndex
CREATE UNIQUE INDEX "positions_name_key" ON "positions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_id_key" ON "employees"("user_id");

-- CreateIndex
CREATE INDEX "employees_position_id_idx" ON "employees"("position_id");

-- CreateIndex
CREATE INDEX "employee_schedules_employee_id_idx" ON "employee_schedules"("employee_id");

-- CreateIndex
CREATE INDEX "customers_email_idx" ON "customers"("email");

-- CreateIndex
CREATE INDEX "bookings_customer_id_idx" ON "bookings"("customer_id");

-- CreateIndex
CREATE INDEX "bookings_room_id_idx" ON "bookings"("room_id");

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE UNIQUE INDEX "room_types_name_key" ON "room_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_room_num_key" ON "rooms"("room_num");

-- CreateIndex
CREATE INDEX "rooms_room_type_id_idx" ON "rooms"("room_type_id");

-- CreateIndex
CREATE INDEX "rooms_status_idx" ON "rooms"("status");

-- CreateIndex
CREATE UNIQUE INDEX "stays_booking_id_key" ON "stays"("booking_id");

-- CreateIndex
CREATE INDEX "stays_customer_id_idx" ON "stays"("customer_id");

-- CreateIndex
CREATE INDEX "stays_room_id_idx" ON "stays"("room_id");

-- CreateIndex
CREATE INDEX "room_cleanings_room_id_idx" ON "room_cleanings"("room_id");

-- CreateIndex
CREATE INDEX "room_cleanings_employee_id_idx" ON "room_cleanings"("employee_id");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "order_items_menu_item_id_idx" ON "order_items"("menu_item_id");

-- CreateIndex
CREATE INDEX "invoices_stay_id_idx" ON "invoices"("stay_id");

-- CreateIndex
CREATE INDEX "transactions_invoice_id_idx" ON "transactions"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "measuring_units_name_key" ON "measuring_units"("name");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schedules" ADD CONSTRAINT "employee_schedules_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_cleanings" ADD CONSTRAINT "room_cleanings_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_cleanings" ADD CONSTRAINT "room_cleanings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_measuring_unit_id_fkey" FOREIGN KEY ("measuring_unit_id") REFERENCES "measuring_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_stay_id_fkey" FOREIGN KEY ("stay_id") REFERENCES "stays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
