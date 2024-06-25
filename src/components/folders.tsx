import { motion, useDragControls, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  activeFolder: string | undefined;
  setActiveFolder: React.Dispatch<React.SetStateAction<string | undefined>>;
  folders: (string | undefined)[];
};

export default function Folders({
  activeFolder,
  setActiveFolder,
  folders,
}: Props) {
  const x = useMotionValue(0);
  const controls = useDragControls();
  const divRef = useRef<HTMLDivElement>(null);

  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    if (divRef.current) {
      if (divRef.current.scrollWidth > divRef.current.clientWidth) {
        setParentWidth(
          divRef.current.scrollWidth - divRef.current.clientWidth + 8
        );
      } else {
        setParentWidth(divRef.current.scrollWidth - divRef.current.clientWidth);
      }
    }
  }, [divRef]);

  return (
    <>
      <div
        ref={divRef}
        className="pt-3 max-w-xl mx-auto w-full relative overflow-hidden"
      >
        <motion.div
          drag="x"
          style={{ x }}
          dragControls={controls}
          dragConstraints={{ right: 0, left: -parentWidth }}
          className="flex px-2 gap-2 cursor-grab items-center active:cursor-grabbing touch-none"
        >
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`${
                activeFolder === folder && activeFolder !== "All"
                  ? "bg-black text-white"
                  : "bg-neutral-200/80"
              }  rounded-md px-3 py-1.5 whitespace-nowrap`}
            >
              {folder}
            </button>
          ))}
        </motion.div>
      </div>
    </>
  );
}
