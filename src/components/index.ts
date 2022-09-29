import { Router } from "express";
import RoomsRoutes from "./rooms/rooms.routes";

const router: Router = Router();

router.use("/", RoomsRoutes);

const MainRouter: Router = router;

export default MainRouter;
