import { CloudOff } from "lucide-react";
import useCheckConnection from "../lib/useCheckConnection";

export default function SettingsPage() {
  const isOnline = useCheckConnection();
  return (
    <>
      <h2 className="wrapper px-4">Settings Page</h2>

      {!isOnline && (
        <div className="wrapper p-4">
          <p className="flex items-center gap-2 -mb-1.5">
            <CloudOff className="stroke-red-600" />
            No internet connection!
          </p>
          <small className="text-gray-400">Save items locally</small>
        </div>
      )}
    </>
  );
}
