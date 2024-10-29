export const HeroImage = ({ image, title, subtitle, children }) => {
  return (
    <div
      className="hero min-h-0 h-[80vh] max-h-[1200px] relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="hero-overlay bg-opacity-30 h-full absolute z-0"></div>
      <div className="hero-content text-white text-center my-[100px]">
        <div className="max-w-[80%]">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5">{subtitle}</p>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
