import { Table } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
  X,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { TableFilter } from "./TableFilter";
import { TaskStatus } from "@/entites/task";

interface DataTableToolbarProps<ITask> {
  table: Table<ITask>;
}

export function TableToolbar<ITask>({ table }: DataTableToolbarProps<ITask>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <TableFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <TableFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}

export const statuses = [
  {
    value: TaskStatus.Backlog,
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: TaskStatus.Open,
    label: "Open",
    icon: Circle,
  },
  {
    value: TaskStatus.InProgress,
    label: "In Progress",
    icon: Timer,
  },
  {
    value: TaskStatus.Done,
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: TaskStatus.Canceled,
    label: "Canceled",
    icon: CircleOff,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];
