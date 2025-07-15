import "./Loader.css";
import { useLoader } from "../../contexts/LoaderContext/useLoader";

export default function Loader() {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
}
