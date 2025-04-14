import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleDot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";

interface JoinGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gameId: string;
  userId: string | undefined;
}

export function JoinGameDialog({ open, onOpenChange, gameId, userId }: JoinGameDialogProps) {
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

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                className={`justify-start h-auto py-3 hover:bg-gaming-darker/30 ${isSlotTaken ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSlotTaken}
                onClick={() => setSelectedSlot(i)}
              >
                <div className="flex items-center w-full">
                  <div className={`rounded px-2 py-1 mr-3 ${isSlotTaken ? 'bg-red-500/20 text-red-400' : 'bg-pubg/20 text-white'}`}>
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
  );
} 