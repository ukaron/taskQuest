import { auth, db } from "@/shared/lib/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { IProject } from "../models";

export const addProject = async (project: Omit<IProject, "id">) => {
  try {
    const res = await addDoc(collection(db, "projects"), project);
    return res;
  } catch (e) {
    console.error("Error adding project: ", e);
  }
};

export const updateProject = async (project: IProject): Promise<void> => {
  const projectRef = doc(db, "projects", project.id);
  await updateDoc(projectRef, {
    name: project.name,
    description: project.description,
  });
};

export const deleteProject = async (projectId: string) => {
  const projectRef = doc(db, "projects", projectId);
  await deleteDoc(projectRef);
};

export const getProjectsById = async (id: string) => {
  try {
    const q = query(
      collection(db, "projects"),
      where("ownerId", "==", auth.currentUser?.uid || "")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .filter((doc) => doc.id === id)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))[0] as IProject;
  } catch (e) {
    console.error("Error querying projects: ", e);
  }
};

export const getProjectsList = async () => {
  try {
    const q = query(
      collection(db, "projects"),
      where("ownerId", "==", auth.currentUser?.uid || "")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IProject[];
  } catch (e) {
    console.error("Error query projects: ", e);
    return [];
  }
};

export const subscribeToProjects = (
  callback: (projects: IProject[]) => void
) => {
  const q = query(
    collection(db, "projects"),
    where("ownerId", "==", auth.currentUser?.uid || "")
  );
  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IProject[];
    callback(projects);
  });
};

export const subscribeToProject = (
  projectId: string,
  callback: (project: IProject) => void
) => {
  const projectRef = doc(db, "projects", projectId);
  return onSnapshot(projectRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const projectData = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as IProject;
      callback(projectData);
    }
  });
};
