import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemProps } from "../lib/types";

type Props = {
  localItems: ItemProps[];
  setLocalItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
};

export default function AddItem({ localItems, setLocalItems }: Props) {
  const [name, setName] = useState("");

  const newItem = { id: uuidv4(), name };

  function createLocalItem() {
    if (localItems.length === 0) {
      setLocalItems([newItem]);
    } else {
      setLocalItems([...localItems, newItem]);
    }
  }

  return (
    <form className="wrapper px-4" onSubmit={createLocalItem}>
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
  );
}
