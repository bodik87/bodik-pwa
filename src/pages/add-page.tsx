import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemProps } from "../lib/types";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

export default function AddPage() {
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);
  const [name, setName] = useState("");
  const [folder, setFolder] = useState("");
  const [checked, setChacked] = useState(false);
  const navigate = useNavigate();

  const newItem = { id: uuidv4(), name, folder, pinned: checked };

  function createLocalItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (localItems.length === 0) {
      setLocalItems([newItem]);
    } else {
      setLocalItems([...localItems, newItem]);
    }
    navigate("/");
    setName("");
  }

  return (
    <section className="px-4">
      <form className="mt-4" onSubmit={(e) => createLocalItem(e)}>
        <input
          type="text"
          value={name}
          autoFocus
          spellCheck="false"
          onChange={(e) => setName(e.target.value)}
          className="outline-none w-full text-xl bg-transparent"
          placeholder="Enter title..."
        />
        <input
          type="text"
          value={folder}
          spellCheck="false"
          onChange={(e) => setFolder(e.target.value)}
          className="mt-4 outline-none w-full bg-transparent"
          placeholder="Enter folder..."
        />
        <div className="mt-4 flex items-center gap-3">
          <input
            id="pin"
            type="checkbox"
            checked={checked}
            onChange={(e) => setChacked(e.target.checked)}
            className="outline-none"
            placeholder="Enter folder..."
          />
          <label htmlFor="pin" className="w-full">
            Pinned
          </label>
        </div>

        <button
          type="submit"
          disabled={!name}
          className={`mt-4 w-full px-3 py-2 rounded bg-orange-600 text-white`}
        >
          Save
        </button>
      </form>
    </section>
  );
}
