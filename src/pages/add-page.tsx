import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemProps } from "../lib/types";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function AddPage() {
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [folder, setFolder] = useState("");
  const [checked, setChacked] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectionChange = (id: any) => {
    setFolder(id);
  };

  const onInputChange = (value: string) => {
    setFolder(value);
  };

  const newItem = { id: uuidv4(), title, body, folder, pinned: checked };

  function createLocalItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (localItems.length === 0) {
      setLocalItems([newItem]);
    } else {
      setLocalItems([...localItems, newItem]);
    }
    navigate("/");
    setTitle("");
    setBody("");
    setFolder("");
    setChacked(false);
  }

  const uniqueFolders = [...new Set(localItems.filter((item) => item.folder))];

  return (
    <section className="px-4">
      <form className="mt-4" onSubmit={(e) => createLocalItem(e)}>
        <input
          type="text"
          value={title}
          spellCheck="false"
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none w-full text-xl bg-transparent"
          placeholder="Title"
        />
        <textarea
          value={body}
          spellCheck="false"
          autoFocus
          rows={8}
          onChange={(e) => setBody(e.target.value)}
          className="mt-4 p-3 rounded-lg bg-white shadow-lg outline-none w-full bg-transparent scroll_textarea resize-none"
          placeholder="Enter text..."
        />

        <Autocomplete
          allowsCustomValue
          label="Folder"
          variant="faded"
          className="mt-4 flex max-w-52"
          description="Add new folrer or select existed"
          defaultItems={uniqueFolders}
          onSelectionChange={onSelectionChange}
          onInputChange={onInputChange}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.folder}</AutocompleteItem>
          )}
        </Autocomplete>

        <Checkbox
          checked={checked}
          onChange={(e) => setChacked(e.target.checked)}
          radius="full"
          className="mt-2"
          size="lg"
        >
          Pinned
        </Checkbox>

        <Button
          type="submit"
          isDisabled={!body}
          size="lg"
          radius="sm"
          fullWidth={true}
          color="primary"
          className="mt-4"
        >
          Save
        </Button>
      </form>
    </section>
  );
}
