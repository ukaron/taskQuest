import { db } from "@/shared/lib/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ITask } from "..";

export const addTask = async (task: ITask) => {
  try {
    await addDoc(collection(db, "tasks"), task);
  } catch (e) {
    console.error("Error adding task: ", e);
  }
};

export const getTaskListByProjectID = async (projectId: string) => {
  try {
    const q = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ITask[];
  } catch (e) {
    console.error("Error query products: ", e);
    return [];
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    const q = query(collection(db, "tasks"), where("taskId", "==", taskId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((t) => t.id === taskId)[0] as ITask;
  } catch (e) {
    console.error("Error query products: ", e);
  }
};

export const updateTask = async (task: ITask): Promise<void> => {
  const taskRef = doc(db, "tasks", task.id);
  return await updateDoc(taskRef, { ...task });
};

export const deleteTask = async (task: ITask): Promise<void> => {
  const taskRef = doc(db, "tasks", task.id);

  return await deleteDoc(taskRef);
};
