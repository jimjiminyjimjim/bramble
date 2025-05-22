import { cx } from "classix";

export const HeroImage = ({ image, title, subtitle, children, alignment }) => {
  return (
    <div
      className="hero min-h-0 h-[80vh] max-h-[1200px] relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="hero-overlay bg-opacity-30 h-full absolute z-0"></div>
      <div
        className={cx(
          `hero-content text-white my-[100px] flex`,
          alignment === "left" && "justify-start",
          alignment === "center" && "justify-center",
          alignment === "right" && "justify-end",
        )}
      >
        <div className="max-w-[60%] text-center">
          <h1 className="mb-5 text-5xl font-bold leading-[1]">{title}</h1>
          <h3 className="mb-5 text-2xl leading-[1]">{subtitle}</h3>
          <div className="text-center lg:text-left mt-[20px]">{children}</div>
        </div>
      </div>
    </div>
  );
};
