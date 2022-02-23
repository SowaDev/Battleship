package SowaDev.Battleship.Service;

import SowaDev.Battleship.model.*;
import SowaDev.Battleship.storage.GameStorage;
import org.springframework.boot.web.embedded.netty.NettyWebServer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class ShipPlacingService {
    private final int size = 10;

//    public Game createGame() {
//        Player player = new Player("player", createFleet(), new Grid());
//        Game game = new Game(UUID.randomUUID().toString(), player, null, GameStatus.NEW);
//        GameStorage.getInstance().setGame(game);
//        return game;
//    }

    public List<Ship> createFleet(){
        List<Ship> fleet = new ArrayList<>();
        fleet.add(new Ship().new AircraftCarrier());
        fleet.add(new Ship().new Battleship());
        fleet.add(new Ship().new Cruiser());
        fleet.add(new Ship().new Destroyer());
        fleet.add(new Ship().new Submarine());
        return fleet;
    }

    public Grid placeShip(Player player, ShipPlacement shipPlacement) {
        Ship ship = player.getFleet().get(shipPlacement.getShipId());
        Grid grid = player.getGrid();
        if(isPossibleToPlaceShip(ship, grid, shipPlacement.getCoordinatesList())) {
            if(ship.isSetSail())
                markSquares(grid, null, ship.getPlacement(), true);
            markSquares(grid, ship, shipPlacement.getCoordinatesList(), false);
            ship.setSetSail(true);
            ship.setPlacement(shipPlacement.getCoordinatesList());
        }
        return grid;
    }



    public boolean isPossibleToPlaceShip(Ship ship, Grid grid, List<Coordinates> coordinatesList) {
        if(ship.getLength() != coordinatesList.size())
            throw new IllegalStateException("Coordinates don't match ship length. Logic error.");
        for(Coordinates coordinates : coordinatesList){
            int x = coordinates.getX(), y = coordinates.getY();
            if(x >= 10 || y >= 10)
                throw new IllegalStateException("Out of bounds");
            else if(grid.getBattleMap()[x][y].getShip() != null)
                throw new IllegalStateException("You can't place ship on top of another");
            else if(grid.getBattleMap()[x][y].isRestricted())
                throw new IllegalStateException("You've put a ship too close to another. There must be one square gap between ships");
        }
        return true;
    }

    public Grid removeShip(Player player, int shipId){
        Ship ship = player.getFleet().get(shipId);
        Grid grid = player.getGrid();
        markSquares(grid, null, ship.getPlacement(), true);
        ship.setPlacement(null);
        ship.setSetSail(false);
        return grid;
    }

    public void markSquares(Grid grid, Ship ship, List<Coordinates> coordinatesList, boolean isBeingRemoved) {
        Coordinates startCoordinates = coordinatesList.get(0);
        Coordinates endCoordinates = coordinatesList.get(coordinatesList.size() - 1);
        for(int i = startCoordinates.getX() - 1; i <= endCoordinates.getX() + 1; i++){
            for(int j = startCoordinates.getY() - 1; j <= endCoordinates.getY() + 1; j++){
                grid.getBattleMap()[i][j].setRestricted(!isBeingRemoved);
            }
        }
        for(Coordinates coordinates : coordinatesList){
            grid.getBattleMap()[coordinates.getX()][coordinates.getY()].setShip(ship);
        }
    }

    public Grid putShipsAtRandom(Player player) {
        Random rand = new Random();
        for(Ship ship : player.getFleet()){
            while(!ship.isSetSail()){
                ship.setPlacement(new ArrayList<>());
                ship.setVertical(rand.nextBoolean());
                int x = ship.isVertical() ? rand.nextInt(10 - ship.getLength()) : rand.nextInt();
                int y = ship.isVertical() ? rand.nextInt(10) : rand.nextInt(10 - ship.getLength());
                for(int i = 0; i < ship.getLength(); i++) {
                    Coordinates newCoordinates = ship.isVertical() ? new Coordinates(x + i, y) : new Coordinates(x, y + 1);
                }
                placeShip(player, new ShipPlacement(player.getFleet().indexOf(ship), ship.getPlacement()));
            }
        }
        return player.getGrid();
    }

/*    public Grid removeShip(Player player, int shipId){
        Ship ship = player.getFleet().get(shipId);
        Grid grid = player.getGrid();
        Coordinates startCoordinates = ship.getPlacement().get(0);
        Coordinates endCoordinates = ship.getPlacement().get(ship.getPlacement().size() - 1);
        for(int i = startCoordinates.getX() - 1; i <= endCoordinates.getX() + 1; i++){
            for(int j = startCoordinates.getY() - 1; j <= endCoordinates.getY() + 1; j++){
                grid.getBattleMap()[i][j].setRestricted(false);
            }
        }
        for(Coordinates coordinates : ship.getPlacement()){
            grid.getBattleMap()[coordinates.getX()][coordinates.getY()].setShip(null);
        }
        return grid;
    }

    public void markSquares(Grid grid, Ship ship, List<Coordinates> coordinatesList) {
        Coordinates startCoordinates = coordinatesList.get(0);
        Coordinates endCoordinates = coordinatesList.get(coordinatesList.size() - 1);
        for(int i = startCoordinates.getX() - 1; i <= endCoordinates.getX() + 1; i++){
            for(int j = startCoordinates.getY() - 1; j <= endCoordinates.getY() + 1; j++){
                grid.getBattleMap()[i][j].setRestricted(true);
            }
        }
        for(Coordinates coordinates : coordinatesList){
            grid.getBattleMap()[coordinates.getX()][coordinates.getY()].setShip(ship);
        }
    }*/

}
