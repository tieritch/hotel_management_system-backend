///const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");

const {
  permissionRepository,
  resourceRepository,
  actionRepository,
} = require("../repositories");

const permissionController = {
  async findAll(req, res) {
    try {
      const permissions = await permissionRepository.findAll();
      res.status(200).json(permissions);
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },

  async findBy(req, res) {
    try {
      const permission = await permissionRepository.findBy(req.query);
      res.status(200).json(permission);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },

  async findById(req, res) {
    try {
      const permission = await permissionRepository.findById(req.params.id);
      res.status(200).json(permission);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const permissions = req.validatedData;

      // 1. Extract unique resource IDs
      const resourceIds = [...new Set(permissions.map((p) => p.resourceId))];
      console.log("resource ids:", resourceIds);

      // 2. Extract unique action IDs
      const actionIds = [...new Set(permissions.map((p) => p.actionId))];
      console.log("action ids:", actionIds);

      console.log("permissions before:", permissions);
      // 3. Fetch existing resources from DB (optimized query)
      const resources = await resourceRepository.findBy({
        id: { in: resourceIds },
      });

      // 4. Fetch existing actions from DB (optimized query)
      const actions = await actionRepository.findBy({
        id: { in: actionIds },
      });

      //  console.log("resources:", resources);
      // console.log("actions:", actions);
      // 5. Build sets for fast lookup
      const validResourceIds = new Set(resources?.map((r) => r.id));

      const validActionIds = new Set(actions?.map((a) => a.id));

      // 6. Track ignored invalid entries
      const ignored = {
        resources: new Set(),
        actions: new Set(),
      };

      // 7. Filter invalid permission

      let cleaned = permissions.filter((perm) => {
        const resourceValid = validResourceIds.has(perm.resourceId);

        if (!resourceValid) {
          ignored.resources.add(perm.resourceId);
          return false;
        }

        const actionValid = validActionIds.has(perm.actionId);

        if (!actionValid) {
          ignored.actions.add(perm.actionId);
          return false;
        }
        return true;
      });

      console.log(" ignored before:", ignored);

      // find permissions already existing in DB
      const existingPerms = await permissionRepository.findAll();

      // remove from cleaned those permissions already existing in DB
      cleaned = cleaned.filter(
        (cl) =>
          !existingPerms.some((perm) => {
            if (
              perm.action_id == cl.actionId &&
              perm.resource_id == cl.resourceId
            ) {
              ignored.resources.add(cl.resourceId);
              ignored.actions.add(cl.actionId);
              return true;
            } else {
              ignored.resources.add(perm.resourceId);
              ignored.actions.add(perm.actionId);
              return false;
            }
          })
      );

      if (cleaned.length === 0) {
        return res.status(200).json({
          message: "No valid permissions to create",
          ignored: {
            resources: [...ignored.resources],
            actions: [...ignored.actions],
          },
        });
      }

      //  console.log("cleaned:", cleaned);
      cleaned = cleaned.map((v) => {
        const action_id = v.actionId;
        const resource_id = v.resourceId;
        return { resource_id, action_id };
      });
      console.log("cleaned_____________________________:", cleaned);
      // 9. Insert cleaned permissions into database
      const created = await permissionRepository.createMany(cleaned);

      console.log(
        "****************************************************************"
      );
      // 10. Return success response with metadata
      return res.status(201).json({
        message: "Permissions created successfully",
        createdCount: created.count,
        ignored: {
          resources: [...ignored.resources],
          actions: [...ignored.actions],
        },
      });
    } catch (err) {
      console.error(err);

      // 11. Handle unexpected server errors
      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },
};
module.exports = { permissionController };
