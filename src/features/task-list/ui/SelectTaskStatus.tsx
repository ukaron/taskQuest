"use client";

import * as React from "react";

import { ITask, TaskStatus, useTaskUpdate } from "@/entites/task";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { statuses } from "./TableToolbar";

export const SelectTaskStatus = ({
  task,
  curStatus,
}: SelectTaskStatusProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<any>(curStatus);

  const hook = useTaskUpdate();

  const handleChangeStatus = (value: string) => {
    try {
      const newStatus = statuses.find((s) => s.value.toString() === value);
      if (newStatus) hook.mutate({ ...task, status: newStatus?.value });
      setSelectedStatus(newStatus);
    } catch (err) {
      console.log(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={selectedStatus?.variantButton}>
          {selectedStatus ? <>{selectedStatus.label}</> : <>Set status</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Change status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value.toString()}
                  onSelect={handleChangeStatus}
                >
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface SelectTaskStatusProps {
  task: ITask;
  curStatus:
    | {
        value: TaskStatus;
        label: string;
        variantButton: "yellow" | "ghost" | "blue" | "green" | "red";
      }
    | undefined;
}
