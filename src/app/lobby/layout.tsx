import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@radix-ui/react-avatar";
import { Gamepad2, Monitor, PlusCircle, Smartphone, Twitch, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { createClient } from "@/lib/supabase/server";

async function getPlayerInfo() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: playerInfo } = await supabase
    .from('player_info')
    .select('*')
    .eq('id', user.id)
    .single();

  return { profile, playerInfo, user };
}

const getPlatformIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case 'pc':
      return <Monitor className="h-5 w-5 text-pubg" />;
    case 'xbox':
    case 'playstation':
      return <Gamepad2 className="h-5 w-5 text-pubg" />;
    case 'mobile':
      return <Smartphone className="h-5 w-5 text-pubg" />;
    default:
      return <Monitor className="h-5 w-5 text-pubg" />;
  }
};

export default async function Layout({ children }: PropsWithChildren) {
  const data = await getPlayerInfo();

  return (
    <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Game Lobby</h1>
          {data?.user && (
            <Link href="/host-game">
              <Button className="bg-pubg hover:bg-pubg-light text-white font-medium flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Host Your Own Game
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Match lists */}
          {children}


          {/* Right column - Player info card */}
          <div className="w-full md:w-1/4 mt-6 md:mt-0">
            <Card className="bg-gaming-light sticky top-24">
              {!data?.user ? (
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
              ) : !data?.playerInfo ? (
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
                        <AvatarImage src={data.profile?.avatar_url} alt={data.profile?.name} />
                        <AvatarFallback className="bg-pubg text-white">
                          {data.profile?.name?.substring(0, 1).toUpperCase() || "??"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-white">{data.profile?.name || "Anonymous"}</CardTitle>
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
                          <p className="text-white">{data.playerInfo.twitch_username}</p>
                        </div>
                      </div>

                      <Separator className="bg-gaming-darker" />

                      <div className="flex items-center gap-3">
                        <Gamepad2 className="h-5 w-5 text-pubg" />
                        <div>
                          <p className="text-gray-400 text-xs">PUBG</p>
                          <p className="text-white">{data.playerInfo.pubg_username}</p>
                        </div>
                      </div>

                      <Separator className="bg-gaming-darker" />

                      <div className="flex items-center gap-3">
                        {getPlatformIcon(data.playerInfo.platform)}
                        <div>
                          <p className="text-gray-400 text-xs">Platform</p>
                          <p className="text-white">{data.playerInfo.platform}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}