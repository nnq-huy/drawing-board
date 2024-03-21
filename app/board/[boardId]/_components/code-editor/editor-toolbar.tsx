import * as Y from "yjs";
import { toast } from "sonner";

import Image from "next/image";
import {  ClipboardCopy, Copy, CopyPlus, Redo2, Undo2 } from "lucide-react";
import { Language } from "@/types/canvas";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  yUndoManager: Y.UndoManager;
  lang:Language;
  action: (a:Language)=>void;
  codeContent:string;
};
//TODO: get text value from codemirror yjs state
const copyToClipboard = (text:string)=>{
  navigator.clipboard.writeText(text);
  toast.success("Code copied!");
};

export function EditorToolbar({ yUndoManager,lang,action, codeContent }: Props) {
  const LanguageSelector = () =>{
    return (
      <button className="px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
        <DropdownMenu>
          <DropdownMenuTrigger >
            {lang===0?"JavaScript" : "Golang"}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            side={"bottom"}
            sideOffset={5}
            className="w-60"
          >
          <DropdownMenuItem
            onClick={()=>{action(Language.javascript)}}
            className="p-3 cursor-pointer gap-2"
          >
            <Image
              src="/javascript.svg"
              alt="js logo"
              height={32}
              width={32}
            />
            JavaScript
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={()=>{action(Language.golang)}}
            className="p-3 cursor-pointer gap-2"
          >
            <Image
              src="/golang.svg"
              alt="golang logo"
              height={32}
              width={32}
            /> 
            Golang
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </button>
    )
  };
  return (
    <div className="bg-white rounded-md px-1.5 h-12 flex items-center shadow-md text-black pb-2 font-semibold gap-4">
      Code Editor
      <LanguageSelector />
      <button 
        onClick={() => yUndoManager.undo()} 
        className="px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
      >
        <Undo2/>
      </button>
      <button
        onClick={() => yUndoManager.redo()} 
        className="px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
      >
        <Redo2/>
      </button>
      <button 
        onClick={()=>copyToClipboard(codeContent)}
        className="px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
      >
        <ClipboardCopy/>
      </button>
    </div>
  );
}

