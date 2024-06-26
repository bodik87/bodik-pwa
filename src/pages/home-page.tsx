import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import Item from "../components/item";
import Folders from "../components/folders";
import { useState } from "react";

export default function HomePage() {
  const [localItems] = useLocalStorage<ItemProps[]>("items", []);

  const [activeFolder, setActiveFolder] = useState<string | undefined>(
    undefined
  );

  const uniqueFolders = [
    ...new Set(localItems.map((item) => item.folder)),
  ].filter((item) => item);

  const folders = ["All", ...uniqueFolders];
  const pinnedItems = localItems.filter((item) => item.pinned);

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

      <section className="mt-3 px-2">
        {activeFolder === "All" || activeFolder === undefined ? (
          <>
            {pinnedItems.length > 0 && (
              <>
                <p className="pl-2.5 text-gray-400 text-sm">Pinned items</p>
                <div className="mt-1 flex flex-col gap-1.5">
                  {pinnedItems.map((item) => (
                    <Item key={item.id} item={item} />
                  ))}
                </div>
              </>
            )}

            {localItems.filter((item) => !item.pinned).length > 0 && (
              <>
                {pinnedItems.length > 0 && (
                  <p className="mt-3 pl-2.5 text-gray-400 text-sm">
                    Other items
                  </p>
                )}
                <div className="mt-1 flex flex-col gap-1.5">
                  {localItems
                    .filter((item) => !item.pinned)
                    .map((item) => (
                      <Item key={item.id} item={item} />
                    ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {localItems.filter((item) => item.folder === activeFolder).length >
              0 && (
              <div className="flex flex-col gap-1.5">
                {localItems
                  .filter((item) => item.folder === activeFolder)
                  .map((item) => (
                    <Item key={item.id} item={item} />
                  ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
