import { Outlet } from "react-router";
import {
  ToastProvider,
  DialogProvider,
  KeyboardLayerProvider,
  ThemeProvider,
  PromptConfigProvider,
} from "../providers";
import { ThemedRoot } from "./themedRoot";

export function RootLayout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <KeyboardLayerProvider>
          <DialogProvider>
            <PromptConfigProvider>
              <ThemedRoot>
                <Outlet />
              </ThemedRoot>
            </PromptConfigProvider>
          </DialogProvider>
        </KeyboardLayerProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
