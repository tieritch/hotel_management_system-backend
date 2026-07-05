const { position } = require("../../../prismaClient");

function buildInclude(include) {
  /** model Employee {
  id             String               @id @default(uuid())
  first_name     String
  last_name      String
  email          String               @unique
  created_at     DateTime             @default(now())
  hire_date      DateTime?
  phone_num      String?
  position_id    Int
  updated_at     DateTime             @updatedAt
  user_id        String?              @unique
  position       Position            @relation(fields: [position_id], references: [id])
  user           User?               @relation(fields: [user_id], references: [id])
  schedules      EmployeeSchedule[]
  roomCleanings RoomCleaning[]

  @@index([position_id])
  @@map("employees")
} */

  const includes = {
    position: {
      position: true,
    },

    //schedules

    "roles.permissions": {
      userRoles: {
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  permission: {
                    include: {
                      action: true,
                      resource: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return includes[include];
}

function buildSelect(select) {
  return undefined;
}

function buildOrderBy(sort) {
  return undefined;
}

module.exports = {
  buildInclude,
  buildSelect,
  buildOrderBy,
};
