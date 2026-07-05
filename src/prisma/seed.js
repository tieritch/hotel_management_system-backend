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

  const roles = ["admin", "manager", "receptionist"];

  for (const role of roles) {
    await prisma.role.upsert({
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
    "manager",
    "receptionist",
    "housekeeper",
    "maintenance",
    "restaurant Staff",
  ];

  for (const position of positions) {
    await prisma.position.upsert({
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
      name: "standard",
      description: "standard room",
      base_price: 50,
    },
    {
      name: "deluxe",
      description: "deluxe room",
      base_price: 100,
    },
    {
      name: "duite",
      description: "suite room",
      base_price: 200,
    },
  ];

  for (const roomType of roomTypes) {
    await prisma.roomType.upsert({
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

  const dbResources = await prisma.resource.findMany();
  const dbActions = await prisma.action.findMany();

  for (const resource of dbResources) {
    for (const action of dbActions) {
      await prisma.permission.upsert({
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

  const adminRole = await prisma.role.findUnique({
    where: {
      name: "admin",
    },
  });

  const permissions = await prisma.permission.findMany();

  for (const permission of permissions) {
    const existing = await prisma.rolePermission.findUnique({
      where: {
        role_id_permission_id: {
          role_id: adminRole.id,
          permission_id: permission.id,
        },
      },
    });

    if (!existing) {
      await prisma.rolePermission.create({
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

  const passwordHash = await bcrypt.hash("admin@123456", 10);

  let adminUser = await prisma.user.findUnique({
    where: {
      username: "admin",
    },
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        username: "admin",
        password_hash: passwordHash,
        is_active: true,
      },
    });

    console.log("Admin créé");
  }

  // ==================================================
  // ADMIN EMPLOYEE
  // ==================================================

  const managerPosition = await prisma.position.findUnique({
    where: {
      name: "manager",
    },
  });

  let employee = await prisma.employee.findUnique({
    where: {
      email: "admin@hotel.local",
    },
  });

  if (!employee) {
    employee = await prisma.employee.create({
      data: {
        first_name: "system",
        last_name: "administrator",
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

  await prisma.userRole.upsert({
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
