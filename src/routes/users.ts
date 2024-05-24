import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import asyncHandler from "../Utils/asyncHandler";
import authenticateToken from "../middlewares/authenticateToken";

// Import Handler Functions
import findOne from "../handlers/users/findOne";
import createProfile from "../handlers/users/createProfile";
import getProfile from "../handlers/users/getProfile";
import updateUser from "../handlers/users/updateUser";
import deleteUser from "../handlers/users/deleteUser";
import findById from "../handlers/users/findById";
import findAll from "../handlers/users/findAll";
import getStats from "../handlers/users/getStats";

const router = Router();

// Get All Users with newUser? query
router.get("/", authenticateToken, asyncHandler(findAll))

// Get a single user
router.get("/findOne", authenticateToken, findOne);

// Get a single User by Id
router.get("/find/:id", authenticateToken, asyncHandler(findById));

// Update a user's fields
router.put("/update/:id", authenticateToken, asyncHandler(updateUser));

// Delete a User
router.delete("/delete/:id", authenticateToken, asyncHandler(deleteUser));

router.get("/stats", authenticateToken, asyncHandler(getStats))

// Get a profile
router.get("/profiles/:id",authenticateToken, asyncHandler(getProfile));

// Create A new profile
router.post("/createProfile", authenticateToken, asyncHandler(createProfile))

export default router;