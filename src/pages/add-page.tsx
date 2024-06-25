import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemProps } from "../lib/types";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

export default function AddPage() {
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const newItem = { id: uuidv4(), name };

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
    <>
      <form className="wrapper px-4" onSubmit={(e) => createLocalItem(e)}>
        <input
          type="text"
          value={name}
          autoFocus
          spellCheck="false"
          onChange={(e) => setName(e.target.value)}
          className="outline-none w-full text-xl"
          placeholder="Enter name..."
        />

        <button
          type="submit"
          disabled={!name}
          className={`mt-4 w-fit px-3 py-1 rounded bg-orange-600 text-white`}
        >
          Save
        </button>
      </form>
    </>
  );
}
