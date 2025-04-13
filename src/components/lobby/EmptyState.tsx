import { Trophy, Clock, Timer } from "lucide-react";
import { GameCategory } from "@/app/actions/games";

type EmptyStateProps = {
  category: GameCategory;
};

const getIcon = (category: GameCategory) => {
  switch (category) {
    case 'open':
      return <Clock className="h-12 w-12 text-gray-400" />;
    case 'live':
      return <Timer className="h-12 w-12 text-gray-400" />;
    case 'completed':
      return <Trophy className="h-12 w-12 text-gray-400" />;
  }
};

const getMessage = (category: GameCategory) => {
  switch (category) {
    case 'open':
      return "No open games available";
    case 'live':
      return "No live games";
    case 'completed':
      return "No completed games";
  }
};

export function EmptyState({ category }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {getIcon(category)}
      <h3 className="text-lg font-medium text-white">{getMessage(category)}</h3>
      <p className="text-sm text-gray-400 text-center">
        {category === 'open'
          ? "Be the first to host a game!"
          : "Check back later for more games"}
      </p>
    </div>
  );
} 