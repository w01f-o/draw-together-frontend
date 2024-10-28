export interface CreateRoomDto {
  name: string;
  user: {
    name: string;
    id: string;
  };
}
