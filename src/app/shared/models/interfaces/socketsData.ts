export interface IBookTableData {
  bookUserTable: {
    rent_start: string;
    rent_end: string;
    table_number: number;
    user_id: string
  };
  room_id: string;
  room: string;
}

export interface ICancelBookData {
  room_id: string;
  room: string;
  rent_start: Date | string;
  table_number: number;
}
