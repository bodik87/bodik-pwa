import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemProps } from "../lib/types";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

export default function AddPage() {
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);
  const [folderList, setFolderList] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [folder, setFolder] = useState("");
  const [checked, setChacked] = useState(false);
  const navigate = useNavigate();

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
            .includes(folder.toLowerCase().replace(/\s+/g, ""))
        );

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
    </section>
  );
}
