import { SearchDto } from "config/base";

export interface BookingCreateDto {
  customer_id: number;
  room_id: number;
  checked_in: Date;
  checked_out: Date;
  cancelled_at: Date;
  guests: number;
}

export interface BookingCancelDto {
  booking_id: string;
}

export interface BookingToggleDto {
  booking_id: string;
  toggle_type: "check-in" | "check-out";
}

export interface BookingSearchDto extends SearchDto {}
