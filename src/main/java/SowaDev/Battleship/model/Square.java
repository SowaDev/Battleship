package SowaDev.Battleship.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Square {
//    private int x, y;
    private Coordinates coordinates;
    private Ship ship;
    private boolean wasShot;
    private boolean isRestricted;

    public Square(int x, int y){
        this.coordinates = new Coordinates(x, y);
    }
}
