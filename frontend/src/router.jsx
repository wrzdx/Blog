import { createBrowserRouter, RouterProvider } from "react-router"
import App from "./App"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
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
    ],
  },
]

export default function Router() {
  const router = createBrowserRouter(routes, {
    // basename: "/Blog",
  })

  return <RouterProvider router={router} />
}