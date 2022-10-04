import { Router } from "express";
import BookingRoutes from "./bookings/bookings.routes";
import CustomersRoutes from "./customers/customers.routes";
import RoomsRoutes from "./rooms/rooms.routes";

const router: Router = Router();

router.use("/", RoomsRoutes);
router.use("/", CustomersRoutes);
router.use("/", BookingRoutes);

const MainRouter: Router = router;

export default MainRouter;
