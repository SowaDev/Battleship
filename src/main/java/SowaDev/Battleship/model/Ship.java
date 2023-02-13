package SowaDev.Battleship.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ship {
    private String name;
    private int length;
    private int life;
    private List<Coordinates> placement;
    private boolean isSetSail;
    private boolean isVertical;
    private boolean isDestroyed;

    public Ship(String name, int length) {
        this.name = name;
        this.length = length;
        this.life = length;
    }

    public class AircraftCarrier extends Ship{
        private final static int LENGTH = 5;
        private final static String NAME = "AircraftCarrier";

        public AircraftCarrier(){
            super(NAME, LENGTH);
        }
    }

    public class Battleship extends Ship{
        private final static int LENGTH = 4;
        private final static String NAME = "Battleship";
        public Battleship(){
            super(NAME, LENGTH);
        }
    }

    public class Cruiser extends Ship{
        private final static int LENGTH = 3;
        private final static String NAME = "Cruiser";
        public Cruiser(){
            super(NAME, LENGTH);
        }
    }

    public class Submarine extends Ship{
        private final static int LENGTH = 3;
        private final static String NAME = "Submarine";
        public Submarine(){
            super(NAME, LENGTH);
        }
    }

    public class Destroyer extends Ship{
        private final static int LENGTH = 2;
        private final static String NAME = "Destroyer";
        public Destroyer(){
            super(NAME, LENGTH);
        }
    }
}
