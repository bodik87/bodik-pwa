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
    ...new Set(localItems.map((item) => item.folder as string)),
  ].filter((item) => item as string);

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
                <div className="mt-1 grid grid-cols-2 gap-1.5">
                  <div className="flex flex-col gap-1.5">
                    {pinnedItems
                      .filter((_, index) => {
                        return index % 2 === 0;
                      })
                      .map((item) => (
                        <Item key={item.id} item={item} />
                      ))}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {pinnedItems
                      .filter((_, index) => {
                        return index % 2 !== 0;
                      })
                      .map((item) => (
                        <Item key={item.id} item={item} />
                      ))}
                  </div>
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
                <div className="mt-1 grid grid-cols-2 gap-1.5">
                  <div className="flex flex-col gap-1.5">
                    {localItems
                      .filter((item) => !item.pinned)
                      .filter((_, index) => {
                        return index % 2 === 0;
                      })
                      .map((item) => (
                        <Item key={item.id} item={item} />
                      ))}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {localItems
                      .filter((item) => !item.pinned)
                      .filter((_, index) => {
                        return index % 2 !== 0;
                      })
                      .map((item) => (
                        <Item key={item.id} item={item} />
                      ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {localItems.filter((item) => item.folder === activeFolder).length >
              0 && (
              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex flex-col gap-1.5">
                  {localItems
                    .filter((item) => item.folder === activeFolder)
                    .filter((_, index) => {
                      return index % 2 === 0;
                    })
                    .map((item) => (
                      <Item key={item.id} item={item} />
                    ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  {localItems
                    .filter((item) => item.folder === activeFolder)
                    .filter((_, index) => {
                      return index % 2 !== 0;
                    })
                    .map((item) => (
                      <Item key={item.id} item={item} />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
