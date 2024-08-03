import { db } from "@/shared/lib/firebaseConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { ISubTask } from "../models";
import { getSubTasksByTaskId, updateSubtaskStatus } from "../api";

export const useSubTaskByTaskIdSubscription = (taskId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const q = query(collection(db, "subtasks"), where("taskId", "==", taskId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subtasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ISubTask[];

      queryClient.setQueryData(["subtasks", taskId], subtasks);
    });

    return () => unsubscribe();
  }, [taskId, queryClient]);

  return useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getSubTasksByTaskId(taskId),
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
      queryClient.invalidateQueries({ queryKey: ["subtasks"] });
      queryClient.invalidateQueries({ queryKey: ["subtask", subtaskId] });
    },
    onError: (error) => {
      console.error("Error updating subtask status:", error);
    },
  });
};
