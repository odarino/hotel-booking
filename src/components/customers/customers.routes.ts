import { Router } from "express";
import { createCustomerController } from "./customers.controller";

const router: Router = Router();

router.post("/customer", createCustomerController);

const CustomersRoutes: Router = router;

export default CustomersRoutes;
