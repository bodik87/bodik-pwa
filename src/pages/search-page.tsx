import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import Item from "../components/item";

export default function SearchPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);

  const [query, setQury] = useState("");

  const deleteItem = (id: string) => {
    const filteredValue = localItems.filter((item) => item.id !== id);
    setLocalItems(filteredValue);
  };

  const filteredItems =
    query === ""
      ? localItems
      : localItems.filter(
          (item: ItemProps) =>
            item.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          // ||
          // element?.info
          //   ?.toLowerCase()
          //   .replace(/\s+/g, "")
          //   .includes(text.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <section>
      <div className="px-4 w-full flex items-center gap-4 mb-4">
        <button onClick={goBack}>
          <ArrowLeft />
        </button>
        <input
          type="search"
          autoFocus
          value={query}
          spellCheck="false"
          onChange={(e) => setQury(e.target.value)}
          className="w-full outline-none bg-gray-200 rounded-full px-4 py-1.5"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-col">
        {filteredItems.map((item) => (
          <Item key={item.id} item={item} deleteItem={deleteItem} />
        ))}
      </div>
    </section>
  );
}
