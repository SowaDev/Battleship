package SowaDev.Battleship.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Game {
    private String gameId;
    private Player player1;
    private Player player2;
    private GameStatus gameStatus;
}
