import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { TextAttributes, RGBA } from "@opentui/core";
import { useKeyboard, useTerminalDimensions } from "@opentui/react";
import type { DialogConfig } from "./types";
import { useKeyboardLayer } from "../keyboardLayer";
import { useTheme } from "../theme";

export type DialogContextValue = {
  open: (config: DialogConfig) => void;
  close: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog(): DialogContextValue {
  const value = useContext(DialogContext);

  if (!value) {
    throw new Error("useDialog must be used within a Dialog Provider");
  }

  return value;
}

type DialogProviderProps = {
  children: ReactNode;
};

export function DialogProvider({ children }: DialogProviderProps) {
  const [currDialog, setCurrDialog] = useState<DialogConfig | null>(null);
  const { push, pop } = useKeyboardLayer();

  const close = useCallback(() => {
    setCurrDialog(null);
    pop("dialog");
  }, [pop]);

  const open = useCallback(
    (config: DialogConfig) => {
      setCurrDialog(config);
      push("dialog", () => {
        close();
        return true;
      });
    },
    [push, close],
  );

  const value: DialogContextValue = {
    open,
    close,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog currentDialog={currDialog} close={close} />
    </DialogContext.Provider>
  );
}

type DialogProps = {
  currentDialog: DialogConfig | null;
  close: () => void;
};

function Dialog({ currentDialog, close }: DialogProps) {
  const { isTopLayer } = useKeyboardLayer();
  const { width, height } = useTerminalDimensions();
  const { colors } = useTheme();

  useKeyboard((key) => {
    if (!currentDialog || !isTopLayer("dialog")) return;

    if (key.name === "escape") {
      close();
    }
  });

  if (!currentDialog) {
    return null;
  }

  const { title, children } = currentDialog;

  return (
    <box
      position="absolute"
      left={0}
      top={0}
      width={width}
      height={height}
      justifyContent="center"
      alignItems="center"
      backgroundColor={RGBA.fromInts(0, 0, 0, 150)}
      zIndex={100}
      onMouseDown={() => close()}
    >
      <box
        width={Math.min(60, width - 41)}
        height="auto"
        backgroundColor={colors.dialogSurface}
        paddingX={4}
        paddingY={1}
        flexDirection="column"
        gap={1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <box
          paddingBottom={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <text attributes={TextAttributes.BOLD}>{title}</text>
          <text attributes={TextAttributes.DIM} onMouseDown={() => close()}>
            X
          </text>
        </box>
        <box flexGrow={1}>{children}</box>
      </box>
    </box>
  );
}
