import { ISubTask } from "@/entites/subtask";
import { createSubTask } from "@/entites/subtask/api";
import { taskIdRoute } from "@/pages/taskPage";
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
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string(),
});

type SubTaskNewFormData = z.infer<typeof taskSchema>;

export const SubTaskNew: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { taskId } = taskIdRoute?.useParams?.();
  const queryClient = useQueryClient();

  const methods = useForm<SubTaskNewFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { control, handleSubmit, getValues, reset } = methods;

  const onSubmit = async () => {
    if (!auth?.currentUser?.uid || !taskId) return;
    const data = getValues();
    const newSubTask: Omit<ISubTask, "id" | "createdAt"> = {
      title: data.title,
      description: data.description,
      taskId,
      status: "pending",
    };

    try {
      await createSubTask({
        ...newSubTask,
        createdAt: new Date(),
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Добавить подзадачу
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Новая подзадача</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      required
                      autoComplete="title"
                      placeholder="Название"
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
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Input
                      required
                      autoComplete="description"
                      placeholder="Описание"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="button" onClick={onSubmit}>
                Создать подзадачу
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SubTaskNew;
