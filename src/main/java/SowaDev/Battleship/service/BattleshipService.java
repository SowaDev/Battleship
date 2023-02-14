package SowaDev.Battleship.service;

import SowaDev.Battleship.model.*;
import SowaDev.Battleship.storage.GameStorage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.NoSuchElementException;

@Service
public class BattleshipService {

    public Game getGame(String gameId) {
        if(!GameStorage.getInstance().getGames().containsKey(gameId))
            throw new NoSuchElementException("Game not found");
        return GameStorage.getInstance().getGames().get(gameId);
    }

    public String convertToJson(Game game){
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(game);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String convertLogToJson(LogEntry logEntry){
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(logEntry);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public Square getSquare(Player player, Coordinates coordinates) {
        int x = coordinates.getX(), y = coordinates.getY();
        return player.getGrid().getBattleMap()[x][y];
    }

    public Game playerMove(Shot shot) {
        Game game = getGame(shot.getGameId());
        checkIfCorrect(game, shot.getPlayerId());
        Player opponent = getOpponent(game, shot.getPlayerId());
        Square square = getSquare(opponent, shot.getCoordinates());
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
        if(!square.getStatus().equals(SquareStatus.NOT_SHOT))
            throw new IllegalStateException("You've already shot here");
        if(square.getShip() != null) {
            hitTheShip(square.getShip());
            square.setStatus(SquareStatus.HIT);
            checkWinningConditions(game, opponent);
        } else {
            square.setStatus(SquareStatus.MISS);
            game.setPlayerTurn(opponent.getPlayerId());
        }
    }

    public void hitTheShip(Ship ship){
        ship.setLife(ship.getLife() - 1);
        if(ship.getLife() == 0)
            ship.setDestroyed(true);
    }

    public void checkIfCorrect(Game game, String playerId){
        if(game.getGameStatus().equals(GameStatus.NEW))
            throw new RuntimeException("Game hasn't started yet. Still waiting for 2nd player");
        if(game.getGameStatus().equals(GameStatus.FINISHED))
            throw new RuntimeException("Game is finished");
        if(!game.getPlayerTurn().equals(playerId))
            throw new RuntimeException("It's not your turn");
    }

    public Player getOpponent(Game game, String playerId){
        return Arrays.stream(game.getPlayers())
                .filter(player -> !player.getPlayerId().equals(playerId))
                .findFirst()
                .orElse(null);
    }

    public boolean isLost(Player player){
        for(Ship ship : player.getFleet()){
            if(!ship.isDestroyed()){
                return false;
            }
        }
        return true;
    }

    public void addMessage(Message message) {
        Game game = getGame(message.getGameId());
        Message messageWithDate = new Message(message.getSenderName(), message.getSenderId(),
                message.getText(), message.getGameId());
        game.getMessageList().add(messageWithDate);
    }

    public String getSunkenShipName(Player opponent, Shot shot, SquareStatus shotResult){
        String sunkenShipName = "";
        if(shotResult.equals(SquareStatus.HIT)) {
            Ship ship = getSquare(opponent, shot.getCoordinates()).getShip();
            sunkenShipName = ship.isDestroyed() ? ship.getName() : "";
        }
        return sunkenShipName;
    }

    public String addLogEntry(Game game, Shot shot) {
        Player opponent = getOpponent(game, shot.getPlayerId());
        SquareStatus shotResult = getSquare(opponent, shot.getCoordinates()).getStatus();
        String sunkenShipName = getSunkenShipName(opponent, shot, shotResult);
        LogEntry newEntry = new LogEntry(shot.getPlayerId(), shot.getPlayerName(),
                shot.getCoordinates(), shotResult, sunkenShipName);
        game.getCaptainsLog().add(newEntry);
        return convertLogToJson(newEntry);
    }
}
