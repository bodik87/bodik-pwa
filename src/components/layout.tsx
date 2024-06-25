import { Outlet } from "react-router-dom";
import Header from "./header";
import BottomPanel from "./bottom-panel";

export default function Layout() {
  return (
    <main className="wrapper pt-3 pb-[55px] flex flex-col">
      <Header />
      <Outlet />
      <BottomPanel />
    </main>
  );
}
