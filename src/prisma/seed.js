const bcrypt = require("bcrypt");
const prisma = require("../../prismaClient");

async function main() {
  console.log("Début du seeding...");

  // ==================================================
  // ACTIONS
  // ==================================================
  const actions = ["create", "read", "update", "delete"];

  for (const action of actions) {
    await prisma.action.upsert({
      where: { name: action },
      update: {},
      create: { name: action },
    });
  }

  // ==================================================
  // ROLES
  // ==================================================
  const roles = ["admin", "manager", "receptionist"];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role },
    });
  }

  // ==================================================
  // POSITIONS
  // ==================================================
  const positions = [
    "manager",
    "receptionist",
    "housekeeper",
    "maintenance",
    "restaurant Staff",
  ];

  for (const position of positions) {
    await prisma.position.upsert({
      where: { name: position },
      update: {},
      create: { name: position },
    });
  }

  // ==================================================
  // ROOM TYPES
  // ==================================================
  const roomTypes = [
    {
      name: "standard",
      description: "standard room",
      basePrice: 50,
    },
    {
      name: "deluxe",
      description: "deluxe room",
      basePrice: 100,
    },
    {
      name: "suite",
      description: "suite room",
      basePrice: 200,
    },
  ];

  for (const roomType of roomTypes) {
    await prisma.roomType.upsert({
      where: { name: roomType.name },
      update: {
        description: roomType.description,
        basePrice: roomType.basePrice,
      },
      create: roomType,
    });
  }

  // ==================================================
  // RESOURCES
  // ==================================================
  const resources = [
    "users",
    "roles",
    "employees",
    "customers",
    "bookings",
    "rooms",
    "room_types",
    "stays",
    "invoices",
    "transactions",
    "orders",
    "menu_items",
    "room_cleanings",
    "employee_schedules",
  ];

  for (const resource of resources) {
    await prisma.resource.upsert({
      where: { name: resource },
      update: {},
      create: { name: resource },
    });
  }

  // ==================================================
  // PERMISSIONS
  // ==================================================
  const dbResources = await prisma.resource.findMany();
  const dbActions = await prisma.action.findMany();

  for (const resource of dbResources) {
    for (const action of dbActions) {
      await prisma.permission.upsert({
        where: {
          // CORRECTION : Correspondance exacte avec l'index généré par Prisma
          resourceId_actionId: {
            resourceId: resource.id,
            actionId: action.id, // I majuscule
          },
        },
        create: {
          resourceId: resource.id,
          actionId: action.id,
        },
        update: {},
      });
    }
  }

  // ==================================================
  // ADMIN ROLE PERMISSIONS
  // ==================================================
  const adminRole = await prisma.role.findUnique({
    where: { name: "admin" },
  });

  const permissions = await prisma.permission.findMany();

  for (const permission of permissions) {
    const existing = await prisma.rolePermission.findUnique({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
    });

    if (!existing) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      });
    }
  }

  // ==================================================
  // ADMIN USER
  // ==================================================
  const passwordHash = await bcrypt.hash("admin@123456", 10);

  let adminUser = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        username: "admin",
        passwordHash: passwordHash,
        isActive: true,
      },
    });
    console.log("Admin créé");
  }

  // ==================================================
  // ADMIN EMPLOYEE
  // ==================================================
  const managerPosition = await prisma.position.findUnique({
    where: { name: "manager" },
  });

  let employee = await prisma.employee.findUnique({
    where: { email: "admin@hotel.local" },
  });

  if (!employee) {
    employee = await prisma.employee.create({
      data: {
        firstname: "system", // CORRECTION : camelCase pur
        lastname: "administrator", // CORRECTION : camelCase pur
        email: "admin@hotel.local",
        positionId: managerPosition.id, // CORRECTION : camelCase pur
        userId: adminUser.id,
      },
    });
  }

  // ==================================================
  // USER ROLE
  // ==================================================
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
    update: {},
  });

  // ==================================================
  // ROOM STATUSES
  // ==================================================
  const roomStatuses = [
    {
      name: "AVAILABLE",
      description: "The room is clean and ready for guests",
    },
    {
      name: "OCCUPIED",
      description: "A guest is currently staying in the room",
    },
    {
      name: "CLEANING",
      description: "Housekeeping is currently cleaning the room",
    },
    {
      name: "MAINTENANCE",
      description: "The room is under repair and unavailable",
    },
  ];

  for (const status of roomStatuses) {
    await prisma.roomStatus.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }

  // ==================================================
  // MEASURING UNITS (English + Short Codes)
  // ==================================================
  const measuringUnits = [
    {
      name: "cl",
      description: "Centiliter - Base unit for liquids",
      convertTo: null,
      conversionFactor: 1.0,
    },
    {
      name: "g",
      description: "Gram - Base unit for solids",
      convertTo: null,
      conversionFactor: 1.0,
    },
    {
      name: "pcs",
      description: "Piece - Base unit for individual items",
      convertTo: null,
      conversionFactor: 1.0,
    },
    {
      name: "bt",
      description: "Bottle of Juice (65 cl)",
      convertTo: "cl",
      conversionFactor: 65.0,
    },
    {
      name: "btc",
      description: "Bottle of Coca-Cola (50 cl)",
      convertTo: "cl",
      conversionFactor: 50.0,
    },
    {
      name: "pk",
      description: "Pack of Sugar (1000 g)",
      convertTo: "g",
      conversionFactor: 1000.0,
    },
  ];

  for (const unit of measuringUnits) {
    await prisma.measuringUnit.upsert({
      where: { name: unit.name },
      update: {
        description: unit.description,
        convertTo: unit.convertTo,
        conversionFactor: unit.conversionFactor,
      },
      create: unit,
    });
  }

  console.log("Seeding terminé.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
