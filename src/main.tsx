import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout.tsx";
import HomePage from "./pages/home-page.tsx";
import AddPage from "./pages/add-page.tsx";
import ErrorPage from "./pages/error-page.tsx";
import SearchPage from "./pages/search-page.tsx";
import SettingsPage from "./pages/settings-page.tsx";
import ItemPage from "./pages/item-page.tsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

export const routes = {
  home: "/",
  addPage: "/add",
  item: "/item/:id",
  settings: "/settings",
  search: "/search",
  any: "*",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={routes.item} element={<ItemPage />} />
          <Route path={routes.settings} element={<SettingsPage />} />
          <Route path={routes.addPage} element={<AddPage />} />
          <Route path={routes.search} element={<SearchPage />} />
          <Route path={routes.any} element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </NextUIProvider>
);
