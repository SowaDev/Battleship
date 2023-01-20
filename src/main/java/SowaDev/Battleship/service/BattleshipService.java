package SowaDev.Battleship.service;

import SowaDev.Battleship.model.*;
import SowaDev.Battleship.storage.GameStorage;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class BattleshipService {

    public Game getGame(String gameId) {
        if(!GameStorage.getInstance().getGames().containsKey(gameId))
            throw new NoSuchElementException("Game not found");
        return GameStorage.getInstance().getGames().get(gameId);
    }

    public Game playerMove(Shot shot) {
        Game game = getGame(shot.getGameId());
        checkIfCorrect(game, shot.getPlayerId());
        Player opponent = getOpponent(game, shot.getPlayerId());
        Square square = opponent.getGrid().getBattleMap()[shot.getCoordinates().getX()][shot.getCoordinates().getY()];
        shoot(square, game, opponent);
        return game;
    }

    private void checkWinningConditions(Game game, Player opponent) {
        if(isLost(opponent)){
            game.setGameStatus(GameStatus.FINISHED);
            System.out.println("Congratulations, you've won");
        }
    }

    public void shoot(Square square, Game game, Player opponent){
        if(square.isWasShot())
            throw new IllegalStateException("You've already shot here");
        else
            square.setWasShot(true);
        if(square.getShip() != null) {
            square.getShip().setLife(square.getShip().getLife() - 1);
            checkWinningConditions(game, opponent);
        } else
            game.setPlayerTurn(opponent.getPlayerId());
    }

    public void checkIfCorrect(Game game, String playerId){
        if(game.getGameStatus().equals(GameStatus.NEW))
            throw new RuntimeException("Game hasn't started yet. Still waiting for 2nd player");
        if(game.getGameStatus().equals(GameStatus.FINISHED))
            throw new RuntimeException("Game is finished");
        if(game.getPlayerTurn().equals(playerId))
            throw new RuntimeException("It's not your turn");
    }

    public Player getOpponent(Game game, String playerId){
        Player opponent;
        if(playerId.equals(game.getPlayer1().getPlayerId()))
            opponent = game.getPlayer2();
        else
            opponent = game.getPlayer1();
        return opponent;
    }

    public boolean isLost(Player player){
        for(Ship ship : player.getFleet()){
            if(!ship.isDestroyed())
                return false;
        }
        return true;
    }
}
