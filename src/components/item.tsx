import { Trash } from "lucide-react";
import { ItemProps } from "../lib/types";

type Props = {
  item: ItemProps;
  deleteItem: (id: string) => void;
  setActiveFolder?: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function Item({ item, deleteItem, setActiveFolder }: Props) {
  const handleDeleteAllItems = (id: string) => {
    if (confirm("Do you really want to delete item?") == true) {
      deleteItem(id);
      if (setActiveFolder !== undefined) {
        setActiveFolder(undefined);
      }
    }
  };

  return (
    <div className="w-full py-2 flex items-center justify-between gap-2">
      <div>
        <p>{item.name}</p>
        <div className="text-xs text-gray-400">{item.folder}</div>
      </div>
      <button
        onClick={() => handleDeleteAllItems(item.id)}
        className="text-red-600"
      >
        <Trash />
      </button>
    </div>
  );
}
