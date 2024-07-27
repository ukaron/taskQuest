import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProject,
  getProjectsById,
  subscribeToProject,
  updateProject,
} from "../api";
import { useEffect } from "react";

export const useProjectsById = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectsById(id),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Error updating project:", error);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });
};

export const useProjectSubscription = (projectId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToProject(projectId, (project) => {
      queryClient.setQueryData(["projects", projectId], project);
    });

    return () => unsubscribe();
  }, [projectId, queryClient]);

  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProjectsById(projectId),
  });
};
