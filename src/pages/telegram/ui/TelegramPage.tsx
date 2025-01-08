import { rootRoute } from "@/app/_router";
import { authorizeOrRegisterFirebaseUser } from "@/features/auth/auth/model/firebase";
import { auth } from "@/shared/lib/firebaseConfig";
import { Loader } from "@/shared/ui/loader";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const telegramRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/telegram",
  component: TelegramPage,
});

function TelegramPage() {
  const searchParams = telegramRoute.useSearch<{ tgWebAppData: string }>();
  const navigator = useNavigate();
  const init = useRef(false);

  useEffect(() => {
    (async () => {
      if (init.current) return;
      init.current = true;
      const params = new URLSearchParams(
        searchParams.tgWebAppData || window.location.hash
      );
      const telegramData: Record<string, string> = {};

      params.forEach((value, key) => {
        telegramData[key] = value;
      });

      try {
        // const isValid = await verifyTelegramData(telegramData, botToken); // todo
        const { hash, ...rest } = telegramData;
        const userCredential = await authorizeOrRegisterFirebaseUser(
          JSON.parse(rest.user)
        );
        if (userCredential.user.uid) {
          navigator({ to: "/" });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="h-[calc(100dvh - 72px)] gap-8 w-full flex flex-col items-center justify-center">
      {auth?.currentUser?.uid ? auth?.currentUser?.displayName : <Loader />}
    </div>
  );
}

export default TelegramPage;
