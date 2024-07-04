import img from "../assets/image2.jpeg";
import ViewCard from "../components/Card/ViewCard";
export default function Agent() {
  const handleImageClick = () => {
    window.open("http://140.113.87.82:5003", "_blank");
  };

  return (
    <div className="flex h-[100vh] w-full flex-col items-center gap-10 p-10">
      <h1 className="text-5xl">AI盤中即時監控</h1>
      <img
        src={img}
        alt="AI盤中即時監控"
        className="hover:shadow-3xl w-1/2 cursor-pointer rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:brightness-110 hover:grayscale-0"
        onClick={() => handleImageClick()}
      />
      <ViewCard title="新聞" color="red" content="" className="w-full" />
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <ViewCard title="樂觀" color="blue" content="" className="w-full" />
        <ViewCard title="中立" color="red" content="" className="w-full" />
        <ViewCard title="悲觀" color="green" content="" className="w-full" />
      </div>
    </div>
  );
}
