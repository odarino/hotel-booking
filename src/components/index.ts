import { Router } from "express";
import CustomersRoutes from "./customers/customers.routes";
import RoomsRoutes from "./rooms/rooms.routes";

const router: Router = Router();

router.use("/", RoomsRoutes);
router.use("/", CustomersRoutes);

const MainRouter: Router = router;

export default MainRouter;
