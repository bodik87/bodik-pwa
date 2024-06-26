import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Trash } from "lucide-react";
import { ItemProps } from "../lib/types";

type Props = {
  item: ItemProps;
  deleteItem: (id: string) => void;
  setActiveFolder?: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function Item({ item, deleteItem, setActiveFolder }: Props) {
  const handleDeleteItems = (id: string) => {
    if (confirm("Do you really want to delete item?") == true) {
      deleteItem(id);
      if (setActiveFolder !== undefined) {
        setActiveFolder(undefined);
      }
    }
  };

  const [scope, animate] = useAnimate();

  const x = useMotionValue(0);
  const controls = useDragControls();

  const handleOpen = async () => {
    const xStart = typeof x.get() === "number" ? x.get() : 0;
    animate("#drawer", { x: [xStart, -50] });
  };

  const handleClose = async () => {
    const xStart = typeof x.get() === "number" ? x.get() : 0;
    animate("#drawer", { x: [xStart, 0] });
  };
  const xInput = [-50, 0, 50];

  const background = useTransform(x, xInput, ["#EFF0F2", "#F5F5F5", "#FAFAFA"]);
  // const radius = useTransform(x, xInput, ["8px", "0px", "8px"]);

  return (
    <div ref={scope} className="relative">
      <motion.div
        id="drawer"
        drag="x"
        style={{ x }}
        dragControls={controls}
        dragConstraints={{ right: 0, left: -50 }}
        dragElastic={{ left: 0.05, right: 0.05 }}
        onDragEnd={() => {
          if (x.get() <= -50) {
            handleOpen();
          } else {
            handleClose();
          }
        }}
        className="absolute top-0 w-full h-[65px] flex items-center justify-between gap-2 cursor-grab active:cursor-grabbing rounded border touch-none shadow-lg bg-white z-40"
      >
        <div className="pl-4">
          <p>{item.name}</p>
          <div className="text-xs text-gray-400">{item.folder}</div>
        </div>
      </motion.div>

      <motion.div
        style={{ background }}
        className="w-full flex justify-end items-center rounded"
      >
        <button
          onClick={() => handleDeleteItems(item.id)}
          className="text-red-400 flex justify-center items-center w-[50px] h-[65px]"
        >
          <Trash size={22} />
        </button>
      </motion.div>
    </div>
  );
}
