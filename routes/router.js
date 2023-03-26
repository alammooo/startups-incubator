const Controller = require("../controllers/controller")
const router = require("express").Router()

router.get("/", Controller.listAllIncubator)
router.get("/incubators/add", Controller.addIncubator)
router.post("/incubators/add", Controller.addIncubatorPost)
router.get("/incubators/:incubatorId", Controller.incubatorById)
router.get("/incubators/:incubatorId/startUp/add", Controller.addStartup)
router.post("/incubators/:incubatorId/startUp/add", Controller.addStartupPost)
router.get(
  "/incubators/:incubatorId/startUp/:startUpId/edit",
  Controller.editStartup
)
router.post(
  "/incubators/:incubatorId/startUp/:startUpId/edit",
  Controller.editStartupPost
)
router.get(
  "/incubators/:incubatorId/startUp/:startUpId/delete",
  Controller.deleteStartup
)
// router.get("/startUp", Controller.listAllStartup)
router.get("/startUp", Controller.filterStartup)

module.exports = router
