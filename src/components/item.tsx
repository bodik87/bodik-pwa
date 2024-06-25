import { Trash } from "lucide-react";
import { ItemProps } from "../lib/types";

type Props = {
  item: ItemProps;
  deleteItem: (id: string) => void;
};

export default function Item({ item, deleteItem }: Props) {
  return (
    <div key={item.id} className="w-full border-t last:border-b">
      <div className="wrapper py-2 px-4 flex items-center justify-between gap-2">
        <p>{item.name}</p>
        <button onClick={() => deleteItem(item.id)} className="text-red-600">
          <Trash />
        </button>
      </div>
    </div>
  );
}
