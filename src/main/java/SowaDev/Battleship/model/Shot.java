package SowaDev.Battleship.model;

import lombok.Data;

@Data
public class Shot {
    private Coordinates coordinates;
    private String playerId;
    private String gameId;
}
