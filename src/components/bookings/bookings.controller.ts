import { Request, Response } from "express";
import {
  BookingCancelDto,
  BookingSearchDto,
  BookingToggleDto,
} from "./bookings.dto";
import {
  cancelBookingService,
  createBookingService,
  searchBookingService,
  toggleBookingService,
} from "./bookings.service";

export const createBookingController = async (req: Request, res: Response) => {
  createBookingService(req.body).then(
    () => {
      res.sendStatus(200);
    },
    (responseError) => {
      res.status(400).send({
        message:
          typeof responseError.errors === "string"
            ? responseError.errors
            : responseError.errors.map((x: any) => x.message),
      });
    }
  );
};

export const cancelBookingController = async (
  req: Request<BookingCancelDto>,
  res: Response
) => {
  cancelBookingService(req.params).then(
    () => {
      res.sendStatus(200);
    },
    (responseError) => {
      res.status(400).send({
        message:
          typeof responseError.errors === "string"
            ? responseError.errors
            : responseError.errors.map((x: any) => x.message),
      });
    }
  );
};

export const toggleBookingController = async (
  req: Request<BookingToggleDto>,
  res: Response
) => {
  toggleBookingService({ ...req.body, booking_id: req.params.booking_id }).then(
    () => {
      res.sendStatus(200);
    },
    (responseError) => {
      res.status(400).send({
        message:
          typeof responseError.errors === "string"
            ? responseError.errors
            : responseError.errors.map((x: any) => x.message),
      });
    }
  );
};

export const searchBookingController = async (
  req: Request<BookingSearchDto>,
  res: Response
) => {
  searchBookingService(req.body).then(
    () => {
      res.sendStatus(200);
    },
    (responseError) => {
      res.status(400).send({
        message:
          typeof responseError.errors === "string"
            ? responseError.errors
            : responseError.errors.map((x: any) => x.message),
      });
    }
  );
};
