import { db } from "@/shared/lib/firebaseConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { ISubTask } from "../models";
import {
  createSubTask,
  getSubTasksByTaskId,
  updateSubtaskStatus,
} from "../api";

export const useSubTaskByTaskId = (taskId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const q = query(collection(db, "subTasks"), where("taskId", "==", taskId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot, q);

      const subTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ISubTask[];

      queryClient.setQueryData(["subTasks", taskId], subTasks);
    });

    return () => unsubscribe();
  }, [taskId, queryClient]);

  return useQuery({
    queryKey: ["subTasks", taskId],
    queryFn: () => getSubTasksByTaskId(taskId),
  });
};

export const useCreateSubtask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subtask: Omit<ISubTask, "id">) => createSubTask(subtask),
    onSuccess: (_, subtask) => {
      queryClient.invalidateQueries({ queryKey: ["task", subtask.taskId] });
    },
    onError: (error) => {
      console.error("Error updating subtask status:", error);
    },
  });
};

export const useUpdateSubtaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      subtaskId,
      status,
    }: {
      subtaskId: string;
      status: string;
    }) => updateSubtaskStatus(subtaskId, status),
    onSuccess: (_, { subtaskId }) => {
      queryClient.invalidateQueries({ queryKey: ["subTasks"] });
      queryClient.invalidateQueries({ queryKey: ["subTasks", subtaskId] });
    },
    onError: (error) => {
      console.error("Error updating subtask status:", error);
    },
  });
};
