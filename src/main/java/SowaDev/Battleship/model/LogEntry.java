package SowaDev.Battleship.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LogEntry {
    private String playerId;
    private String playerName;
    private Coordinates coordinates;
    private SquareStatus shotResult;
    private String sunkenShipName;
}
