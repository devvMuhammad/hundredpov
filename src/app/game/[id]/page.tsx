import Game from "@/components/Game";
import { fetchGame, fetchGameSlots, getCurrentUser } from "@/actions/game";

export default async function GamePage({ params }: { params: { id: string } }) {
  const { id: gameId } = params;

  const [game, slots, user] = await Promise.all([
    fetchGame(gameId),
    fetchGameSlots(gameId),
    getCurrentUser()
  ]);

  return <Game game={game} userId={user?.id} slots={slots} />;
}