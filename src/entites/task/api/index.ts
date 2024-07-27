import { db } from "@/shared/lib/firebaseConfig";
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
import { ITask } from "..";
import { title } from "process";

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
  await updateDoc(taskRef, {
    title: task.title,
    description: task.description,
  });
};

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
