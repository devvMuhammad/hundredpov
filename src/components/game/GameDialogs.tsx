import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleDot, CircleDashed, ArrowRightLeft, MoveRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface GameDialogsProps {
  gameId: string;
  userId: string | undefined;
  teams: Team[];
  filledTeams: Team[];
  emptyTeams: Team[];
  onSwapTeam: (fromIndex: number, toIndex: number) => void;
  onMoveTeam: (fromIndex: number, toIndex: number) => void;
}

interface Team {
  id: string;
  players: Player[];
}

interface Player {
  id: string;
  name: string;
  avatarUrl: string;
}

export function GameDialogs({
  gameId,
  userId,
  teams,
  filledTeams,
  emptyTeams,
  onSwapTeam,
  onMoveTeam
}: GameDialogsProps) {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [swapDialogOpen, setSwapDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [gameSlots, setGameSlots] = useState<{ slot_index: number; player_id: string | null }[]>([]);

  // Fetch game slots on mount
  useEffect(() => {
    const fetchGameSlots = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('game_slots')
        .select('slot_index, player_id')
        .eq('game_id', gameId)
        .order('slot_index');

      if (data) {
        setGameSlots(data);
      }
    };

    fetchGameSlots();
  }, [gameId]);

  // Handle joining game
  const handleJoinGame = async () => {
    if (selectedSlot === null || !userId) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('game_slots')
      .insert({
        game_id: gameId,
        slot_index: selectedSlot,
        player_id: userId
      });

    if (error) {
      console.error('Error joining game:', error);
      return;
    }

    setJoinDialogOpen(false);
  };

  return (
    <>
      {/* Join Game Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="bg-gaming-light border-pubg/30 max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Join Game</DialogTitle>
            <DialogDescription className="text-gray-400">
              To join this game, follow these steps:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Go to PUBG Custom Match settings</li>
                <li>Enter the game password when prompted</li>
                <li>Select your preferred slot from the available options below</li>
              </ul>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 py-4">
            {Array.from({ length: 100 }, (_, i) => {
              const isSlotTaken = gameSlots.some(slot => slot.slot_index === i && slot.player_id !== null);
              return (
                <Button
                  key={i}
                  variant="outline"
                  className={`justify-start h-auto py-3 hover:bg-gaming-darker/30 ${isSlotTaken ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  disabled={isSlotTaken}
                  onClick={() => setSelectedSlot(i)}
                >
                  <div className="flex items-center w-full">
                    <div className={`rounded px-2 py-1 mr-3 ${isSlotTaken ? 'bg-red-500/20 text-red-400' : 'bg-pubg/20 text-white'
                      }`}>
                      Slot {i + 1}
                    </div>
                    <div className="flex-1 flex items-center">
                      <span className="text-gray-400">
                        {isSlotTaken ? 'Taken' : 'Available'}
                      </span>
                    </div>
                    {selectedSlot === i && (
                      <CircleDot className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
            <Button
              variant="default"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleJoinGame}
              disabled={selectedSlot === null}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Swap Team Dialog */}
      <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
        <DialogContent className="bg-gaming-light border-pubg/30 max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Swap Team Position</DialogTitle>
            <DialogDescription className="text-gray-400">
              Select a team to swap positions with Team {selectedSlot !== null ? selectedSlot + 1 : ''}
            </DialogDescription>
          </DialogHeader>

          {filledTeams.length > 1 ? (
            <div className="grid gap-2 py-4">
              {filledTeams.map((team) => {
                const indexInOriginalArray = teams.findIndex(t => t.id === team.id);
                if (indexInOriginalArray === selectedSlot) return null;

                return (
                  <Button
                    key={team.id}
                    variant="outline"
                    className="justify-start h-auto py-3 hover:bg-gaming-darker/30"
                    onClick={() => onSwapTeam(selectedSlot!, indexInOriginalArray)}
                  >
                    <div className="flex items-center w-full">
                      <div className="bg-pubg/20 text-white rounded px-2 py-1 mr-3">
                        Team {indexInOriginalArray + 1}
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        {team.players.map(player => (
                          <Avatar key={player.id} className="h-6 w-6 border border-pubg/30">
                            <AvatarImage src={player.avatarUrl} alt={player.name} />
                            <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                    </div>
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <CircleDashed className="h-12 w-12 text-gray-500 mb-2" />
              <p className="text-gray-400">No other teams available to swap with</p>
            </div>
          )}

          <DialogClose asChild>
            <Button variant="outline" className="w-full">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Move Team Dialog */}
      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent className="bg-gaming-light border-pubg/30 max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Move Team</DialogTitle>
            <DialogDescription className="text-gray-400">
              Select an empty slot to move Team {selectedSlot !== null ? selectedSlot + 1 : ''}
            </DialogDescription>
          </DialogHeader>

          {emptyTeams.length > 0 ? (
            <div className="grid gap-2 py-4">
              {emptyTeams.map((team) => {
                const indexInOriginalArray = teams.findIndex(t => t.id === team.id);

                return (
                  <Button
                    key={team.id}
                    variant="outline"
                    className="justify-start h-auto py-3 hover:bg-gaming-darker/30"
                    onClick={() => onMoveTeam(selectedSlot!, indexInOriginalArray)}
                  >
                    <div className="flex items-center w-full">
                      <div className="bg-gaming-darker/50 text-gray-300 rounded px-2 py-1 mr-3">
                        Slot {indexInOriginalArray + 1}
                      </div>
                      <div className="flex-1 flex items-center">
                        <span className="text-gray-400">Empty position</span>
                      </div>
                      <MoveRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <CircleDashed className="h-12 w-12 text-gray-500 mb-2" />
              <p className="text-gray-400">No empty slots available</p>
            </div>
          )}

          <DialogClose asChild>
            <Button variant="outline" className="w-full">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
} 