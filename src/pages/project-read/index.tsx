import { TaskList } from "@/features/task-list";
import { TaskNew } from "@/features/task-new";
import { createPrivateRoute } from "@/shared/lib/utils";
import { ProjectHeader } from "@/widgets/ProjectHeader";

export const projectIdRoute = createPrivateRoute({
  path: "projects/$projectId",
  component: ProjectPage,
});

export function ProjectPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid w-full max-w-[1200px] flex-1 auto-rows-max gap-4 pt-4">
          <ProjectHeader />
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <TaskList>
                <TaskNew />
              </TaskList>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              {/* <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Active</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
              {/* <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Project Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
              {/* <Card x-chunk="dashboard-07-chunk-5">
                <CardHeader>
                  <CardTitle>Manage Project</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <ProjectDeleteButton />
                  <Button size="sm" variant="outline" className="">
                    Archeve
                  </Button>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
