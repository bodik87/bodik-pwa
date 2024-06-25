import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section className="px-4">
      <div className="w-full flex items-center gap-4">
        <button onClick={goBack}>
          <ArrowLeft />
        </button>
        <input
          type="search"
          autoFocus
          spellCheck="false"
          className="w-full outline-none bg-gray-200 rounded-full px-4 py-1.5"
          placeholder="Search"
        />
      </div>
    </section>
  );
}
