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

    public Player(List<Ship> fleet, Grid grid){
        this.fleet = fleet;
        this.grid = grid;
    }
}
