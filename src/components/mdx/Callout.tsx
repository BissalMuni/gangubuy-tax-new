interface CalloutProps {
  type?: 'info' | 'success' | 'caution' | 'warning' | 'error';
  children: React.ReactNode;
}

const styles: Record<string, string> = {
  info: 'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-200',
  success: 'border-green-300 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-950/40 dark:text-green-200',
  caution: 'border-yellow-300 bg-yellow-50 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-200',
  warning: 'border-red-300 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200',
  error: 'border-red-400 bg-red-100 text-red-900 dark:border-red-600 dark:bg-red-950/50 dark:text-red-100',
};

const icons: Record<string, string> = {
  info: 'ℹ️',
  success: '✅',
  caution: '⚠️',
  warning: '🚨',
  error: '❌',
};

export function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div className={`rounded-lg border-l-4 px-4 py-3 mb-4 ${styles[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}
