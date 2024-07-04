// import InputModal from "../InputModal/InputModal";
// import LinearButton from "../LinearButton/LinearButton";

import LinearButton from "../Button/LinearButton";

//border-green
//border-blue
//border-yellow
//shadow-green
//shadow-blue
//shadow-yellow
//from-greenF to-greenT
//from-blueF to-blueT
//from-redF to-redT
interface IViewCard {
  title: string;
  content: string;
  color: "green" | "blue" | "red";
  onClick?: () => void;
  data?: any;
  className?: string;
}

export default function ViewCard({
  title,
  content,
  color,
  onClick,
  className,
}: IViewCard) {
  return (
    <div
      className={`h-full bg-gradient-to-r from-${color}F to-${color}T pb-[2px] transition-all ${className}`}
    >
      <div className="flex h-full w-full flex-col gap-14 bg-[#1E1E1E] p-5 shadow-greenLi xl:p-10">
        <div
          className={`bg-gradient-to-r from-${color}F to-${color}T bg-clip-text text-3xl font-bold text-transparent`}
        >
          {title}
        </div>

        <div className="flex-1 whitespace-pre-wrap">{content}</div>
        {onClick && (
          <LinearButton color={color} onClick={onClick}>
            detail
          </LinearButton>
        )}
      </div>
      {/* <InputModal isOpen={isOpen} onClose={onClose} data={data} /> */}
    </div>
  );
}
