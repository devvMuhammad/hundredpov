"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trophy, Clock, Timer } from "lucide-react";
import { MatchCard } from "./lobby/MatchCard";
import { useQuery } from "@tanstack/react-query";
import { fetchGames, GameCategory } from "@/app/actions/games";
import { GameCardSkeleton } from "./lobby/GameCardSkeleton";
import { EmptyState } from "./lobby/EmptyState";
import { ErrorState } from "./lobby/ErrorState";
import { useState } from "react";

const Lobby = () => {
  const [activeTab, setActiveTab] = useState<GameCategory>('open');

  const { data: games, isLoading, isError } = useQuery({
    queryKey: ['games', activeTab],
    queryFn: () => fetchGames(activeTab),
  });

  return (
    <div className="w-full md:w-3/4">
      <Tabs
        defaultValue="open"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as GameCategory)}
      >
        <TabsList className="w-full grid grid-cols-3 mb-4 bg-transparent border-b border-gaming-light">
          <TabsTrigger
            value="open"
            className="bg-transparent rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-pubg data-[state=active]:text-white text-gray-400"
          >
            <Clock className="h-4 w-4 mr-2" />
            Open Matches
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="bg-transparent rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-pubg data-[state=active]:text-white text-gray-400"
          >
            <Timer className="h-4 w-4 mr-2" />
            Live Matches
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="bg-transparent rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-pubg data-[state=active]:text-white text-gray-400"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="space-y-4 mt-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <GameCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState />
          ) : games?.length === 0 ? (
            <EmptyState category="open" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {games?.map(game => (
                <MatchCard key={game.id} match={game} type="open" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="live" className="space-y-4 mt-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <GameCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState />
          ) : games?.length === 0 ? (
            <EmptyState category="live" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games?.map(game => (
                <MatchCard key={game.id} match={game} type="live" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <GameCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState />
          ) : games?.length === 0 ? (
            <EmptyState category="completed" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games?.map(game => (
                <MatchCard key={game.id} match={game} type="completed" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Lobby;
