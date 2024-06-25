import { Outlet } from "react-router-dom";
import Header from "./header";
import BottomPanel from "./bottom-panel";

export default function Layout() {
  return (
    <main className="flex flex-col">
      <Header />
      <Outlet />
      <BottomPanel />
    </main>
  );
}
