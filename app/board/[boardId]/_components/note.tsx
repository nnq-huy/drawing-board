import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { NoteLayer } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(
    fontSizeBasedOnHeight, 
    fontSizeBasedOnWidth, 
    maxFontSize
  );
}

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Note = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation((
    { storage },
    newValue: string,
  ) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <>
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
        fill: fill ? colorToCss(fill) : "#000",
        }}
      >
      </rect>
      <text
       x={x+width/2}
      y={y+height/2}
      textAnchor={"middle"}
      alignmentBaseline={"middle"}
        className={"h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none"}
        style={{
          fontFamily:"monospace",
          fontSize: calculateFontSize(width, height),
          fill: fill ? getContrastingTextColor(fill) : "#000",
        }}
      >
      {value!.replace(/&nbsp;/g, '')}
      </text>
    </g>
    <foreignObject
      xmlns={"http://www.w3.org/1999/xhtml"}
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || ""}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: "transparent",
        }}
      />
    </foreignObject>
    </>
    
  );
};