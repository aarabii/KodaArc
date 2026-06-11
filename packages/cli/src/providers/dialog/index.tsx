import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { DialogConfig, DialogContextValue } from "../../types";
import { useKeyboardLayer } from "../../hooks/useKeyboardLayer";
import { DialogContext } from "./context";
import { Dialog } from "../../components/dialog";

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
