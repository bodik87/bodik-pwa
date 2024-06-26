import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";

export default function ItemPage() {
  const { id } = useParams();
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);

  const item = localItems.filter((el) => el.id === id)[0];

  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [folder, setFolder] = useState(item.folder);
  const [checked, setChacked] = useState(item.pinned);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectionChange = (id: any) => {
    setFolder(id);
  };

  const onInputChange = (value: string) => {
    setFolder(value);
  };

  const updatedItem = {
    id: id as string,
    title,
    body,
    folder,
    pinned: checked,
  };
  const updatedItems = localItems.map((el) => {
    if (el.id === id) {
      return updatedItem;
    } else {
      return el;
    }
  });

  function updateItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalItems(updatedItems);

    navigate("/");
    setTitle("");
    setBody("");
    setFolder("");
    setChacked(false);
  }

  const deleteItem = (id: string) => {
    if (confirm("Do you really want to delete item?") == true) {
      const filteredValue = localItems.filter((item) => item.id !== id);
      setLocalItems(filteredValue);
      navigate("/");
    }
  };

  const uniqueFolders = [...new Set(localItems.filter((item) => item.folder))];

  return (
    <>
      <section className="px-4">
        <form className="mt-4" onSubmit={(e) => updateItem(e)}>
          <input
            type="text"
            value={title}
            spellCheck="false"
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none w-full text-xl bg-transparent"
            placeholder="Title"
          />
          <Textarea
            variant="bordered"
            label="Note"
            value={body}
            spellCheck="false"
            autoFocus
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter text..."
            size="lg"
            className="mt-4 !scroll_textarea bg-white rounded-xl"
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

        <Button
          type="button"
          onClick={() => deleteItem(item.id)}
          radius="sm"
          fullWidth={true}
          color="danger"
          className="mt-4"
        >
          Delete
        </Button>
      </section>
    </>
  );
}
