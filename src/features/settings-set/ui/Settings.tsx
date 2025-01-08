import { useSettingsStore } from "@/entites/setting/store/settings.store";
import { debounce } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const Settings = () => {
  const { settings, updateSettings } = useSettingsStore();
  const methods = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
    mode: "onChange",
  });

  const { control, watch } = methods;
  const formValues = watch();

  const debouncedSaveSettings = debounce(updateSettings, 1000);

  React.useEffect(() => {
    debouncedSaveSettings(formValues);
  }, [formValues]);

  return (
    <div className="grid gap-4">
      <FormProvider {...methods}>
        <form>
          {inputs.map((c) => (
            <div key={c.title} className="grid gap-2 mt-3">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{c.title}</h4>
              </div>
              {c.child?.map((i) => (
                <div
                  key={i.name}
                  className="grid grid-cols-3 items-center gap-4"
                >
                  <Label htmlFor={i.name} className="col-span-2">
                    {i.label}
                  </Label>
                  <Controller
                    name={i.name as any}
                    control={control}
                    render={({ field }) =>
                      i.type === "boolean" ? (
                        <Checkbox
                          id={i.name}
                          className="col-span-1 h-8 w-8"
                          checked={!!field.value}
                          onCheckedChange={(v) => field.onChange(v)}
                        />
                      ) : (
                        <Input
                          {...field}
                          id={i.label}
                          className="col-span-1 h-8"
                          type={i.type}
                        />
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
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
    on: z.boolean(),
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

const inputs = [
  {
    title: "Common",
    child: [
      {
        name: "tomato.time",
        type: "number",
        label: "Tomato time",
      },
      {
        name: "tomato.shortBreak",
        type: "number",
        label: "Short break",
      },
      {
        name: "tomato.longBreak",
        type: "number",
        label: "Long break",
      },
      {
        name: "tomato.autostartBreak",
        type: "boolean",
        label: "Auto start breaks",
      },
      {
        name: "tomato.autostartTomato",
        type: "boolean",
        label: "Auto start tomatos",
      },
    ],
  },
  {
    title: "Sound",
    child: [
      {
        name: "sound.on",
        type: "boolean",
        label: "Sound on",
      },
    ],
  },
];

{
  /* <div className="space-y-2 mt-5">
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
          </div> */
}
