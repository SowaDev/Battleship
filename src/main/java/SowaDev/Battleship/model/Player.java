package SowaDev.Battleship.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class Player {
    private String name;
    private String playerId;
    private List<Ship> fleet;
    private Grid grid;

    public Player(String playerId, List<Ship> fleet, Grid grid){
        this.name = "";
        this.playerId = playerId;
        this.fleet = fleet;
        this.grid = grid;
    }
}
