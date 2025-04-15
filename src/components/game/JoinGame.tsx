import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/providers/session-provider";

interface JoinGameProps {
  gameId: string;
  userId: string | undefined;
  availableSlots: number[];
}

async function joinGameSlot({ gameId, userId, slotIndex }: { gameId: string; userId: string; slotIndex: number }) {
  const supabase = createClient();
  const { error } = await supabase
    .from('game_slots')
    .insert({
      game_id: gameId,
      slot_index: slotIndex,
      player_id: userId
    });

  if (error) throw error;
}

export function JoinGame({ gameId, availableSlots }: JoinGameProps) {
  const { user } = useSession();

  const [open, setOpen] = useState(false);
  const [slotNumber, setSlotNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: joinGameSlot,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have successfully joined the game!",
        className: "bg-green-500 text-white border-0",
      });
      setOpen(false);
      setSlotNumber("");
      setError("");
    },
    onError: (error) => {
      console.error('Error joining game:', error);
      setError("Failed to join gamse. Please try again.");
      toast({
        title: "Error",
        description: error.message || "Failed to join the game. Please try again.",
        variant: "destructive",
      });
    }
  });

  const validateSlot = (value: string) => {
    if (!value) {
      setError("Please enter a slot number");
      return false;
    }

    const num = parseInt(value);
    if (isNaN(num)) {
      setError("Please enter a valid number");
      return false;
    }

    if (num < 1 || num > 100) {
      setError("Slot number must be between 1 and 100");
      return false;
    }

    if (!availableSlots.includes(num - 1)) {
      setError("This slot is not available");
      return false;
    }

    return true;
  };

  const handleSlotChange = (value: string) => {
    setError("");
    setSlotNumber(value);
    validateSlot(value);
  };

  const handleJoinGame = () => {
    const userId = user?.id;
    if (!userId) {
      setError("You must be logged in to join a game");
      return;
    }

    if (!validateSlot(slotNumber)) {
      return;
    }

    const num = parseInt(slotNumber);
    mutate({ gameId, userId, slotIndex: num - 1 });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Join Game</Button>
      </DialogTrigger>
      <DialogContent className="bg-gaming-light border-pubg/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Join Game</DialogTitle>
          <div className="text-gray-400">
            <div className="space-y-2">
              <div>Ready to join the action? Here&apos;s what you need to do:</div>
              <ol className="list-decimal list-inside space-y-1">
                <li>Launch PUBG and navigate to Custom Match</li>
                <li>Enter the game password when prompted</li>
                <li>Enter your preferred slot number (1-100)</li>
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
            <label className="text-sm text-gray-400">Enter Slot Number</label>
            <Input
              type="number"
              min="1"
              max="100"
              value={slotNumber}
              onChange={(e) => handleSlotChange(e.target.value)}
              className="bg-gaming-darker/50 border-pubg/30 text-white"
              placeholder="Enter slot number (1-100)"
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </DialogClose>
          <Button
            className="flex-1"
            onClick={handleJoinGame}
            disabled={isPending || !slotNumber || !!error || !user}
          >
            {isPending ? "Joining..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 