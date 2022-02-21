package SowaDev.Battleship.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Player {
    private String name;
//    private Fleet fleet;
    private List<Ship> fleet = new ArrayList<>();
    private Grid grid;

    public Player(String name, List<Ship> fleet, Grid grid){
        this.name = name;
        this.fleet = fleet;
        this.grid = grid;
    }
}
