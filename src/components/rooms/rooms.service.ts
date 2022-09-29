import { dbContext } from "config/database-context";
import { RoomsCreateDto } from "./rooms.dto";

export const createRoomService = (room: RoomsCreateDto) => {
  return new Promise((resolve, reject) => {
    dbContext.rooms
      .create({
        title: room.title,
        room_number: room.room_number,
        description: room.description,
        price: room.price,
      })
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
