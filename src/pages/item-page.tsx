import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import { useState } from "react";

export default function ItemPage() {
  const { id } = useParams();
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);
  const [folderList, setFolderList] = useState(false);

  const item = localItems.filter((el) => el.id === id)[0];

  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [folder, setFolder] = useState(item.folder);
  const [checked, setChacked] = useState(item.pinned);
  const navigate = useNavigate();

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

  const uniqueFolders = [
    ...new Set(localItems.map((item) => item.folder as string)),
  ].filter((item) => item as string);

  const filteredFolders =
    folder === ""
      ? uniqueFolders
      : uniqueFolders.filter((el) =>
          el
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(folder!.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <section className="px-4">
        <form
          className="mt-4"
          onSubmit={(e) => {
            updateItem(e);
          }}
        >
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
          <div className="relative">
            <input
              type="text"
              value={folder}
              spellCheck="false"
              onChange={(e) => setFolder(e.target.value)}
              className="mt-4 outline-none w-full bg-transparent"
              placeholder="Enter folder..."
              onClick={() => setFolderList(true)}
            />

            <div className="absolute left-0 -bottom-2 translate-y-full bg-white shadow-lg max-w-[200px] w-full rounded-md">
              {folderList && (
                <>
                  {filteredFolders.map((folder) => (
                    <button
                      type="button"
                      key={folder}
                      onClick={() => {
                        setFolder(folder);
                        setFolderList(false);
                      }}
                      className="flex w-full py-1 px-2"
                    >
                      {folder}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
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
            disabled={!body}
            className={`mt-4 w-full px-3 py-2 rounded bg-orange-600 disabled:bg-gray-400 text-white flex items-center justify-center gap-2`}
          >
            Save
          </button>
        </form>

        <button
          type="button"
          onClick={() => deleteItem(item.id)}
          className={`mt-4 w-full px-3 py-2 rounded bg-red-600 disabled:bg-gray-400 text-white flex items-center justify-center gap-2`}
        >
          Delete
        </button>
      </section>
    </>
  );
}
