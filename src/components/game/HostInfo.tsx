import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRound } from "lucide-react";

interface HostInfoProps {
  host: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

export function HostInfo({ host }: HostInfoProps) {
  return (
    <Card className="border-pubg/20 bg-gaming-light hover:border-pubg/40 transition-colors md:order-1">
      <CardHeader className="pb-2 border-b border-gaming-darker/30">
        <CardTitle className="text-base text-white flex items-center gap-2">
          <UserRound className="h-5 w-5 text-pubg" />
          Host Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 bg-gradient-to-b from-gaming-darker/5 to-gaming-darker/15">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-pubg ring-2 ring-pubg/30 ring-offset-2 ring-offset-gaming-darker">
              <AvatarImage src={host.avatar_url} alt={host.name} />
              <AvatarFallback className="bg-pubg text-white">{host.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-bold text-xl text-white">{host.name}</p>
              <Badge variant="outline" className="mt-2 bg-gaming-darker/40 border-pubg/40 text-pubg">
                Host
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 