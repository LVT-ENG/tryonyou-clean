import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import TryOnInteractive from "./components/TryOnInteractive";

const PILOT_CONFIG = {
  id: "lafayette",
  displayName: "Lafayette",
  defaultTheme: "light" as const,
};
const PILOT_ROUTE_PATH = `/${PILOT_CONFIG.id}`;

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={TryOnInteractive} />
      <Route path={PILOT_ROUTE_PATH} component={TryOnInteractive} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  useEffect(() => {
    document.title = `TryOnYou | Piloto ${PILOT_CONFIG.displayName}`;
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme={PILOT_CONFIG.defaultTheme}
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
