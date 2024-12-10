import { Timestamp } from "firebase/firestore";

export interface IProject {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: Timestamp;
}
