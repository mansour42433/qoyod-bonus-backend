import { AlertCircle, X } from 'lucide-react';

const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 ml-3" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
            حدث خطأ
          </h3>
          <p className="text-sm text-red-700 dark:text-red-400 mt-1">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="mr-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
