import express from "express";
import protect from "../middleware/authMiddleware.js";
const router = express.Router({ mergeParams: true });
import {
  getShopBaskets,
  createShopBasket,
  deleteBasket,
  updateBasket,
} from "../controllers/basketController.js";

router.route("/").get(protect, getShopBaskets).post(protect, createShopBasket);
router
  .route("/:basketId")
  .delete(protect, deleteBasket)
  .put(protect, updateBasket);

export default router;
