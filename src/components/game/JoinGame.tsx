import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JoinGameProps {
  gameId: string;
  userId: string | undefined;
  availableSlots: number[];
}

export function JoinGame({ gameId, userId, availableSlots }: JoinGameProps) {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle joining game
  const handleJoinGame = async () => {
    if (!selectedSlot || !userId) return;

    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('game_slots')
      .insert({
        game_id: gameId,
        slot_index: parseInt(selectedSlot),
        player_id: userId
      });

    if (error) {
      console.error('Error joining game:', error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setOpen(false);
    setSelectedSlot("");
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        Join Game
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gaming-light border-pubg/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Join Game</DialogTitle>
            <div className="text-gray-400">
              <div className="space-y-2">
                <div>Ready to join the action? Here&apos;s what you need to do:</div>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Launch PUBG and navigate to Custom Match</li>
                  <li>Enter the game password when prompted</li>
                  <li>Select your preferred slot from the available options</li>
                  <li>Click Confirm to secure your spot</li>
                </ol>
                <div className="text-sm text-gray-500 mt-2">
                  Note: Make sure you have the game password ready before proceeding.
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Available Slots</label>
              <Select
                value={selectedSlot}
                onValueChange={setSelectedSlot}
              >
                <SelectTrigger className="bg-gaming-darker/50 border-pubg/30 text-white">
                  <SelectValue placeholder="Select a slot" />
                </SelectTrigger>
                <SelectContent className="bg-gaming-darker border-pubg/30">
                  {availableSlots.map(slot => (
                    <SelectItem
                      key={slot}
                      value={slot.toString()}
                      className="text-white hover:bg-gaming-light/20"
                    >
                      Slot {slot + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
            <Button
              variant="default"
              className="flex-1"
              onClick={handleJoinGame}
              disabled={!selectedSlot || isLoading}
            >
              {isLoading ? "Joining..." : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 