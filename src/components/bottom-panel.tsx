import { Home, Plus, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../main";
import { Button } from "@nextui-org/button";

export default function BottomPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const homePage = location.pathname === routes.home;
  const settingsPage = location.pathname === routes.settings;

  return (
    <footer className="fixed bottom-0 inset-x-0 max-w-md mx-auto h-14 border-t bg-gradient-to-r from-neutral-100 via-white to-neutral-100 z-40">
      <div className="flex justify-around items-center z-10">
        <Button
          radius="none"
          fullWidth={true}
          variant="light"
          className="h-14 bottom-btn"
          onClick={() => navigate(routes.home)}
        >
          <Home
            className={`${homePage ? "stroke-black" : "stroke-gray-600"}`}
          />
        </Button>

        <Button
          radius="none"
          fullWidth={true}
          variant="light"
          className="h-14 bottom-btn"
          onClick={() => navigate(routes.addPage)}
        >
          <Plus
            className={`${settingsPage ? "stroke-black" : "stroke-gray-600"}`}
          />
        </Button>

        <Button
          radius="none"
          fullWidth={true}
          variant="light"
          className="h-14 bottom-btn"
          onClick={() => navigate(routes.settings)}
        >
          <Settings
            className={`${settingsPage ? "stroke-black" : "stroke-gray-600"}`}
          />
        </Button>
      </div>
    </footer>
  );
}
