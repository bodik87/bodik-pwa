import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import LocalItems from "../components/local-items";

export default function HomePage() {
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);

  return (
    <section className="px-4">
      <LocalItems localItems={localItems} setLocalItems={setLocalItems} />
    </section>
  );
}
