import { db } from "@/shared/lib/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { ITask } from "../models";

export const subscribeToTaskById = (
  taskId: string,
  callback: (task: ITask) => void
) => {
  const projectRef = doc(db, "tasks", taskId);
  return onSnapshot(projectRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const taskData = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as ITask;
      callback(taskData);
    }
  });
};
