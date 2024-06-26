import { ItemProps } from "../lib/types";
import { Link } from "react-router-dom";

type Props = { item: ItemProps };

export default function Item({ item }: Props) {
  return (
    <Link
      to={`/item/${item.id}`}
      className="flex items-center justify-between h-[60px] gap-2 rounded-md border shadow-lg bg-white z-40"
    >
      <div className="pl-4">
        <p>{item.title ? item.title : item.body}</p>
        <div className="text-xs text-gray-400">{item.folder}</div>
      </div>
    </Link>
  );
}
