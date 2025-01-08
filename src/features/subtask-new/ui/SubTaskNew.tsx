import { useCreateSubtask } from "@/entites/subtask/hooks";
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
import { Timestamp } from "firebase/firestore";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string(),
});

type SubTaskNewFormData = z.infer<typeof taskSchema>;

export const SubTaskNew = ({ taskId }: { taskId: string }) => {
  const [open, setOpen] = useState(false);
  const { mutate: createSubTask, isPending } = useCreateSubtask();
  const queryClient = useQueryClient();
  const disabled = !auth?.currentUser?.uid || !taskId;

  const methods = useForm<SubTaskNewFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const { control, handleSubmit, reset } = methods;

  const onSubmit = async (form: z.infer<typeof taskSchema>) => {
    try {
      const res = await createSubTask({
        ...form,
        taskId,
        status: "open",
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(false);
      reset();
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

      <DialogContent className="sm:max-w-[425px] top-0 translate-y-10">
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
              disabled={disabled}
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
              disabled={disabled}
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
              <Button disabled={isPending} type="submit">
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
