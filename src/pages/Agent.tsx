import img from "../assets/image2.jpeg";
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
    </div>
  );
}
