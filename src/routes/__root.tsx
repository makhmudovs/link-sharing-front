import { Outlet, createRootRouteWithContext, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthContext } from "../auth";
import Navbar from "../components/Navbar";
import { useRouterState } from "@tanstack/react-router";

interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: ({ context, location }) => {
    const publicRoutes = ["/login"];
    if (!context.auth.isAuthenticated && !publicRoutes.includes(location.pathname)) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: RootLayout,
});

function RootLayout() {
  const routerState = useRouterState();

  // Hide Navbar on login page
  const hideNavbar = routerState.location.pathname === "/login";

  return (
    <div className="h-screen">
      {!hideNavbar && <Navbar />}
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </div>
  );
}
