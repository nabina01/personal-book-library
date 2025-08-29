import { Router } from "express";
import { createUserRead, getAllUserReads, getOneUserRead, updateUserRead, deleteUserRead } from "../controllers/userRead.controller.js";

const router = Router();

router.post("/", createUserRead);        // Create
router.get("/", getAllUserReads);        // Read all
router.get("/:id", getOneUserRead);      // Read one
router.put("/:id", updateUserRead);      // Update
router.delete("/:id", deleteUserRead);   // Delete

export default router;
