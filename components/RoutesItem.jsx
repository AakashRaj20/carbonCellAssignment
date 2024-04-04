"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  WalletMinimal,
  Hospital,
  Shapes,
  BellPlus,
  Settings,
  CircleHelp,
} from "lucide-react";

const RoutesItem = ({ show }) => {
  const pathname = usePathname();

  console.log(pathname);

  const routes = [
    {
      icon: <Home />,
      name: "Home",
      path: "/",
    },
    {
      icon: <Shapes />,
      name: "Assets",
      path: "/assets",
    },
    {
      icon: <Hospital />,
      name: "Organizations",
      path: "/organizations",
    },
    {
      icon: <WalletMinimal />,
      name: "Wallet",
      path: "/wallet",
    },
  ];
  const customerRoutes = [
    {
      icon: <BellPlus />,
      name: "Notifications",
      path: "/notifications",
    },
    {
      icon: <CircleHelp />,
      name: "Support",
      path: "/support",
    },
    {
      icon: <Settings />,
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className={`flex flex-col mt-10 ${show ? "gap-44" : "gap-56"}`}>
      <div className="flex flex-col gap-8">
        {routes.map((route, index) => (
          <Link key={index} href={route.path}>
            <div
              className={`flex items-center gap-3 cursor-pointer ${
                pathname === route.path
                  ? "text-green-400 font-bold text-2xl"
                  : "text-lg font-medium"
              }`}
            >
              {route.icon}
              <p>{route.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {customerRoutes.map((route, index) => (
          <Link key={index} href={route.path}>
            <div
              className={`flex items-center gap-3 cursor-pointer ${
                pathname === route.path
                  ? "font-bold text-green-400 text-2xl"
                  : "text-lg font-medium "
              }`}
            >
              {route.icon}
              <p>{route.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoutesItem;
