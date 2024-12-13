import { useProjectsSubscription } from "@/entites/project";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "@tanstack/react-router";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Button } from "@/shared/ui/button";

export const ProjectListWidjet = () => {
  const { data, isLoading, isSuccess } = useProjectsSubscription();

  return (
    <div className="p-8 w-full flex justify-center items-center flex-col gap-9 max-w-[1200px]">
      <h2 className="font-bold text-xl">Список проектов</h2>
      {isLoading && (
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      )}
      <div className="flex flex-col w-full gap-3">
        {isSuccess &&
          !!data.length &&
          data?.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <div className="flex gap-3 items-center justify-between h-16">
                <Avatar className="aspect-auto rounded-sm">
                  <AvatarImage
                    src="https://placehold.co/50x50"
                    className="rounded-full"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="w-full flex-1">
                  <h3 className="font-bold text-base">{project.name}</h3>
                  <p className="text-gray-500">{project.description}</p>
                </div>
                <div>
                  <Button size="icon" variant="outline">
                    <ExternalLinkIcon className="h-6 w-6 text-gray-500" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        {isSuccess && !data.length && (
          <p className="w-full text-center">У вас пока нет проектов</p>
        )}
      </div>
    </div>
  );
};
