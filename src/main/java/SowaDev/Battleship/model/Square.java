package SowaDev.Battleship.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Square {
    private int x, y;
    private Ship ship;
    private boolean wasShot;
    private boolean isRestricted;

    public Square(int x, int y){
        this.x = x;
        this.y = y;
    }
}
