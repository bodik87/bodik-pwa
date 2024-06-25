import { CloudOff } from "lucide-react";
import useCheckConnection from "../lib/useCheckConnection";
import { useLocalStorage } from "usehooks-ts";
import { ItemProps, UserProps } from "../lib/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();
  const isOnline = useCheckConnection();

  const [user, setUser] = useLocalStorage<UserProps | null>("user", null);
  const [localItems] = useLocalStorage<ItemProps[]>("items", []);

  const [userForm, setUserForm] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleUpload = () => {
    if (user === null) {
      setUserForm(true);
    } else {
      console.log("Uploading...");
    }
  };

  const handleDeleteAllItems = () => {
    if (confirm("Do you really want to delete all items?") == true) {
      navigate("/");
      localStorage.removeItem("items");
    }
  };

  function createUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUser({ login, password });
    setUserForm(false);
    setPassword("");
    setLogin("");
  }

  return (
    <section className="px-4">
      <p className="text-gray-400">Settings</p>

      {localItems.length !== 0 && (
        <>
          {!userForm && (
            <button
              type="submit"
              disabled={!isOnline || localItems.length === 0}
              onClick={handleUpload}
              className={`mt-4 w-full px-3 py-2 rounded bg-orange-600 disabled:bg-gray-400 text-white flex items-center justify-center gap-2`}
            >
              {!isOnline ? (
                <>
                  <CloudOff />
                  No internet connection!
                </>
              ) : (
                <>Upload to database</>
              )}
            </button>
          )}
        </>
      )}

      {userForm && (
        <>
          <form onSubmit={(e) => createUser(e)}>
            <input
              type="text"
              value={login}
              autoFocus
              spellCheck="false"
              onChange={(e) => setLogin(e.target.value)}
              className="outline-none w-full text-xl"
              placeholder="Enter login..."
            />

            <input
              type="text"
              value={password}
              autoFocus
              spellCheck="false"
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none w-full text-xl"
              placeholder="Enter password..."
            />

            <button
              type="submit"
              disabled={!isOnline || !login || !password}
              className={`mt-4 w-full px-3 py-2 rounded bg-orange-600 disabled:bg-gray-400 text-white flex items-center justify-center gap-2`}
            >
              {!isOnline ? (
                <>
                  <CloudOff />
                  No internet connection!
                </>
              ) : (
                <>Upload to database</>
              )}
            </button>
          </form>
        </>
      )}

      {localItems.length !== 0 && (
        <button
          type="button"
          onClick={handleDeleteAllItems}
          className={`mt-20 w-fit px-3 py-2 rounded bg-red-600 disabled:bg-gray-400 text-white flex items-center justify-center gap-2`}
        >
          Delete all items
        </button>
      )}
    </section>
  );
}
