-- CreateTable
CREATE TABLE "USERS" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROLES" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ROLES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_ROLES" (
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "USER_ROLES_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "RESOURCES" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RESOURCES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ACTIONS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ACTIONS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PERMISSIONS" (
    "id" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "resource_id" TEXT NOT NULL,

    CONSTRAINT "PERMISSIONS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROLE_PERMISSIONS" (
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    CONSTRAINT "ROLE_PERMISSIONS_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "POSITIONS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "POSITIONS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EMPLOYEES" (
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

    CONSTRAINT "EMPLOYEES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EMPLOYEE_SCHEDULES" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EMPLOYEE_SCHEDULES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CUSTOMERS" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "phone_num" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "CUSTOMERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOOKINGS" (
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

    CONSTRAINT "BOOKINGS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROOM_TYPES" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "base_price" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ROOM_TYPES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROOMS" (
    "id" TEXT NOT NULL,
    "room_type_id" TEXT NOT NULL,
    "room_num" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ROOMS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "STAYS" (
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

    CONSTRAINT "STAYS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROOM_CLEANINGS" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "cleaned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "ROOM_CLEANINGS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MENU_ITEMS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "price" DECIMAL(12,2) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MENU_ITEMS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ORDERS" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "total_amount" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "ORDERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ORDER_ITEMS" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "menu_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(12,2) NOT NULL,
    "measuring_unit_id" INTEGER NOT NULL,

    CONSTRAINT "ORDER_ITEMS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "INVOICES" (
    "id" TEXT NOT NULL,
    "stay_id" TEXT NOT NULL,
    "total_amount" DECIMAL(12,2) NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "INVOICES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TRANSACTIONS" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TRANSACTIONS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MEASURING_UNITS" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MEASURING_UNITS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USERS_username_key" ON "USERS"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ROLES_name_key" ON "ROLES"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RESOURCES_name_key" ON "RESOURCES"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ACTIONS_name_key" ON "ACTIONS"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PERMISSIONS_resource_id_action_id_key" ON "PERMISSIONS"("resource_id", "action_id");

-- CreateIndex
CREATE UNIQUE INDEX "POSITIONS_name_key" ON "POSITIONS"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EMPLOYEES_email_key" ON "EMPLOYEES"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EMPLOYEES_user_id_key" ON "EMPLOYEES"("user_id");

-- CreateIndex
CREATE INDEX "EMPLOYEES_position_id_idx" ON "EMPLOYEES"("position_id");

-- CreateIndex
CREATE INDEX "EMPLOYEE_SCHEDULES_employee_id_idx" ON "EMPLOYEE_SCHEDULES"("employee_id");

-- CreateIndex
CREATE INDEX "CUSTOMERS_email_idx" ON "CUSTOMERS"("email");

-- CreateIndex
CREATE INDEX "BOOKINGS_customer_id_idx" ON "BOOKINGS"("customer_id");

-- CreateIndex
CREATE INDEX "BOOKINGS_room_id_idx" ON "BOOKINGS"("room_id");

-- CreateIndex
CREATE INDEX "BOOKINGS_status_idx" ON "BOOKINGS"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ROOM_TYPES_name_key" ON "ROOM_TYPES"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ROOMS_room_num_key" ON "ROOMS"("room_num");

-- CreateIndex
CREATE INDEX "ROOMS_room_type_id_idx" ON "ROOMS"("room_type_id");

-- CreateIndex
CREATE INDEX "ROOMS_status_idx" ON "ROOMS"("status");

-- CreateIndex
CREATE UNIQUE INDEX "STAYS_booking_id_key" ON "STAYS"("booking_id");

-- CreateIndex
CREATE INDEX "STAYS_customer_id_idx" ON "STAYS"("customer_id");

-- CreateIndex
CREATE INDEX "STAYS_room_id_idx" ON "STAYS"("room_id");

-- CreateIndex
CREATE INDEX "ROOM_CLEANINGS_room_id_idx" ON "ROOM_CLEANINGS"("room_id");

-- CreateIndex
CREATE INDEX "ROOM_CLEANINGS_employee_id_idx" ON "ROOM_CLEANINGS"("employee_id");

-- CreateIndex
CREATE INDEX "ORDER_ITEMS_order_id_idx" ON "ORDER_ITEMS"("order_id");

-- CreateIndex
CREATE INDEX "ORDER_ITEMS_menu_item_id_idx" ON "ORDER_ITEMS"("menu_item_id");

-- CreateIndex
CREATE INDEX "INVOICES_stay_id_idx" ON "INVOICES"("stay_id");

-- CreateIndex
CREATE INDEX "TRANSACTIONS_invoice_id_idx" ON "TRANSACTIONS"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "MEASURING_UNITS_name_key" ON "MEASURING_UNITS"("name");

-- AddForeignKey
ALTER TABLE "USER_ROLES" ADD CONSTRAINT "USER_ROLES_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "ROLES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USER_ROLES" ADD CONSTRAINT "USER_ROLES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PERMISSIONS" ADD CONSTRAINT "PERMISSIONS_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "ACTIONS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PERMISSIONS" ADD CONSTRAINT "PERMISSIONS_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "RESOURCES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROLE_PERMISSIONS" ADD CONSTRAINT "ROLE_PERMISSIONS_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "PERMISSIONS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROLE_PERMISSIONS" ADD CONSTRAINT "ROLE_PERMISSIONS_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "ROLES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EMPLOYEES" ADD CONSTRAINT "EMPLOYEES_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "POSITIONS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EMPLOYEES" ADD CONSTRAINT "EMPLOYEES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EMPLOYEE_SCHEDULES" ADD CONSTRAINT "EMPLOYEE_SCHEDULES_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "EMPLOYEES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CUSTOMERS" ADD CONSTRAINT "CUSTOMERS_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "USERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CUSTOMERS" ADD CONSTRAINT "CUSTOMERS_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "USERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOOKINGS" ADD CONSTRAINT "BOOKINGS_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "USERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOOKINGS" ADD CONSTRAINT "BOOKINGS_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "CUSTOMERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOOKINGS" ADD CONSTRAINT "BOOKINGS_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "ROOMS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOOKINGS" ADD CONSTRAINT "BOOKINGS_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "USERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROOMS" ADD CONSTRAINT "ROOMS_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "ROOM_TYPES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STAYS" ADD CONSTRAINT "STAYS_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "BOOKINGS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STAYS" ADD CONSTRAINT "STAYS_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "USERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STAYS" ADD CONSTRAINT "STAYS_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "CUSTOMERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STAYS" ADD CONSTRAINT "STAYS_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "ROOMS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STAYS" ADD CONSTRAINT "STAYS_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "USERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROOM_CLEANINGS" ADD CONSTRAINT "ROOM_CLEANINGS_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "EMPLOYEES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROOM_CLEANINGS" ADD CONSTRAINT "ROOM_CLEANINGS_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "ROOMS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ORDERS" ADD CONSTRAINT "ORDERS_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "CUSTOMERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ORDER_ITEMS" ADD CONSTRAINT "ORDER_ITEMS_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "MENU_ITEMS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ORDER_ITEMS" ADD CONSTRAINT "ORDER_ITEMS_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "ORDERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ORDER_ITEMS" ADD CONSTRAINT "ORDER_ITEMS_measuring_unit_id_fkey" FOREIGN KEY ("measuring_unit_id") REFERENCES "MEASURING_UNITS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICES" ADD CONSTRAINT "INVOICES_stay_id_fkey" FOREIGN KEY ("stay_id") REFERENCES "STAYS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TRANSACTIONS" ADD CONSTRAINT "TRANSACTIONS_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "INVOICES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
