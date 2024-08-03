import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api";

export const useSettings = (userId: string) => {
  return useQuery({
    queryKey: ["settings", userId],
    queryFn: () => getSettings(),
  });
};
