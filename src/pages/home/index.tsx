import { createPrivateRoute } from "@/shared/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../shared/ui/button";

export const indexRoute = createPrivateRoute({
  path: "/",
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/projects" });
  };

  return (
    <div className="p-2">
      <Button onClick={handleClick}>To projects</Button>
    </div>
  );
}

export default HomePage;
