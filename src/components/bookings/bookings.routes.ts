import { Router } from "express";
import {
  cancelBookingController,
  createBookingController,
  searchBookingController,
  toggleBookingController,
} from "./bookings.controller";

const router: Router = Router();

router.post("/booking", createBookingController);
router.put("/booking/:booking_id/cancel", cancelBookingController);
router.put("/booking/:booking_id/toggle", toggleBookingController);
router.post("/booking/search", searchBookingController);

const BookingRoutes: Router = router;

export default BookingRoutes;
