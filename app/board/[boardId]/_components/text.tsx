import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { TextLayer } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(
    fontSizeBasedOnHeight, 
    fontSizeBasedOnWidth, 
    maxFontSize
  );
}

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Text = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: TextProps) => {
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
    <text
      x={x+width/2}
      y={y+height/2}
      textAnchor={"middle"}
      alignmentBaseline={"middle"}
      className={cn(
        "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
      )}
      style={{
        fontFamily:"monospace",
        fontSize: calculateFontSize(width, height),
        fill: fill ? colorToCss(fill) : "#000",
      }}
    >
      {value!.replace(/&nbsp;/g, '')}
    </text>

    <foreignObject
      xmlns={"http://www.w3.org/1999/xhtml"}
      x={x}
      y={y}
      onPointerDown={(e) => onPointerDown(e, id)}
      width={width}
      height={height}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none"
      }}
    >
      <ContentEditable
        html={value || ""}
        onChange={handleContentChange}
        className={"h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none"}
        style={{
          fontSize: calculateFontSize(width, height),
          color: "transparent",
        }}
      />
    </foreignObject>
    </>
  );
};