export default function LinearButton(props: {
  color: "green" | "blue" | "red";
  borderClass?: any;
  contentClass?: any;
  children: any;
  href?: string;
  onClick?: any;
}) {
  const { contentClass = "py-3", href, onClick } = props;
  const handleLinkClick = (event: any) => {
    event.preventDefault();
    window.open(href, "_blank");
  };

  return (
    <div
      className={`h-full w-full bg-gradient-to-r lg:w-52 from-${props?.color}F to-${props?.color}T p-[3px] transition-all`}
    >
      <button
        className={`flex h-full w-full items-center justify-center bg-bg text-base font-medium text-text ${contentClass}`}
        onClick={
          href
            ? (e) => handleLinkClick(e)
            : onClick
              ? () => onClick()
              : () => {}
        }
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      </button>
    </div>
  );
}
