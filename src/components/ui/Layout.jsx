import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "motion/react";
import { SidebarOpen } from "lucide-react";
import { AppContext } from "../../context/AppProvider";

export default function Layout() {
  const { sideBarOpen } = useContext(AppContext);
  return (
    <main className="w-full h-dvh bg-[var(--primary)]">
      <Header />

      <div className="max-h-full flex h-3/4 mt-5 mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: sideBarOpen ? 256 : 64 }}
          className=" ps-2 w-min text-[var(--lightbg)]"
        >
          <Sidebar />
        </motion.div>
        <section className="ms-5 p-5 bg-[var(--surface)] w-full h-auto rounded-2xl overflow-y-scroll">
          <Outlet />
        </section>
      </div>
      <Footer />
    </main>
  );
}
