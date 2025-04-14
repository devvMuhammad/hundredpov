import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleDashed, MoveRight } from "lucide-react";

interface Player {
  id: string;
  name: string;
  twitchName: string;
  avatarUrl: string;
}

interface Team {
  id: string;
  players: Player[];
  isFilled: boolean;
}

interface MoveTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTeamIndex: number | null;
  teams: Team[];
  onMoveTeam: (fromIndex: number, toIndex: number) => void;
}

export function MoveTeamDialog({
  open,
  onOpenChange,
  selectedTeamIndex,
  teams,
  onMoveTeam
}: MoveTeamDialogProps) {
  const emptyTeams = teams.filter(team => !team.isFilled);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gaming-light border-pubg/30 max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Move Team</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select an empty slot to move Team {selectedTeamIndex !== null ? selectedTeamIndex + 1 : ''}
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
                  onClick={() => onMoveTeam(selectedTeamIndex!, indexInOriginalArray)}
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
  );
} 