import { IProject, addProject } from "@/entites/project";
import { auth } from "@/shared/lib/firebaseConfig";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Timestamp } from "firebase/firestore";
import { PlusCircle } from "lucide-react";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
});

type ProjectNewFormData = z.infer<typeof projectSchema>;

export const ProjectNewForm: FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const form = useForm<ProjectNewFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", description: "" },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: ProjectNewFormData) => {
    try {
      if (!auth?.currentUser?.uid) return;
      setLoading(true);

      const newProject: Omit<IProject, "id"> = {
        name: data.name,
        description: data.description,
        ownerId: auth?.currentUser?.uid,
        createdAt: Timestamp.now(),
      };

      const res = await addProject(newProject);
      navigator({ to: `/projects/${res?.id}` });
    } catch (error) {
      console.error("Error adding project: ", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="default" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Новый проект
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] top-0 translate-y-10">
        <DialogHeader>
          <DialogTitle>Новый проект</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full  max-w-md flex flex-col gap-2"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название проекта</FormLabel>
                  <FormControl>
                    <Input required {...field} />
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
                  <FormLabel>Описание </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-8">
              <Button disabled={loading} type="submit">
                Create Project
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectNewForm;
