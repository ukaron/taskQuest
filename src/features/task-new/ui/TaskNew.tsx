import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { projectIdRoute } from "@/pages/project-read";
import { ITask, TaskStatus } from "@/entites/task";
import { auth, db } from "@/shared/lib/firebaseConfig";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { addDoc, collection } from "firebase/firestore";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Rating } from "@/shared/constans";
import { useState } from "react";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string(),
  priority: z.enum(Rating),
  importance: z.enum(Rating),
  complexity: z.enum(Rating),
  order: z.number(),
  dueDate: z.date(),
});

type TaskNewFormData = z.infer<typeof taskSchema>;

export const TaskNew: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = projectIdRoute?.useParams?.<{ projectId: string }>();
  const queryClient = useQueryClient();

  const methods = useForm<TaskNewFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "2",
      importance: "2",
      complexity: "2",
    },
  });

  const { control, handleSubmit, getValues, reset } = methods;

  const onSubmit = async () => {
    if (!auth?.currentUser?.uid || !projectId) return;
    const data = getValues();
    const newTask: Omit<ITask, "id" | "createdAt"> = {
      title: data.title,
      description: data.description,
      projectId,
      status: TaskStatus.Open,
      priority: data.priority,
      importance: data.importance,
      complexity: data.complexity,
      order: data?.order || 0,
    };

    try {
      setIsLoading(true);
      await addDoc(collection(db, "tasks"), {
        ...newTask,
        createdAt: new Date(),
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error adding task: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Добавить задачу
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Новая задача</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <FormField
              control={control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Приоритет</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      id="priority"
                      type="single"
                      variant="outline"
                      className="justify-start"
                    >
                      {Rating.map((r) => (
                        <ToggleGroupItem
                          onClick={() => {
                            field.onChange(r);
                          }}
                          key={r}
                          value={r}
                        >
                          {r}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="importance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Срочность</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      id="priority"
                      type="single"
                      variant="outline"
                      className="justify-start"
                    >
                      {Rating.map((r) => (
                        <ToggleGroupItem
                          onClick={() => {
                            field.onChange(r);
                          }}
                          key={r}
                          value={r}
                        >
                          {r}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="complexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сложность</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      id="priority"
                      type="single"
                      variant="outline"
                      className="justify-start"
                    >
                      {Rating.map((r) => (
                        <ToggleGroupItem
                          onClick={() => {
                            field.onChange(r);
                          }}
                          key={r}
                          value={r}
                        >
                          {r}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" disabled={isLoading} onClick={onSubmit}>
                Создать задачу
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default TaskNew;
