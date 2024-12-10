import { useTaskById, useTaskUpdate } from "@/entites/task";
import { taskIdRoute } from "@/pages/taskPage";
import { Button } from "@/shared/ui/button";
import {
  Card,
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
import { Loader } from "@/shared/ui/loader";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Это обязательное поле"),
  description: z.string().min(1, "Это обязательное поле"),
});
type TaskEditFormData = z.infer<typeof taskSchema>;

export const TaskDetails = () => {
  const { mutate, isPending, isSuccess } = useTaskUpdate();
  const { taskId } = taskIdRoute.useParams();
  const { data: task } = useTaskById(taskId);
  const form = useForm<TaskEditFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title,
      description: task?.description,
    },
  });

  const { handleSubmit, control, reset, formState } = form;

  const onSubmit: SubmitHandler<TaskEditFormData> = (data) => {
    if (!task) return;
    mutate({ ...task, ...data });
    // onExitEdit();
  };

  useEffect(() => {
    reset({ ...task });
  }, [task?.id]);

  useEffect(() => {
    if (isSuccess) {
      reset({ ...task });
    }
  }, [isSuccess]);

  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Детали задачи</CardTitle>
      </CardHeader>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={control}
                  name="title"
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
              </div>
              <div className="grid gap-3">
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
                            className="w-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {formState.isDirty && (
              <div className="flex items-center gap-2 ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    reset({ ...task });
                  }}
                >
                  Отменить
                </Button>
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending ? <Loader className="mx-7" /> : "Сохранить"}
                </Button>
              </div>
            )}
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
};
