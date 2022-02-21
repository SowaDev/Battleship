package SowaDev.Battleship.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@AllArgsConstructor
public class ShipPlacement {
    private int shipId;
    private List<Coordinates> coordinatesList;
}
