export default function LinearButton(props: {
  color: "green" | "blue" | "red";
  borderClass?: any;
  contentClass?: any;
  children: any;
  href?: string;
  onClick?: any;
}) {
  const { contentClass = "py-3", borderClass = "w-52", href, onClick } = props;
  const handleLinkClick = (event: any) => {
    event.preventDefault();
    window.open(href, "_blank");
  };

  return (
    <div
      className={`h-full bg-gradient-to-r from-${props?.color}F to-${props?.color}T p-[3px] transition-all ${borderClass}`}
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
