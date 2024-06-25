import { Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <header className="px-4 pb-4">
      {location.pathname !== "/search" && (
        <>
          <div className="flex items-center justify-between">
            <p>LOGO</p>
            <Link to={"/search"} className="w-full flex justify-end">
              <Search />
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
