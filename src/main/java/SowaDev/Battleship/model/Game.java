package SowaDev.Battleship.model;

import lombok.Data;
import java.util.UUID;

@Data
public class Game {
    private String gameId;
//    private UUID gameId;
    private Player[] players = new Player[2];
    private GameStatus gameStatus;
    private String playerTurn;
//    private UUID playerTurn;

    public Game(String gameId, Player player1, Player player2, GameStatus gameStatus){
        this.gameId = gameId;
        this.players[0] = player1;
        this.players[1] = player2;
        this.gameStatus = gameStatus;
    }
}
