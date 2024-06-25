import { CloudOff } from "lucide-react";
import useCheckConnection from "../lib/useCheckConnection";

export default function SettingsPage() {
  const isOnline = useCheckConnection();
  return (
    <section className="px-4">
      <h2>Settings Page</h2>

      {isOnline && (
        <>
          <p className="mt-4 flex items-center gap-2 -mb-1.5">
            <CloudOff className="stroke-red-600" />
            No internet connection!
          </p>
          <small className="text-gray-400">Save items locally</small>
        </>
      )}

      <button
        type="submit"
        disabled={!isOnline}
        className={`mt-4 w-full px-3 py-2 rounded bg-orange-600 disabled:bg-gray-400 text-white`}
      >
        Upload to database
      </button>
    </section>
  );
}
