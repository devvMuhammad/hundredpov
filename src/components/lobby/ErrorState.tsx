import { AlertCircle } from "lucide-react";

export function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <h3 className="text-lg font-medium text-white">Failed to load games</h3>
      <p className="text-sm text-gray-400 text-center">
        There was an error loading the games. Please try again later.
      </p>
    </div>
  );
} 