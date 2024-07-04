import { useNavigate } from "react-router-dom";
import ViewCard from "../components/Card/ViewCard";

function Home() {
  const navigate = useNavigate();
  const handleImageClick = (path: string) => {
    navigate(path);
  };
  return (
    <div className="flex h-[100vh] w-full flex-col items-center gap-10 p-10">
      <h1 className="text-5xl">LOGO</h1>
      <div className="grid w-full grid-cols-2 gap-10">
        <ViewCard
          title="AI盤前籌碼報告"
          content="Content"
          color="blue"
          onClick={() => handleImageClick("/report")}
        />
        <ViewCard
          title="AI盤中即時監控助理"
          content="Content"
          color="red"
          onClick={() => handleImageClick("/agent")}
        />
        <ViewCard title="AI語音智慧單" content="Content" color="green" />
        <ViewCard title="AI量化風控助理" content="Content" color="green" />
      </div>
    </div>
  );
}

export default Home;
