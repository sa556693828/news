import { useNavigate } from "react-router-dom";
import ViewCard from "../components/Card/ViewCard";

function Home() {
  const navigate = useNavigate();
  const handleImageClick = (path: string) => {
    navigate(path);
  };
  return (
    <div className="flex h-[100vh] w-full flex-col items-center gap-10 p-10">
      <img src="./logoWhite.png" className="w-full lg:size-[200px]" />
      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
        <ViewCard
          title="AI盤前籌碼報告"
          color="blue"
          onClick={() => handleImageClick("/report")}
        />
        <ViewCard
          title="AI盤中即時監控助理"
          color="red"
          onClick={() => handleImageClick("/agent")}
        />
        <ViewCard title="AI語音智慧單" color="green" />
        <ViewCard title="AI量化風控助理" color="green" />
      </div>
    </div>
  );
}

export default Home;
