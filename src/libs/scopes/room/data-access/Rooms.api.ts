import { Room } from "@/libs/types/Room.type";
import { CreateRoomDto } from "@/libs/types/dtos/createRoom.dto";

export class RoomsApi {
  public static findAll() {}

  public static async findById(id: string): Promise<Room> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`,
      { cache: "no-store" },
    );

    return response.json();
  }

  public static async create(createRoomDto: CreateRoomDto) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(createRoomDto),
    });

    return response.json();
  }
}
