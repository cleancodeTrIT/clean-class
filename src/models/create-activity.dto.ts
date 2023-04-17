import { Id } from "./id.type";

export type CreateActivityDTO = {
  organizerId: Id;
  title: string;
  location: string;
  date: string;
  price: number;
  capacity?: number;
  quorum?: number;
};
