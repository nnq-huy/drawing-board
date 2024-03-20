import * as Y from "yjs";
import { ToolButton } from "../tool-button";
import {  Copy, CopyPlus, Redo2, Undo2 } from "lucide-react";

type Props = {
  yUndoManager: Y.UndoManager;
};

export function EditorToolbar({ yUndoManager }: Props) {
  return (
    <div className="bg-white rounded-md px-1.5 h-12 flex items-center shadow-md text-black pb-2 font-semibold gap-4">
      Code Editor: JavaScript
      <ToolButton
        label="Undo"
        icon={Undo2}
        onClick={() => yUndoManager.undo()}
      />
      <ToolButton
        label="Redo"
        icon={Redo2}
        onClick={() => yUndoManager.redo()}
      />
      <ToolButton 
        label="Copy"
        icon={CopyPlus}
        onClick={()=>{}}
      />
    </div>
  );
}

