"use client";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useEffect, useState } from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import { TypedLiveblocksProvider, useRoom, useSelf } from "@/liveblocks.config";
import { EditorToolbar } from "./editor-toolbar";

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function Editor() {
  const room = useRoom();
  const [element, setElement] = useState<HTMLElement>();
  const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();

  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  // Set up Liveblocks Yjs provider and attach CodeMirror editor
  useEffect(() => {
    let provider: TypedLiveblocksProvider;
    let ydoc: Y.Doc;
    let view: EditorView;

    if (!element || !room || !userInfo) {
      return;
    }

    // Create Yjs provider and document
    ydoc = new Y.Doc();
    provider = new LiveblocksProvider(room as any, ydoc);
    const ytext = ydoc.getText("codemirror");
    const undoManager = new Y.UndoManager(ytext);
    setYUndoManager(undoManager);

    // Attach user info to Yjs
    provider.awareness.setLocalStateField("user", {
      name: userInfo.name,
    });

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        javascript(),
        yCollab(ytext, provider.awareness, { undoManager }),
      ],
    });

    // Attach CodeMirror to element
    view = new EditorView({
      state,
      parent: element,
    });

    return () => {
      ydoc?.destroy();
      provider?.destroy();
      view?.destroy();
    };
  }, [element, room, userInfo]);

  return (
    <div className={"w-[40vw] h-[95vh] absolute right-4 top-4 rounded-md bg-neutral-100 flex flex-col"}>
        <div className="flex flex-col">
          {yUndoManager ? <EditorToolbar yUndoManager={yUndoManager} /> : null}
        </div>
      <div className={"bg-white overflow-scroll"} ref={ref}></div>
    </div>
  );
}
