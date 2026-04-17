import { createBrowserRouter, RouterProvider } from "react-router"
import { SignUp } from "./components/SignUp/SignUp"
import { Login } from "./components/Login/Login"
import { Home } from "./components/Home/Home"
import { App } from "./App"
// import ErrorPage from "./components/error/Error"

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <SignUp />,
        path: "/register",
      },
    ],
  },
]

export default function Router() {
  const router = createBrowserRouter(routes, {
    // basename: "/Blog",
  })

  return <RouterProvider router={router} />
}
