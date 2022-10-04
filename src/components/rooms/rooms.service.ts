import { dbContext } from "config/database-context";
import { RoomsCreateDto } from "./rooms.dto";

export const createRoomService = (room: RoomsCreateDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await dbContext.rooms.create({
        title: room.title,
        room_number: room.room_number,
        room_type: room.room_type,
        description: room.description,
        price: room.price,
        max_guests: room.max_guests,
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
