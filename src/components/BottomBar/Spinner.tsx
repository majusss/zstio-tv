const Spinner: React.FC<{ progress: number }> = ({ progress }) => {
  const size = 70,
    trackWidth = 9,
    trackColor = `#ddd`,
    indicatorWidth = 13,
    indicatorColor = `#07c`;

  const center = size / 2,
    radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <svg className="animate-spin-slow transition-all" style={{ width: size, height: size }}>
      <circle
        className=""
        cx={center}
        cy={center}
        fill="transparent"
        r={radius}
        stroke={trackColor}
        strokeWidth={trackWidth}
      />
      <circle
        className=""
        style={{ animationDuration: "1s" }}
        cx={center}
        cy={center}
        fill="transparent"
        r={radius}
        stroke={indicatorColor}
        strokeWidth={indicatorWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap={"round"}
      />
    </svg>
  );
};

export default Spinner;
