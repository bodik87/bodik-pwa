import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import Item from "../components/item";

export default function SearchPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [localItems] = useLocalStorage<ItemProps[]>("items", []);

  const [query, setQury] = useState("");

  const filteredItems =
    query === ""
      ? localItems
      : localItems.filter(
          (item: ItemProps) =>
            item.body
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
      <div className="pl-4 pr-2 w-full flex items-center gap-4 mb-4">
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

      <div className="px-2 flex flex-col">
        {filteredItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
