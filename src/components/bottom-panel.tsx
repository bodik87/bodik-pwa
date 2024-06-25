import { Home, Plus, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../main";

export default function BottomPanel() {
  const location = useLocation();
  const homePage = location.pathname === routes.home;
  const settingsPage = location.pathname === routes.settings;

  return (
    <footer className="fixed bottom-0 inset-x-0 max-w-md mx-auto h-14 border-t sm:border-none bg-white/25 backdrop-blur-xl">
      <div className="flex justify-around items-center z-10">
        <Link to={routes.home} className={`bottom_btn`}>
          <Home
            className={`${homePage ? "stroke-black" : "stroke-gray-600"}`}
          />
        </Link>

        <Link to={routes.addPage} className={`bottom_btn`}>
          <Plus />
        </Link>

        <Link to={routes.settings} className={`bottom_btn`}>
          <Settings
            className={`${settingsPage ? "stroke-black" : "stroke-gray-600"}`}
          />
        </Link>
      </div>
    </footer>
  );
}
