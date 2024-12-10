import { subscribeToProject } from "@/entites/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  deleteTask,
  getTaskById,
  getTaskListByProjectID,
  updateTask,
} from "../api";
import { subscribeToTaskById } from "../api/subscribes";

export const useTaskUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error updating project:", error);
    },
  });
};

export const useTaskDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error updating project:", error);
    },
  });
};

export const useTasksByProjectId = (projectId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToProject(projectId, (project) => {
      queryClient.setQueryData(["projects", projectId], project);
    });

    return () => unsubscribe();
  }, [projectId, queryClient]);

  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTaskListByProjectID(projectId),
  });
};

export const useTaskById = (taskId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToTaskById(taskId, (task) => {
      queryClient.setQueryData(["tasks", taskId], task);
    });

    return () => unsubscribe();
  }, [taskId, queryClient]);

  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => getTaskById(taskId),
  });
};
