interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  flip?: boolean;
}

export function WaveDivider({
  topColor,
  bottomColor,
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className="relative w-full leading-0"
      style={{
        backgroundColor: topColor,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: "clamp(60px, 8vw, 120px)" }}
      >
        <path
          d="M0,0 C180,100 360,20 540,60 C720,100 900,30 1080,70 C1200,95 1320,40 1440,0 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
