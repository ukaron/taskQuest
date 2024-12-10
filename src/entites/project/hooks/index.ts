import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProject,
  getProjectsById,
  getProjectsList,
  subscribeToProject,
  subscribeToProjects,
  updateProject,
} from "../api";
import { useEffect } from "react";
import { auth } from "@/shared/lib/firebaseConfig";

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

export const useProjectById = (projectId: string) => {
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

export const useProjectsSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToProjects((project) => {
      queryClient.setQueryData(["projects"], project);
    });

    return () => unsubscribe();
  }, [queryClient, auth.currentUser?.uid]);

  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsList(),
  });
};
