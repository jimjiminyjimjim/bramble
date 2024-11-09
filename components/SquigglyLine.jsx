const SquigglyLine = () => {
  return (
    <svg
      width="100%"
      height="100vh"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: -1,
      }}
    >
      <path
        d="M50,0 C40,20 60,40 50,60 C40,80 60,100 50,120 C40,140 60,160 50,180 C40,200 60,220 50,240 C40,260 60,280 50,300 C40,320 60,340 50,360 C40,380 60,400 50,420 C40,440 60,460 50,480 C40,500 60,520 50,540 C40,560 60,580 50,600 C40,620 60,640 50,660 C40,680 60,700 50,720 C40,740 60,760 50,780 C40,800 60,820 50,840 C40,860 60,880 50,900 C40,920 60,940 50,960 C40,980 60,1000 50,1020"
        stroke="black"
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default SquigglyLine;
