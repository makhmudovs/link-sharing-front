import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertOptions {
  type?: AlertType;
  duration?: number; // in ms
}

interface AlertContextType {
  showAlert: (message: string, options?: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};

interface Alert {
  message: string;
  type: AlertType;
}

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showAlert = (message: string, options?: AlertOptions) => {
    // Clear existing timeout before setting new alert
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAlert({
      message,
      type: options?.type || "info",
    });

    timeoutRef.current = setTimeout(() => {
      setAlert(null);
      timeoutRef.current = null;
    }, options?.duration || 3000);
  };

  // Clear timeout on unmount (good practice)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded text-white shadow-lg transition-all ${
            alert.type === "success"
              ? "bg-green-500"
              : alert.type === "error"
                ? "bg-red-500"
                : alert.type === "warning"
                  ? "bg-yellow-500 text-black"
                  : "bg-blue-500"
          }`}
        >
          {alert.message}
        </div>
      )}
    </AlertContext.Provider>
  );
};
