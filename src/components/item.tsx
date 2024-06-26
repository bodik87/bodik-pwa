import { ItemProps } from "../lib/types";
import { Link } from "react-router-dom";

type Props = { item: ItemProps };

export default function Item({ item }: Props) {
  return (
    <Link
      to={`/item/${item.id}`}
      className="flex justify-between max-h-[200px] h-fit rounded-md border shadow-lg bg-white z-40"
    >
      <div className="p-3 pt-2">
        <p>{item.title ? item.title : item.body}</p>
        <small>{item.body.slice(0, 100)}</small>
        <div className="mt-2 text-xs text-gray-400">{item.folder}</div>
      </div>
    </Link>
  );
}
