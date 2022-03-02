package SowaDev.Battleship.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class Player {
    private String name;
//    private UUID playerId;
    private String playerId;
//    private Fleet fleet;
    private List<Ship> fleet = new ArrayList<>();
    private Grid grid;

    public Player(String playerId, List<Ship> fleet, Grid grid){
        this.playerId = playerId;
        this.fleet = fleet;
        this.grid = grid;
    }
}
