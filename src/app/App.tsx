import { RouterProvider } from "@tanstack/react-router";
import React, { StrictMode } from "react";
import { router } from "./_router";

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
