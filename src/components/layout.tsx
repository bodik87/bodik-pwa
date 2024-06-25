import { Outlet } from "react-router-dom";
import BottomPanel from "./bottom-panel";

export default function Layout() {
  return (
    <main className="wrapper pt-4 pb-20 flex flex-col">
      <Outlet />
      <BottomPanel />
    </main>
  );
}
