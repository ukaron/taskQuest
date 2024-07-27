import { debounce } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { z } from "zod";

export const Settings = () => {
  const methods = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const { control, watch } = methods;

  const formValues = watch();

  React.useEffect(() => {
    debouncedSaveSettings(formValues);
  }, [formValues]);

  return (
    <div className="grid gap-4">
      <FormProvider {...methods}>
        <form>
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Tomato timer</h4>
          </div>
          <div className="grid gap-2 mt-3">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="timato-time">Tomato time</Label>
              <Controller
                name="tomato.time"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="timato-time"
                    className="col-span-2 h-8"
                    type="number"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tomato.shortBreak">Short break</Label>
              <Controller
                name="tomato.shortBreak"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="tomato.shortBreak"
                    className="col-span-2 h-8"
                    type="number"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tomato.longBreak">Long break</Label>
              <Controller
                name="tomato.longBreak"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="tomato.longBreak"
                    className="col-span-2 h-8"
                    type="number"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tomato.autostartBreak">Auto start breaks</Label>
              <Controller
                name="tomato.autostartBreak"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    value={+field.value}
                    id="tomato.autostartBreak"
                    className="col-span-2 "
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tomato.autostartTomato">Auto start tomatos</Label>
              <Controller
                name="tomato.autostartTomato"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    onCheckedChange={field.onChange}
                    value={+field.value}
                    id="tomato.autostartTomato"
                    className="col-span-2 "
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-2 mt-5">
            <h4 className="font-medium leading-none">Window</h4>
          </div>
          <div className="grid gap-2 mt-3">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="window.opacity">Opacity</Label>
              <Controller
                name="window.opacity"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="window.opacity"
                    className="col-span-2 h-8"
                    type="number"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="window.onTop">Поверх всех окон</Label>
              <Controller
                name="window.onTop"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    onCheckedChange={field.onChange}
                    value={+field.value}
                    id="window.onTop"
                    className="col-span-2 "
                  />
                )}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const settingsSchema = z.object({
  tomato: z.object({
    time: z.number().min(1, "Time must be at least 1 minute"),
    shortBreak: z.number().min(1, "Short break must be at least 1 minute"),
    longBreak: z.number().min(1, "Long break must be at least 1 minute"),
    autostartBreak: z.boolean(),
    autostartTomato: z.boolean(),
    longBreakInterval: z.number().min(1, "Interval must be at least 1"),
  }),
  sound: z.object({
    alarmSound: z.string().nonempty("Alarm sound is required"),
    alarmVol: z.number().min(0).max(100),
    tickSound: z.string().nonempty("Tick sound is required"),
    tickVol: z.number().min(0).max(100),
  }),
  notification: z.object({
    on: z.boolean(),
  }),
  window: z.object({
    opacity: z.number().min(0).max(100),
    onTop: z.boolean(),
    resize: z.boolean(),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const defaultValues: SettingsFormData = {
  tomato: {
    time: 25,
    shortBreak: 5,
    longBreak: 15,
    autostartBreak: false,
    autostartTomato: false,
    longBreakInterval: 4,
  },
  sound: {
    alarmSound: "default",
    alarmVol: 50,
    tickSound: "default",
    tickVol: 50,
  },
  notification: {
    on: true,
  },
  window: {
    opacity: 100,
    onTop: false,
    resize: true,
  },
};

const saveSettings = async (data: SettingsFormData) => {
  // Логика для сохранения настроек на бэкенде
  console.log("Saving settings", data);
};

const debouncedSaveSettings = debounce(saveSettings, 1000);
