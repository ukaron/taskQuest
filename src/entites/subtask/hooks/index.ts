import { db } from "@/shared/lib/firebaseConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { ISubTask } from "../models";
import { getSubTasksByTaskId } from "../api";

export const useSubTaskByTaskIdSubscription = (taskId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const q = query(collection(db, "subTasks"), where("taskId", "==", taskId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
