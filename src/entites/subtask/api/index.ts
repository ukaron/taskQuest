import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebaseConfig";
import { ISubTask } from "../models";

export const createSubTask = async (subTask: Omit<ISubTask, "id">) => {
  return await addDoc(collection(db, "subTasks"), subTask);
};

export const getSubTasksByTaskId = async (taskId: string) => {
  const q = query(collection(db, "subTasks"), where("taskId", "==", taskId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ISubTask[];
};

export const subscribeToSubTaskById = (
  taskId: string,
  callback: (task: ISubTask) => void
) => {
  const projectRef = doc(db, "tasks", taskId);
  return onSnapshot(projectRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const taskData = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as ISubTask;
      callback(taskData);
    }
  });
};

export const updateSubtaskStatus = async (
  subtaskId: string,
  status: string
) => {
  const docRef = doc(db, "subTasks", subtaskId);
  await updateDoc(docRef, { status });
};
