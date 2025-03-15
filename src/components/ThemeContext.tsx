// components/ThemeProvider.tsx
import { ThemeProvider } from "next-themes";

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
