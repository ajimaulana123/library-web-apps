
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Books from "./pages/admin/Books";
import BookForm from "./pages/admin/BookForm";
import Loans from "./pages/admin/Loans";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentCatalog from "./pages/student/Catalog";
import StudentBookDetail from "./pages/student/BookDetail";
import StudentLoans from "./pages/student/Loans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/books" element={
              <ProtectedRoute requiredRole="admin">
                <Books />
              </ProtectedRoute>
            } />
            <Route path="/admin/books/add" element={
              <ProtectedRoute requiredRole="admin">
                <BookForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/books/edit/:id" element={
              <ProtectedRoute requiredRole="admin">
                <BookForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/loans" element={
              <ProtectedRoute requiredRole="admin">
                <Loans />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute requiredRole="admin">
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Protected Student Routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/catalog" element={
              <ProtectedRoute requiredRole="student">
                <StudentCatalog />
              </ProtectedRoute>
            } />
            <Route path="/student/books/:id" element={
              <ProtectedRoute requiredRole="student">
                <StudentBookDetail />
              </ProtectedRoute>
            } />
            <Route path="/student/loans" element={
              <ProtectedRoute requiredRole="student">
                <StudentLoans />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
