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
import MenuTitle from "./menu-title";
const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true, type: "link" },
  {
    type: "title",
    name: "Manage",
    menuItems: [
      {
        name: "Posts",
        href: "/posts",
        icon: NewspaperIcon,
        current: false,
      },
      {
        name: "Pages",
        href: "#",
        icon: DocumentTextIcon,
        current: false,
      },
      {
        name: "Media",
        href: "#",
        icon: PhotographIcon,
        current: false,
      },
      {
        name: "Comments",
        href: "#",
        icon: ChatAlt2Icon,
        current: false,
      },
      {
        name: "Writers",
        href: "#",
        icon: IdentificationIcon,
        current: false,
      },
      { name: "Tags", href: "#", icon: TagIcon, current: false },
    ],
  },
  {
    name: "Settings",
    type: "title",
    menuItems: [
      { name: "Templates", href: "#", icon: TemplateIcon, current: false },
      { name: "Users", href: "/users", icon: UserGroupIcon, current: false },
    ],
  },
];

const MenuItems = () => {
  <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
    <div className="pb-8 space-y-1">
      {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50" --> */}

      {navigation.map((item) =>
        item.type === "title" ? (
          <div className="mb-8 pb-4" key={item.name}>
            <MenuTitle name={item.name} >
            {item.menuItems?.map((subItem, idx) => (
              <Link href={subItem.href} key={subItem.name}>
                <a
                  className={classNames(
                    subItem.current
                      ? "bg-gray-100 text-gray-900 border-red"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent",
                    "group flex items-center px-5 py-3 text-sm font-medium border-r-4"
                  )}
                  aria-current="page"
                >
                  <subItem.icon
                    className={classNames(
                      subItem.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{subItem.name}</span>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <a
            key={item.name}
            href="#"
            className={classNames(
              item.current
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
  </nav>;
};
