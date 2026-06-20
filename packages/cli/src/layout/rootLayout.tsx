import { Outlet } from "react-router";
import {
  ClipboardProvider,
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
          <ClipboardProvider>
            <DialogProvider>
              <PromptConfigProvider>
                <ThemedRoot>
                  <Outlet />
                </ThemedRoot>
              </PromptConfigProvider>
            </DialogProvider>
          </ClipboardProvider>
        </KeyboardLayerProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
