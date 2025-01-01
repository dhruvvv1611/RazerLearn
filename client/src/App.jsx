import "./App.css";
import { Login } from "./pages/Login";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLeaning from "./pages/student/MyLeaning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/CourseTable";
import AddCourse from "./pages/admin/AddCourse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login", // No leading slash needed
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLeaning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard", // No leading slash
            element: <Dashboard />,
          },
          {
            path: "course", // No leading slash
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          }
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
