import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Gamepad2, PlusCircle, Twitch, UserCircle2 } from "lucide-react";

interface PlayerInfo {
  twitch_username: string | null;
  pubg_username: string | null;
  platform: string | null;
}

interface Profile {
  name: string | null;
  avatar_url: string | null;
}

interface LobbyPlayerInfoCardProps {
  user: { id: string } | null;
  playerInfo: PlayerInfo | null;
  profile: Profile | null;
}

const getPlatformIcon = (platform: string | null) => {
  switch (platform?.toLowerCase()) {
    case "steam":
      return <Gamepad2 className="h-5 w-5 text-pubg" />;
    case "xbox":
      return <Gamepad2 className="h-5 w-5 text-green-500" />;
    case "playstation":
      return <Gamepad2 className="h-5 w-5 text-blue-500" />;
    default:
      return <Gamepad2 className="h-5 w-5 text-gray-400" />;
  }
};

export function LobbyPlayerInfoCard({ user, playerInfo, profile }: LobbyPlayerInfoCardProps) {
  return (
    <Card className="bg-gaming-light sticky top-24">
      {!user ? (
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <UserCircle2 className="h-16 w-16 text-gray-400" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white">Not Logged In</h3>
              <p className="text-sm text-gray-400">Sign in to access your profile and join games</p>
            </div>
            <Link href="/login">
              <Button className="bg-pubg hover:bg-pubg-light text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      ) : !playerInfo ? (
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-pubg/10 flex items-center justify-center">
              <PlusCircle className="h-8 w-8 text-pubg" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white">Complete Your Profile</h3>
              <p className="text-sm text-gray-400">Add your gaming details to get started</p>
            </div>
            <Link href="/onboarding">
              <Button className="bg-pubg hover:bg-pubg-light text-white">
                Complete Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      ) : (
        <>
          <CardHeader className="pb-0">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.name || undefined} />
                <AvatarFallback className="bg-pubg text-white">
                  {profile?.name?.substring(0, 1).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg text-white">{profile?.name || "Anonymous"}</CardTitle>
                <p className="text-gray-400 text-xs">PUBG Player</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Twitch className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-gray-400 text-xs">Twitch</p>
                  <p className="text-white">{playerInfo.twitch_username}</p>
                </div>
              </div>

              <Separator className="bg-gaming-darker" />

              <div className="flex items-center gap-3">
                <Gamepad2 className="h-5 w-5 text-pubg" />
                <div>
                  <p className="text-gray-400 text-xs">PUBG</p>
                  <p className="text-white">{playerInfo.pubg_username}</p>
                </div>
              </div>

              <Separator className="bg-gaming-darker" />

              <div className="flex items-center gap-3">
                {getPlatformIcon(playerInfo.platform)}
                <div>
                  <p className="text-gray-400 text-xs">Platform</p>
                  <p className="text-white">{playerInfo.platform}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
} 