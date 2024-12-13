import { rootRoute } from "@/app/_router";
import { RouteComponent, createRoute, redirect } from "@tanstack/react-router";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CreatePrivateRouteParams {
  component: RouteComponent;
  path: string;
  root?: any;
  redirectTo?: string;
}

export function createPrivateRoute({
  root,
  component,
  path,
  redirectTo,
}: CreatePrivateRouteParams) {
  return createRoute({
    getParentRoute: () => root || rootRoute,
    path,
    component,
    beforeLoad: () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw redirect({
          to: redirectTo || "/auth",
        });
      }
    },
  });
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
