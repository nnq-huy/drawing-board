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
      x1={x}
      y1={y}
      x2={width}
      y2={height}
      strokeWidth={5}
      stroke={stroke?? "red"}
    />
  );
};