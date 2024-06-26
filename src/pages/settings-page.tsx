import { CloudOff } from "lucide-react";
import useCheckConnection from "../lib/useCheckConnection";
import { useLocalStorage } from "usehooks-ts";
import { ItemProps, UserProps } from "../lib/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";

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
    <section className="mt-4 px-4">
      {localItems.length !== 0 && (
        <>
          {!userForm && (
            <Button
              type="submit"
              disabled={!isOnline || localItems.length === 0}
              onClick={handleUpload}
              size="lg"
              radius="sm"
              fullWidth={true}
              color="primary"
              className="mt-4"
            >
              {!isOnline ? (
                <>
                  <CloudOff />
                  No internet connection!
                </>
              ) : (
                <>Upload to database</>
              )}
            </Button>
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
              className="outline-none w-full text-xl bg-transparent"
              placeholder="Enter login..."
            />

            <input
              type="text"
              value={password}
              autoFocus
              spellCheck="false"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 outline-none w-full text-xl bg-transparent"
              placeholder="Enter password..."
            />

            <Button
              type="submit"
              isDisabled={!isOnline || !login || !password}
              size="lg"
              radius="sm"
              fullWidth={true}
              color="primary"
              className="mt-4"
            >
              {!isOnline ? (
                <>
                  <CloudOff />
                  No internet connection!
                </>
              ) : (
                <>Upload to database</>
              )}
            </Button>
          </form>
        </>
      )}

      {localItems.length !== 0 && (
        <Button
          type="button"
          onClick={handleDeleteAllItems}
          radius="sm"
          fullWidth={true}
          color="danger"
          className="mt-4"
        >
          Delete all items
        </Button>
      )}
    </section>
  );
}
