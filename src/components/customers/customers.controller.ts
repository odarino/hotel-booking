import { Request, Response } from "express";
import { createCustomerService } from "./customers.service";

export const createCustomerController = async (req: Request, res: Response) => {
  createCustomerService(req.body).then(
    () => {
      res.sendStatus(200);
    },
    (responseError) => {
      res.status(400).send({
        message: responseError.errors.map((x: any) => x.message),
      });
    }
  );
};
