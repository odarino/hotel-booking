import { RoomType } from "utils/constants";

export type RoomsCreateDto = {
  title: string;
  room_number: number;
  room_type: typeof RoomType;
  price?: number;
  description: number;
};
