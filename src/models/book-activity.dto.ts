import { Id } from "./id.type";

export type BookActivityDTO = {
  activityId: Id;
  customerId: Id;
  places?: number;
};
