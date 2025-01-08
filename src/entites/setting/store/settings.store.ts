import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { defaultSettings } from "../models/setting.models";
import { getSettings, updateSettings } from "../api";

export type SettingsState = typeof defaultSettings;

interface SettingsStore {
  settings: SettingsState;
  updateSettings: (partialSettings: Partial<SettingsState>) => void;
  syncSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    devtools((set, get) => ({
      settings: defaultSettings,

      updateSettings: (partialSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...partialSettings },
        }));
        updateSettings(get().settings);
      },

      syncSettings: async () => {
        const serverSettings = await getSettings();
        if (serverSettings) {
          set({ settings: serverSettings });
        }
      },
    })),
    { name: "settings-storage" }
  )
);
