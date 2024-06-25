import useCheckConnection from "../lib/useCheckConnection";
import { CloudOff } from "lucide-react";

export default function Header() {
  const isOnline = useCheckConnection();
  return (
    <header>
      {!isOnline && (
        <div className="wrapper p-4">
          <p className="flex items-center gap-2 -mb-1.5">
            <CloudOff className="stroke-red-600" />
            No internet connection!
          </p>
          <small className="text-gray-400">Save items locally</small>
        </div>
      )}
    </header>
  );
}
