import { useState, useCallback } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

// ================================================================
//  Toast Component – lightweight notification system
// ================================================================

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, hiding: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 2800);
  }, []);

  return { toasts, addToast };
}

export function ToastContainer({ toasts }) {
  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type} ${toast.hiding ? 'hiding' : ''}`}
          role="alert"
        >
          <span className={`toast-icon ${toast.type}`}>
            {toast.type === 'success' ? (
              <CheckCircle size={16} />
            ) : (
              <XCircle size={16} />
            )}
          </span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
