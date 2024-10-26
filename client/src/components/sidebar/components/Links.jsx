/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName,layout) => {
  
    return location.pathname==  `/${layout}/${routeName}` ||location.pathname ==routeName
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "admin" ||
        route.layout === "/auth"
      ) {
        return (
          <Link key={index} to={`${route.path}`}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route?.path,route?.layout) === true
                      ? "font-bold text-[#EF233C]"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route?.path,route?.layout) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route?.path,route?.layout) ? (
                <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-[#EF233C] dark:bg-[#EF233C]" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
