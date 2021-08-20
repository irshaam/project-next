import { useAbility } from "@casl/react";
import {
  BellIcon,
  FireIcon,
  HomeIcon,
  MenuIcon,
  TrendingUpIcon,
  UserGroupIcon,
  XIcon,
  TemplateIcon,
  TagIcon,
  PhotographIcon,
  NewspaperIcon,
  IdentificationIcon,
  DocumentTextIcon,
  DatabaseIcon,
  ChatAlt2Icon,
  UsersIcon,
} from "@heroicons/react/outline";
import { classNames } from "@utils";
import Link from "next/link";
import { useRouter } from "next/router";

import { AbilityContext } from "../../auth/can";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true, type: "link" },
  {
    type: "title",
    name: "Manage",
    menuItems: [
      // {
      //   name: "Posts",
      //   href: "/posts?type=draft",
      //   icon: NewspaperIcon,
      // },
      // {
      //   name: "Pages",
      //   href: "#",
      //   icon: DocumentTextIcon,
      // },
      // {
      //   name: "Media",
      //   href: "/media",
      //   icon: PhotographIcon,
      // },
      // {
      //   name: "Comments",
      //   href: "#",
      //   icon: ChatAlt2Icon,
      // },
      // {
      //   name: "Writers",
      //   href: "#",
      //   icon: IdentificationIcon,
      // },
      // { name: "Tags", href: "/tags", icon: TagIcon },
    ],
  },
  {
    name: "Settings",
    type: "title",
    menuItems: [
      // { name: "Templates", href: "#", icon: TemplateIcon },
      { name: "Users", href: "/users", icon: UserGroupIcon },
    ],
  },
];
// const navigation = [];
export const SideMenu = () => {
  const router = useRouter();
  const ability = useAbility(AbilityContext);

  const isActive = (path: string): boolean => {
    // console.log(path.toLowerCase());
    const pathEquals = router.pathname.split("/")[1] === path.toLocaleLowerCase();
    return pathEquals;
    // console.log(pathEquals);
  };

  return (
    // <div className="hidden lg:block lg:col-span-3 xl:col-span-2  bg-white border-r border-gray-200 ">
    <div className="w-32 md:w-sidebar h-full bg-white border-r border-gray-200 ">
      <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
        <div className="pb-8 space-y-1">
          {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50" --> */}

          {navigation.map((item) =>
            item.type === "title" ? (
              <div className="mb-8 pb-4" key={item.name}>
                <h3
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="projects-headline"
                >
                  {item.name}
                </h3>
                {item.menuItems?.map((subItem, idx) =>
                  subItem.name === "Users" ? (
                    ability.can("create", "User") && (
                      <Link href={subItem.href} key={subItem.name}>
                        <a
                          className={classNames(
                            isActive(subItem.name)
                              ? " bg-gray-100 text-gray-900 border-red"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent",
                            "group flex items-center px-5 py-3 text-sm font-medium border-l-4"
                          )}
                          aria-current="page"
                        >
                          <subItem.icon
                            className={classNames(
                              isActive(subItem.name) ? "text-gray-900" : "text-gray-400 group-hover:text-gray-500",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{subItem.name}</span>
                        </a>
                      </Link>
                    )
                  ) : (
                    <Link href={subItem.href} key={subItem.name}>
                      <a
                        className={classNames(
                          isActive(subItem.name)
                            ? " bg-gray-100 text-gray-900 border-red"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent",
                          "group flex items-center px-5 py-3 text-sm font-medium border-l-4"
                        )}
                        aria-current="page"
                      >
                        <subItem.icon
                          className={classNames(
                            isActive(subItem.name) ? "text-gray-900" : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{subItem.name}</span>
                      </a>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <a
                key={item.name}
                href="#"
                className={classNames(
                  isActive(item.name)
                    ? "bg-gray-100 text-gray-900 border-red"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent",
                  "group flex items-center px-5 py-3 text-sm font-medium border-r-4 mb-4"
                )}
                aria-current="page"
              >
                {item.icon && (
                  <item.icon
                    className={classNames(
                      item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                )}
                <span className="truncate">{item.name}</span>
              </a>
            )
          )}
        </div>
      </nav>
    </div>
  );
};
