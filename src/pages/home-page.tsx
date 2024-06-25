import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import Item from "../components/item";
import Folders from "../components/folders";
import { useState } from "react";

export default function HomePage() {
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);

  const deleteItem = (id: string) => {
    const filteredValue = localItems.filter((item) => item.id !== id);
    setLocalItems(filteredValue);
  };

  const [activeFolder, setActiveFolder] = useState<string | undefined>(
    undefined
  );

  const uniqueFolders = [
    ...new Set(localItems.map((item) => item.folder)),
  ].filter((item) => item);

  const folders = ["All", ...uniqueFolders];

  const pinnedItems = localItems.filter((item) => item.pinned);
  const unPinnedItems = localItems.filter((item) => !item.pinned);

  const filteredItems = localItems.filter(
    (item) => item.folder === activeFolder
  );

  return (
    <>
      <>
        {uniqueFolders.length > 1 && (
          <Folders
            folders={folders}
            activeFolder={activeFolder}
            setActiveFolder={setActiveFolder}
          />
        )}
      </>

      <section className="px-4">
        {activeFolder === "All" || activeFolder === undefined ? (
          <>
            {pinnedItems.length > 0 && (
              <>
                <p className="text-gray-400">Pinned items</p>
                <div className="flex flex-col gap-2">
                  {pinnedItems.map((item) => (
                    <Item
                      key={item.id}
                      item={item}
                      deleteItem={deleteItem}
                      setActiveFolder={setActiveFolder}
                    />
                  ))}
                </div>
              </>
            )}

            {unPinnedItems.length > 0 && (
              <>
                <p className="mt-6 text-gray-400">Other items</p>
                <div className="flex flex-col gap-2">
                  {unPinnedItems.map((item) => (
                    <Item
                      key={item.id}
                      item={item}
                      deleteItem={deleteItem}
                      setActiveFolder={setActiveFolder}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {filteredItems.length > 0 && (
              <div className="flex flex-col gap-2">
                {filteredItems.map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    deleteItem={deleteItem}
                    setActiveFolder={setActiveFolder}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
