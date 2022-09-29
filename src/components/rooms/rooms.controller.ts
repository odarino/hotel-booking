import { Request, Response } from "express";
import { createRoomService } from "./rooms.service";

export const createRoomController = async (
  req: Request,
  res: Response,
  next: any
) => {
  createRoomService(req.body).then(
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
