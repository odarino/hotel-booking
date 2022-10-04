import { dbContext } from "config/database-context";
import { Op } from "sequelize";
import {
  BookingCancelDto,
  BookingCreateDto,
  BookingSearchDto,
  BookingToggleDto,
} from "./bookings.dto";

export const createBookingService = (booking: BookingCreateDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check if room available
      const response = await dbContext.bookings.findOne({
        where: { room_id: booking.room_id, checked_out_actual: null },
      });

      if (response) {
        throw new Error("Room has been booked. Please choose another room.");
      }

      const bookingResponse = dbContext.bookings.create({
        customer_id: booking.customer_id,
        room_id: booking.room_id,
        checked_in_origin: booking.checked_in,
        checked_out_origin: booking.checked_out,
        cancelled_at: booking.cancelled_at,
        guests: booking.guests,
      });

      resolve(bookingResponse);
    } catch (err) {
      if (err instanceof Error) {
        reject({ errors: err.message });
      } else {
        reject(err);
      }
    }
  });
};

export const cancelBookingService = (booking: BookingCancelDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await dbContext.bookings.findOne({
        where: { id: booking.booking_id, cancelled_at: null },
      });

      if (!response) {
        throw new Error("Not found booking with given id");
      }

      if (response.getDataValue("checked_out_actual")) {
        throw new Error("This booking has already checked out. Cannot cancel");
      }

      const bookingCancelResp = dbContext.bookings.update(
        { cancelled_at: new Date(Date.now()) },
        { where: { id: booking.booking_id } }
      );

      resolve(bookingCancelResp);
    } catch (err) {
      if (err instanceof Error) {
        reject({ errors: err.message });
      } else {
        reject(err);
      }
    }
  });
};

export const toggleBookingService = (booking: BookingToggleDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await dbContext.bookings.findOne({
        where: { id: booking.booking_id, [Op.or]: [{ cancelled_at: null }] },
      });

      if (!response) {
        throw new Error("Not found booking with given id");
      }

      let bookingCancelResp = {};

      if (booking.toggle_type === "check-in") {
        if (response.getDataValue("checked_in_actual")) {
          throw new Error("This booking has been checked in already");
        }

        dbContext.bookings.update(
          { checked_in_actual: new Date(Date.now()) },
          {
            where: { id: booking.booking_id },
          }
        );
      } else if (booking.toggle_type === "check-out") {
        if (response.getDataValue("checked_out_actual")) {
          throw new Error("This booking has been checked out already");
        }

        if (!response.getDataValue("checked_in_actual")) {
          throw new Error(
            "This booking cannot check out without checking in first"
          );
        }

        dbContext.bookings.update(
          { checked_out_actual: new Date(Date.now()) },
          {
            where: { id: booking.booking_id },
          }
        );
      }

      resolve(bookingCancelResp);
    } catch (err) {
      if (err instanceof Error) {
        reject({ errors: err.message });
      } else {
        reject(err);
      }
    }
  });
};

// allow to search by
// user_id
// checked_in
// checked_out
// room_id
export const searchBookingService = (payload: BookingSearchDto) => {
  return new Promise((resolve, reject) => {
    const whereQuery = payload.keyword
      ? { [Op.like]: `%${payload.keyword}%` }
      : {};

    dbContext.bookings
      .findAndCountAll({
        where: {
          title: whereQuery,
        },
        limit: payload.limit || 10,
        offset: payload.offset || 0,
        order: [["createdAt", "DESC"]],
      })
      .then((values) => {
        resolve(values);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
