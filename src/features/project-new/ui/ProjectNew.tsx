import { IProject } from "@/entites/project";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { auth, db } from "@/shared/lib/firebaseConfig";
import { useNavigate } from "@tanstack/react-router";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
});

type ProjectNewFormData = z.infer<typeof projectSchema>;

export const ProjectNewForm: React.FC = () => {
  const navigator = useNavigate();
  const methods = useForm<ProjectNewFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", description: "" },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data: ProjectNewFormData) => {
    if (!auth?.currentUser?.uid) return;
    const newProject: Omit<IProject, "id" | "createdAt"> = {
      name: data.name,
      description: data.description,
      ownerId: auth?.currentUser?.uid,
      projects: [],
    };

    try {
      const res = await addDoc(collection(db, "projects"), {
        ...newProject,
        createdAt: new Date(),
      });
      console.log(res);
      navigator({ to: `/${res.id}` });
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white max-w-md p-8 rounded shadow-md flex flex-col gap-2"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input
                  required
                  autoComplete="name"
                  placeholder="Project Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Input
                  required
                  autoComplete="description"
                  placeholder="Project Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Project</Button>
      </form>
    </FormProvider>
  );
};

export default ProjectNewForm;
