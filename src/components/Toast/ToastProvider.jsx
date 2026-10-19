import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

function ToastItem({ id, message, type, onRemove }) {
  setTimeout(() => onRemove(id), 3500);

  const colors = {
    error:   'bg-red-600',
    success: 'bg-green-600',
    info:    'bg-gray-800',
  };

  const icons = {
    error:   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    success: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    info:    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" />,
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-white text-sm font-medium min-w-[260px] max-w-[340px] ${colors[type] || colors.info}`}
      style={{ animation: 'slideIn 0.3s ease' }}>
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[type] || icons.info}</svg>
      </div>
      <span className="flex-1 leading-snug">{message}</span>
      <button onClick={() => onRemove(id)} className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  toast.success = (msg) => toast(msg, 'success');
  toast.error   = (msg) => toast(msg, 'error');
  toast.info    = (msg) => toast(msg, 'info');

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {createPortal(
        <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
          <style>{`
            @keyframes slideIn {
              from { opacity: 0; transform: translateX(60px); }
              to   { opacity: 1; transform: translateX(0); }
            }
          `}</style>
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem {...t} onRemove={remove} />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
