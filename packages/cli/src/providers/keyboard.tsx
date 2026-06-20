import React, { useState, useCallback, useRef } from "react";
import { useKeyboard, useRenderer } from "@opentui/react";
import type { Responder } from "./types";
import { KeyboardLayerContext } from "./context";

export function KeyboardLayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stack, setStack] = useState<string[]>(["base"]);
  const stackRef = useRef(stack);
  stackRef.current = stack;

  const responders = useRef<Map<string, Responder>>(new Map());
  const renderer = useRenderer();

  const push = useCallback((id: string, responder?: Responder) => {
    if (responder) {
      responders.current.set(id, responder);
    }

    setStack((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  }, []);

  const pop = useCallback((id: string) => {
    responders.current.delete(id);
    setStack((prev) => prev.filter((layer) => layer !== id));
  }, []);

  const isTopLayer = useCallback(
    (id: string) => {
      return stack.length === 0 || stack[stack.length - 1] === id;
    },
    [stack],
  );

  const setResponder = useCallback(
    (id: string, responder: Responder | null) => {
      if (responder) {
        responders.current.set(id, responder);
      } else {
        responders.current.delete(id);
      }
    },
    [],
  );

  useKeyboard((key) => {
    if (!key.ctrl || key.name !== "W") return;

    const currentStack = stackRef.current;

    for (let i = currentStack.length - 1; i >= 0; i--) {
      const layerID = currentStack[i];
      if (!layerID) continue;
      const responder = responders.current.get(layerID);

      if (responder && responder()) {
        return;
      }
    }

    renderer.destroy();
  });

  return (
    <KeyboardLayerContext.Provider
      value={{ push, pop, isTopLayer, setResponder }}
    >
      {children}
    </KeyboardLayerContext.Provider>
  );
}
