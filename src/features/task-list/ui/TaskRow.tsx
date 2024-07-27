import { ITask } from "@/entites/task";
import { PriorityLabel } from "@/shared/ui/priorityLabel";
import { TableRow, TableCell } from "@/shared/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Label } from "@radix-ui/react-label";
import { Link } from "@tanstack/react-router";

export const TaskRow = ({ isEdit, task }: { isEdit: boolean; task: ITask }) => (
  <TableRow key={task.id}>
    <Link to={`./${task.id}`} key={task.id}>
      <TableCell className="font-semibold">{task.title}</TableCell>
    </Link>

    <TableCell className="mx-auto">
      <Label htmlFor="priority-1" className="sr-only">
        Важность
      </Label>
      {isEdit ? (
        <ToggleGroup
          disabled={!isEdit}
          type="single"
          defaultValue={task.priority}
          variant="outline"
        >
          <ToggleGroupItem value="1">A</ToggleGroupItem>
          <ToggleGroupItem value="2">B</ToggleGroupItem>
          <ToggleGroupItem value="3">C</ToggleGroupItem>
        </ToggleGroup>
      ) : (
        <PriorityLabel className="mx-auto" value={task.priority}>
          {task.priority}
        </PriorityLabel>
      )}
    </TableCell>
    <TableCell className="mx-auto">
      <Label htmlFor="price-1" className="sr-only">
        Срочность
      </Label>
      {isEdit ? (
        <ToggleGroup
          disabled={!isEdit}
          type="single"
          defaultValue={task.importance}
          variant="outline"
        >
          <ToggleGroupItem value="1">A</ToggleGroupItem>
          <ToggleGroupItem value="2">B</ToggleGroupItem>
          <ToggleGroupItem value="3">C</ToggleGroupItem>
        </ToggleGroup>
      ) : (
        <PriorityLabel value={task.importance}>{task.importance}</PriorityLabel>
      )}
    </TableCell>
    <TableCell className="mx-auto">
      <Label htmlFor="price-1" className="sr-only">
        Объем
      </Label>
      {isEdit ? (
        <ToggleGroup
          disabled={!isEdit}
          type="single"
          defaultValue={task.complexity}
          variant="outline"
        >
          <ToggleGroupItem value="1">A</ToggleGroupItem>
          <ToggleGroupItem value="2">B</ToggleGroupItem>
          <ToggleGroupItem value="3">C</ToggleGroupItem>
        </ToggleGroup>
      ) : (
        <PriorityLabel value={task.complexity}>{task.complexity}</PriorityLabel>
      )}
    </TableCell>
  </TableRow>
);
