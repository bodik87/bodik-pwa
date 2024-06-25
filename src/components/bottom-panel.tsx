import { Home, Plus, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../main";

export default function BottomPanel() {
  const location = useLocation();
  const homePage = location.pathname === routes.home;
  const settingsPage = location.pathname === routes.settings;

  return (
    <footer className="fixed bottom-4 inset-x-4 max-w-md mx-auto h-14 border bg-white/25 backdrop-blur-xl rounded-full">
      <div className="flex justify-around items-center z-10">
        <Link
          to={routes.home}
          className={`h-14 w-full flex items-center justify-center active:scale-95 transition-all`}
        >
          <Home
            className={`${homePage ? "stroke-black" : "stroke-gray-600"}`}
          />
        </Link>

        <Link
          to={routes.addPage}
          className={`h-14 w-full flex items-center justify-center active:scale-95 transition-all`}
        >
          <Plus />
        </Link>

        <Link
          to={routes.settings}
          className={`h-14 w-full flex items-center justify-center active:scale-95 transition-all`}
        >
          <Settings
            className={`${settingsPage ? "stroke-black" : "stroke-gray-600"}`}
          />
        </Link>
      </div>
    </footer>
  );
}
