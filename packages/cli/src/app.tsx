import { createMemoryRouter, RouterProvider } from "react-router";
import { RootLayout } from "./layout";
import { Home, NewSession, Session } from "./screens";

const router = createMemoryRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sessions/new",
        element: <NewSession />,
      },
      {
        path: "sessions/:id",
        element: <Session />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
