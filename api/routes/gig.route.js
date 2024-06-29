import express from "express";
import {
  getAllGigs,
  createGig,
  deleteGig,
  getGig,
} from "./../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
router.get("/", verifyToken, getAllGigs);
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/:id", verifyToken, getGig);

export default router;
