import { IProject, updateProject } from "@/entites/project";
import { ProjectNewForm } from "@/features/project-new";
import { Button } from "@/shared/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IProjectEditFormProps {
  project?: IProject;
  onExitEdit: () => void;
}

export const ProjectEditForm: React.FC<IProjectEditFormProps> = ({
  project,
  onExitEdit,
}: IProjectEditFormProps) => {
  const methods = useForm<ProjectEditFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: project?.name, description: project?.description },
  });

  const { handleSubmit, control } = methods;

  const onSubmit: SubmitHandler<ProjectEditFormData> = (data) => {
    if (!project) return;
    updateProject({ ...project, ...data });
    onExitEdit();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded shadow-md flex flex-col gap-2"
      >
        <CardContent>
          <div className="grid gap-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <div className="grid gap-3">
                      <Input
                        {...field}
                        id="Название"
                        type="text"
                        className="w-full"
                      />
                    </div>
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
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <div className="grid gap-3">
                      <Textarea
                        {...field}
                        id="description"
                        className="min-h-32"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 ">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onExitEdit();
              }}
            >
              Discard
            </Button>
            <Button type="submit" size="sm">
              Save
            </Button>
          </div>
        </CardFooter>
      </form>
    </FormProvider>
  );
};

export default ProjectNewForm;

type ProjectEditFormData = z.infer<typeof projectSchema>;

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
});
