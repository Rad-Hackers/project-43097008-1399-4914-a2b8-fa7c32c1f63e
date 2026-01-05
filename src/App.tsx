import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Keywords from "./pages/Keywords";
import Blacklist from "./pages/Blacklist";
import Settings from "./pages/Settings";
import Groups from "./pages/Groups";
import Export from "./pages/Export";
import Guide from "./pages/Guide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/keywords" element={<Keywords />} />
          <Route path="/blacklist" element={<Blacklist />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/export" element={<Export />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
