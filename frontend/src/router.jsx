import { createBrowserRouter, RouterProvider } from "react-router"
import App from "./App"
import Home from "./components/Home/Home"
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
    ],
  },
]

export default function Router() {
  const router = createBrowserRouter(routes, {
    // basename: "/Blog",
  })

  return <RouterProvider router={router} />
}