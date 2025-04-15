import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleDashed, ArrowRightLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GameSlot } from "@/types";

interface SwapTeamProps {
  teamIndex: number;
  teams: GameSlot[];
  onSwapTeam: (fromIndex: number, toIndex: number) => void;
}

export function SwapTeam({ teamIndex, teams, onSwapTeam }: SwapTeamProps) {
  const [open, setOpen] = useState(false);
  const filledTeams = teams.filter(team => team.players.length > 0);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 rounded-full hover:bg-gaming-darker/50 flex items-center justify-center p-0"
        onClick={() => setOpen(true)}
      >
        <ArrowRightLeft className="h-4 w-4 text-gray-400" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gaming-light border-pubg/30 max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Swap Team Position</DialogTitle>
            <DialogDescription className="text-gray-400">
              Select a team to swap positions with Team {teamIndex + 1}
            </DialogDescription>
          </DialogHeader>

          {filledTeams.length > 1 ? (
            <div className="grid gap-2 py-4">
              {filledTeams.map((team) => {
                const indexInOriginalArray = teams.findIndex(t => t.slot_index === team.slot_index);
                if (indexInOriginalArray === teamIndex) return null;

                return (
                  <Button
                    key={team.slot_index}
                    variant="outline"
                    className="justify-start h-auto py-3 hover:bg-gaming-darker/30"
                    onClick={() => {
                      onSwapTeam(teamIndex, indexInOriginalArray);
                      setOpen(false);
                    }}
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
    </>
  );
} 