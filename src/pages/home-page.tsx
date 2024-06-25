import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import Item from "../components/item";

export default function HomePage() {
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);

  const deleteItem = (id: string) => {
    const filteredValue = localItems.filter((item) => item.id !== id);
    setLocalItems(filteredValue);
  };

  const uniqueFolders = [
    ...new Set(localItems.map((item) => item.folder)),
  ].filter((item) => item);

  const pinnedItems = localItems.filter((item) => item.pinned);
  const unPinnedItems = localItems.filter((item) => !item.pinned);

  return (
    <section className="px-4">
      <>
        {uniqueFolders.length > 0 && (
          <>
            <p className="text-gray-400">Folders</p>
            <div className="flex gap-2">
              {uniqueFolders.map((folder) => (
                <div key={folder} className="border rounded-full px-3">
                  {folder}
                </div>
              ))}
            </div>
          </>
        )}
      </>

      <>
        {pinnedItems.length > 0 && (
          <>
            <p className="text-gray-400">Pinned items</p>
            <div className="flex gap-2">
              {pinnedItems.map((item) => (
                <Item key={item.id} item={item} deleteItem={deleteItem} />
              ))}
            </div>
          </>
        )}
      </>

      <>
        {unPinnedItems.length > 0 && (
          <>
            <p className="text-gray-400">Unpinned items</p>
            <div className="flex gap-2">
              {unPinnedItems.map((item) => (
                <Item key={item.id} item={item} deleteItem={deleteItem} />
              ))}
            </div>
          </>
        )}
      </>
    </section>
  );
}
