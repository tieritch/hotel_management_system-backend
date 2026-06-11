const bcrypt = require("bcrypt");
const prisma = require("../prismaClient");

async function main() {
  console.log("Début du seeding...");

  // ==================================================
  // ACTIONS
  // ==================================================

  const actions = ["CREATE", "READ", "UPDATE", "DELETE"];

  for (const action of actions) {
    await prisma.ACTIONS.upsert({
      where: {
        name: action,
      },
      update: {},
      create: {
        name: action,
      },
    });
  }

  // ==================================================
  // ROLES
  // ==================================================

  const roles = ["ADMIN", "MANAGER", "RECEPTIONIST"];

  for (const role of roles) {
    await prisma.ROLES.upsert({
      where: {
        name: role,
      },
      update: {},
      create: {
        name: role,
      },
    });
  }

  // ==================================================
  // POSITIONS
  // ==================================================

  const positions = [
    "Manager",
    "Receptionist",
    "Housekeeper",
    "Maintenance",
    "Restaurant Staff",
  ];

  for (const position of positions) {
    await prisma.POSITIONS.upsert({
      where: {
        name: position,
      },
      update: {},
      create: {
        name: position,
      },
    });
  }

  // ==================================================
  // ROOM TYPES
  // ==================================================

  const roomTypes = [
    {
      name: "Standard",
      description: "Standard room",
      base_price: 50,
    },
    {
      name: "Deluxe",
      description: "Deluxe room",
      base_price: 100,
    },
    {
      name: "Suite",
      description: "Suite room",
      base_price: 200,
    },
  ];

  for (const roomType of roomTypes) {
    await prisma.ROOM_TYPES.upsert({
      where: {
        name: roomType.name,
      },
      update: {},
      create: roomType,
    });
  }

  // ==================================================
  // RESOURCES
  // ==================================================

  const resources = [
    "USERS",
    "ROLES",
    "EMPLOYEES",
    "CUSTOMERS",
    "BOOKINGS",
    "ROOMS",
    "ROOM_TYPES",
    "STAYS",
    "INVOICES",
    "TRANSACTIONS",
    "ORDERS",
    "MENU_ITEMS",
    "ROOM_CLEANINGS",
    "EMPLOYEE_SCHEDULES",
  ];

  for (const resource of resources) {
    await prisma.RESOURCES.upsert({
      where: {
        name: resource,
      },
      update: {},
      create: {
        name: resource,
      },
    });
  }

  // ==================================================
  // PERMISSIONS
  // ==================================================

  const dbResources = await prisma.RESOURCES.findMany();
  const dbActions = await prisma.ACTIONS.findMany();

  for (const resource of dbResources) {
    for (const action of dbActions) {
      await prisma.PERMISSIONS.upsert({
        where: {
          resource_id_action_id: {
            resource_id: resource.id,
            action_id: action.id,
          },
        },
        create: {
          resource_id: resource.id,
          action_id: action.id,
        },
        update: {},
      });
    }
  }

  // ==================================================
  // ADMIN ROLE PERMISSIONS
  // ==================================================

  const adminRole = await prisma.ROLES.findUnique({
    where: {
      name: "ADMIN",
    },
  });

  const permissions = await prisma.PERMISSIONS.findMany();

  for (const permission of permissions) {
    const existing = await prisma.ROLE_PERMISSIONS.findUnique({
      where: {
        role_id_permission_id: {
          role_id: adminRole.id,
          permission_id: permission.id,
        },
      },
    });

    if (!existing) {
      await prisma.ROLE_PERMISSIONS.create({
        data: {
          role_id: adminRole.id,
          permission_id: permission.id,
        },
      });
    }
  }

  // ==================================================
  // ADMIN USER
  // ==================================================

  const passwordHash = await bcrypt.hash("Admin@123456", 10);

  let adminUser = await prisma.USERS.findUnique({
    where: {
      username: "admin",
    },
  });

  if (!adminUser) {
    adminUser = await prisma.USERS.create({
      data: {
        username: "admin",
        password_hash: passwordHash,
      },
    });

    console.log("Admin créé");
  }

  // ==================================================
  // ADMIN EMPLOYEE
  // ==================================================

  const managerPosition = await prisma.POSITIONS.findUnique({
    where: {
      name: "Manager",
    },
  });

  let employee = await prisma.EMPLOYEES.findUnique({
    where: {
      email: "admin@hotel.local",
    },
  });

  if (!employee) {
    employee = await prisma.EMPLOYEES.create({
      data: {
        first_name: "System",
        last_name: "Administrator",
        email: "admin@hotel.local",
        position_id: managerPosition.id,
      },
    });
  }

  // ==================================================
  // USER ROLE
  // ==================================================

  // const existingUserRole =
  /* await prisma.USER_ROLES.findUnique({
            where: {
                user_id_role_id: {
                    user_id: adminUser.id,
                    role_id: adminRole.id
                }
            }
        });

    if (!existingUserRole) {*/

  await prisma.USER_ROLES.upsert({
    where: {
      user_id_role_id: {
        user_id: adminUser.id,
        role_id: adminRole.id,
      },
    },
    create: {
      user_id: adminUser.id,
      role_id: adminRole.id,
    },
    update: {},
  });
  // }

  console.log("Seeding terminé.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
