package SowaDev.Battleship.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Fleet {
    private List<Ship> fleet = new ArrayList<>();

    public Fleet(){
        fleet.add(new Ship("Carrier", 5));
        fleet.add(new Ship("Battleship", 4));
        fleet.add(new Ship("Cruiser", 3));
        fleet.add(new Ship("Destroyer", 2));
        fleet.add(new Ship("Submarine", 2));
    }
}
