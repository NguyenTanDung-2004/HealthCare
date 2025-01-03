import React from "react";
import Header from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-stale-100 min-h-screen overflow-hidden">
      <Header />

      <div className="flex max-md:flex-col h-[calc(100vh-80px)]">
        <AdminSidebar className="sticky top-[80px]" />
        <main className="bg-[#F5F6FA] flex flex-col px-8 pt-8 w-full max-md:ml-0 max-md:w-full overflow-y-auto pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
