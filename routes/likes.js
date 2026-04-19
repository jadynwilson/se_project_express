const router = require("express").Router();
const { likeItem, dislikeItem } = require("../controllers/likes");
const { validateId } = require("../middlewares/validation");

router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, dislikeItem);

router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
