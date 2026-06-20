import React, { useCallback, useRef } from "react";
import { useKeyboard, useRenderer, useSelectionHandler } from "@opentui/react";
import { ClipboardContext } from "./context";

export function ClipboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clipboardRef = useRef<string>("");
  const renderer = useRenderer();

  const copy = useCallback(
    (text: string) => {
      clipboardRef.current = text;
      renderer.copyToClipboardOSC52(text);
    },
    [renderer],
  );

  const paste = useCallback(() => {
    return clipboardRef.current;
  }, []);

  // When user selects text via mouse drag, store the selection
  useSelectionHandler((selection) => {
    const text = selection.getSelectedText();
    if (text && text.length > 0) {
      clipboardRef.current = text;
    }
  });

  // Ctrl+C: copy the currently selected text
  useKeyboard((key) => {
    if (!key.ctrl || key.name !== "c") return;

    const currentSelection = renderer.getSelection();
    if (!currentSelection) return;

    const selectedText = currentSelection.getSelectedText();
    if (!selectedText || selectedText.length === 0) return;

    key.preventDefault();
    copy(selectedText);
    renderer.clearSelection();
  });

  return (
    <ClipboardContext.Provider value={{ copy, paste }}>
      {children}
    </ClipboardContext.Provider>
  );
}
