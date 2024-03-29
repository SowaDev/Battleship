package SowaDev.Battleship.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class Game {
    private String gameId;
    private Player[] players = new Player[2];
    private GameStatus gameStatus;
    private String playerTurn;
    private List<Message> messageList;
    private List<LogEntry> captainsLog;


    public Game(String gameId, Player player1, Player player2, GameStatus gameStatus){
        this.gameId = gameId;
        this.players[0] = player1;
        this.players[1] = player2;
        this.gameStatus = gameStatus;
        this.messageList = new ArrayList<>();
        this.captainsLog = new ArrayList<>();
    }
}
