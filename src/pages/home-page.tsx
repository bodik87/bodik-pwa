import { useLocalStorage } from "usehooks-ts";
import { ItemProps } from "../lib/types";
import LocalItems from "../components/local-items";

export default function HomePage() {
  const [localItems, setLocalItems] = useLocalStorage<ItemProps[]>("items", []);

  return (
    <>
      <LocalItems localItems={localItems} setLocalItems={setLocalItems} />
    </>
  );
}
