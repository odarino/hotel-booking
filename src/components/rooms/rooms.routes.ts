import { Router } from "express";
import { createRoomController } from "./rooms.controller";

const router: Router = Router();

router.post("/room", createRoomController);

const RoomsRoutes: Router = router;

export default RoomsRoutes;
