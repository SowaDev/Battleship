package SowaDev.Battleship.service;

import SowaDev.Battleship.model.Game;
import SowaDev.Battleship.model.GameStatus;
import SowaDev.Battleship.model.Player;
import SowaDev.Battleship.model.Ship;
import SowaDev.Battleship.storage.GameStorage;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameService {

    public Game createGame(Player player) {
        Game game = new Game(UUID.randomUUID().toString(), player, null, GameStatus.NEW);
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game checkForOngoingGame(Player player) {
        return GameStorage.getInstance().getGames().values().stream()
                .filter(g -> !g.getGameStatus().equals(GameStatus.FINISHED))
                .filter(g -> Arrays.stream(g.getPlayers())
                        .filter(Objects::nonNull)
                        .anyMatch(p -> p.getPlayerId().equals(player.getPlayerId())))
                .findFirst()
                .orElse(null);
    }

    public Player setPlayerName(Player player, String name) {
        player.setName(name);
        return player;
    }

    public Game findGameToJoin(){
        return GameStorage.getInstance().getGames().values().stream()
                .filter(g -> g.getGameStatus().equals(GameStatus.NEW))
                .findFirst().orElse(null);
    }

    public Game play(Player player) {
        Game game = checkForOngoingGame(player);
        if (game != null)
            return game;
        if(!areAllShipsSetSail(player))
            throw new IllegalStateException("You didn't put out all of the ships");
        game = findGameToJoin();
        if(game != null)
            return joinGame(game, player);
        else
           return createGame(player);
    }

    public Game joinGame(Game game, Player player){
        Player[] players = game.getPlayers();
        players[1] = player;
        game.setPlayers(players);
        game.setGameStatus(GameStatus.IN_PROGRESS);
        game.setPlayerTurn(setRandomStarter(game.getPlayers()[0].getPlayerId(),game.getPlayers()[1].getPlayerId()));
        return game;
    }

    public boolean areAllShipsSetSail(Player player){
        for(Ship ship : player.getFleet()){
            if(!ship.isSetSail())
                return false;
        }
        return true;
    }

    private String setRandomStarter(String player1Id, String player2Id) {
        Random rand = new Random();
        int r = rand.nextInt(2);
        return r == 0 ? player1Id : player2Id;
    }
}
