import { Outlet } from "react-router";
import {
  ToastProvider,
  DialogProvider,
  KeyboardLayerProvider,
  ThemeProvider,
} from "../providers";
import { ThemedRoot } from "./themedRoot";

export function RootLayout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <KeyboardLayerProvider>
          <DialogProvider>
            <ThemedRoot>
              <Outlet />
            </ThemedRoot>
          </DialogProvider>
        </KeyboardLayerProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
