import { cn } from "../lib/utils";

export const Loader = ({ className }: { className?: string }) => {
  // todo: make it flexible
  return (
    <div
      className={cn(
        "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-primary",
        className
      )}
    />
  );
};
