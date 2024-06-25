import { ItemProps } from "../lib/types";
import Item from "./item";

type Props = {
  localItems: ItemProps[];
  setLocalItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
};

export default function LocalItems({ localItems, setLocalItems }: Props) {
  const deleteLocalItem = (id: string) => {
    const filteredValue = localItems.filter((item) => item.id !== id);
    setLocalItems(filteredValue);
  };

  return (
    <>
      {localItems.length > 0 ? (
        <>
          {localItems.map((item) => (
            <Item key={item.id} item={item} deleteItem={deleteLocalItem} />
          ))}
        </>
      ) : (
        <p className="px-4 text-gray-400">No local items</p>
      )}
    </>
  );
}
