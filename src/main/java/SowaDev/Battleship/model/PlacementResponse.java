package SowaDev.Battleship.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PlacementResponse {
    private String placementResult;
    private Grid grid;
}
