import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// App pages
import Trial from "./pages/app/Trial";
import Setup from "./pages/app/Setup";
import StoreSelect from "./pages/app/StoreSelect";
import Dashboard from "./pages/app/Dashboard";
import Insights from "./pages/app/Insights";
import Content from "./pages/app/Content";
import Publish from "./pages/app/Publish";
import Analytics from "./pages/app/Analytics";
import Settings from "./pages/app/Settings";
import { AppLayout } from "./components/app/AppLayout";

// Admin pages
import AdminHome from "./pages/admin/AdminHome";
import Stores from "./pages/admin/Stores";
import StoreDetail from "./pages/admin/StoreDetail";
import Billing from "./pages/admin/Billing";
import Usage from "./pages/admin/Usage";
import { AdminLayout } from "./components/admin/AdminLayout";
import { RequireAdmin } from "./components/admin/RequireAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Brand Site */}
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Trial Page */}
          <Route path="/trial" element={<Trial />} />
          
          {/* App Pages */}
          <Route path="/app" element={<StoreSelect />} />
          <Route path="/app/setup" element={<Setup />} />
          <Route path="/app/:storeId" element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="insights" element={<Insights />} />
            <Route path="content" element={<Content />} />
            <Route path="publish" element={<Publish />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Admin Pages */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="stores" element={<Stores />} />
            <Route path="stores/:storeId" element={<StoreDetail />} />
            <Route path="billing" element={<Billing />} />
            <Route path="usage" element={<Usage />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
