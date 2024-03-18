import { LineLayer } from "@/types/canvas";

interface LineProps {
  id: string;
  layer: LineLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  stroke?: string;
};

export const Line = ({
  id,
  layer,
  onPointerDown,
  stroke,
}: LineProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <line
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x1={0}
      y1={0}
      x2={width}
      y2={height}
      strokeWidth={5}
      stroke={stroke?? "red"}
    />
  );
};