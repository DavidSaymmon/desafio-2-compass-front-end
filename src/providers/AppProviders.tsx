import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store";

interface AppProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </QueryClientProvider>
    </Provider>
  );
}
