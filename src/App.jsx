import HomePage from "./pages/HomePage/HomePage";
import ListPage from "./pages/listPage/listPage";
import ProfilePage from "./pages/profilePage/profilePage";
import ProfileUpdatePage from "./pages/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./pages/newPostPage/newPostPage";
import SinglePage from "./pages/singlePage/singlePage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuthLayout } from "./layout/layout";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // Children will represent as outlet which is used is Layout file
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuthLayout />,
      // Children will represent as outlet which is used in RequireAuthLayout file
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
