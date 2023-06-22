import {
  HomeIcon,
  UserCircleIcon,
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Teachers, Students } from "@/pages/dashboard";
import ClassManagement from "./pages/dashboard/create-class";
import Attendance from "./pages/dashboard/attendance";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        roles: ["admin", "user"], // Route accessible to both admin and user
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "class management",
        path: "/class-management",
        element: <ClassManagement />,
        roles: ["admin"], // Route accessible only to admin
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "teacher management",
        path: "/teacher-management",
        element: <Teachers />,
        roles: ["admin"], // Route accessible only to admin
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "student management",
        path: "/student-management",
        element: <Students />,
        roles: ["admin", "user"], // Route accessible to both admin and user
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "Attendance",
        path: "/attendance",
        element: <Attendance />,
        roles: ["user", "admin"], // Route accessible to both admin and user
      },
    ],
  },
];

export default routes;
