type RoomTypeObj = { [char: string]: number };

export const RoomType: RoomTypeObj = {
  Single: 1,
  Double: 2,
  Twin: 3,
  Queen: 4,
  King: 5,
  Suite: 6,
};

export const RoomTypeArr = Object.keys(RoomType).map((key) => ({
  type: key,
  value: RoomType[key],
}));
