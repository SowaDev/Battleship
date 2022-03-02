package SowaDev.Battleship.model;

import lombok.Data;
import java.util.UUID;

@Data
public class Game {
    private String gameId;
//    private UUID gameId;
    private Player player1;
    private Player player2;
    private GameStatus gameStatus;
    private String playerTurn;
//    private UUID playerTurn;

    public Game(String gameId, Player player1, Player player2, GameStatus gameStatus){
        this.gameId = gameId;
        this.player1 = player1;
        this.player2 = player2;
        this.gameStatus = gameStatus;
    }
}
