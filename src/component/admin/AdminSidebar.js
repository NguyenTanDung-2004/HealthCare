import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavItem = ({ iconClass, label, href, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-5 items-center px-5 py-4 w-48 max-w-full min-h-[50px] cursor-pointer ${
        isActive
          ? "text-white bg-[#1445FE] rounded-lg"
          : "hover:bg-gray-100 transition-colors rounded-lg"
      }`}
    >
      <i
        className={`${iconClass} ${
          isActive ? "text-white" : "text-gray-500"
        } w-5 text-lg`}
      />
      <div className="self-stretch my-auto font-bold">{label}</div>
    </div>
  );
};

const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/home_out");
  };
  const navItems = [
    {
      iconClass: "fa fa-chart-bar",
      label: "Thống kê",
      href: "/dashboard/statistic",
    },
    {
      iconClass: "fa-solid fa-person-running",
      label: "Bài tập",
      href: "/dashboard/workout",
      activePaths: ["/dashboard/workout", "/dashboard/addWorkout"],
    },
    {
      iconClass: "fa fa-utensils",
      label: "Món ăn",
      href: "/dashboard/dish",
      activePaths: ["/dashboard/dish", "/dashboard/addFood"],
    },
    {
      iconClass: "fa-solid fa-list",
      label: "Thử thách",
      href: "/dashboard/challenges",
    },
    { iconClass: "fa fa-user", label: "Profile", href: "/dashboard/profile" },
  ];

  const handleNavigation = (href) => {
    navigate(href);
  };

  return (
    <aside
      className={` flex flex-col w-[250px] bg-white min-h-screen px-5 pt-5 ${className}`}
    >
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            iconClass={item.iconClass}
            label={item.label}
            href={item.href}
            isActive={
              item.activePaths
                ? item.activePaths.some((path) =>
                    location.pathname.startsWith(path)
                  )
                : location.pathname.startsWith(item.href)
            }
            onClick={() => handleNavigation(item.href)}
          />
        ))}
      </nav>

      <div className="mt-[220px]">
        <NavItem
          iconClass="fa-solid fa-arrow-right-from-bracket"
          label="Đăng xuất"
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
