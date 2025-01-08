import { ProjectNewForm } from "@/features/project-new";
import { createPrivateRoute } from "@/shared/lib/utils";
import { ProjectListWidjet } from "@/widgets/ProjectList";

export const indexRoute = createPrivateRoute({
  path: "/",
  component: HomePage,
});

function HomePage() {
  return (
    <div className="h-[calc(100dvh - 72px)] gap-8 w-full flex flex-col items-center justify-start">
      <ProjectListWidjet />
      <ProjectNewForm />
    </div>
  );
}

export default HomePage;
