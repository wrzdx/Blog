import { createBrowserRouter, RouterProvider } from "react-router"
import { SignUp } from "./components/SignUp/SignUp"
import { Login } from "./components/Login/Login"
import { Home } from "./components/Home/Home"
import { App } from "./App"
import ErrorPage from "./components/Error/Error"
import { NewPost } from "./components/NewPost/NewPost"
import { Post } from "./components/Post/Post"
import { EditPost } from "./components/EditPost/EditPost"

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
      {
        element: <NewPost />,
        path: "/newpost",
      },
      {
        element: <Post />,
        path: "posts/:postId",
      },
      {
        path: "posts/:postId/edit",
        element: <EditPost />,
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
