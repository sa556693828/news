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

export default function ViewCard(props: {
  title: string;
  content: string;
  color: "green" | "blue" | "red";
  onClick?: () => void;
  data?: any;
}) {
  return (
    <div
      className={`h-full bg-gradient-to-r from-${props?.color}F to-${props?.color}T pb-[2px] transition-all`}
    >
      <div className="flex h-full w-full flex-col gap-14 bg-[#1E1E1E] p-5 shadow-greenLi xl:p-10">
        <div
          className={`bg-gradient-to-r from-${props?.color}F to-${props?.color}T bg-clip-text text-3xl font-bold text-transparent`}
        >
          {props.title}
        </div>

        <div className="flex-1 whitespace-pre-wrap">{props.content}</div>
        <div className="">
          <LinearButton color={props?.color} onClick={props.onClick}>
            detail
          </LinearButton>
        </div>
      </div>
      {/* <InputModal isOpen={isOpen} onClose={onClose} data={props?.data} /> */}
    </div>
  );
}
