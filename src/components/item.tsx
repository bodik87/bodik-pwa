import { Trash } from "lucide-react";
import { ItemProps } from "../lib/types";

type Props = {
  item: ItemProps;
  deleteItem: (id: string) => void;
};

export default function Item({ item, deleteItem }: Props) {
  const handleDeleteAllItems = (id: string) => {
    if (confirm("Do you really want to delete item?") == true) {
      deleteItem(id);
    }
  };

  return (
    <div key={item.id} className="w-full">
      <div className="wrapper py-2 px-4 flex items-center justify-between gap-2">
        <p>{item.name}</p>
        <button
          onClick={() => handleDeleteAllItems(item.id)}
          className="text-red-600"
        >
          <Trash />
        </button>
      </div>
    </div>
  );
}
