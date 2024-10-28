import { User } from "@/libs/types/User.type";

export interface Room {
  id: string;
  users: User[];
  name: string;
  dataUrl: string | null;
}
