package SowaDev.Battleship.service;

import SowaDev.Battleship.model.*;
import SowaDev.Battleship.storage.GameStorage;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShipPlacingService {
    private final int size = 10;


    public Player createPlayer() {
        return new Player(UUID.randomUUID().toString(), createFleet(), new Grid());
    }

    public List<Ship> createFleet(){
        List<Ship> fleet = new ArrayList<>();
        fleet.add(new Ship().new AircraftCarrier());
        fleet.add(new Ship().new Battleship());
        fleet.add(new Ship().new Cruiser());
        fleet.add(new Ship().new Destroyer());
        fleet.add(new Ship().new Submarine());
        return fleet;
    }

    public PlacementResponse placeShip(Player player, ShipPlacement shipPlacement) {
        Ship ship = player.getFleet().stream().
                filter(boat -> boat.getName().equals(shipPlacement.getShipName())).findFirst()
                .orElseThrow();
        Grid grid = player.getGrid();
        String placementResult = isPossibleToPlaceShip(ship, grid, shipPlacement.getCoordinatesList());
        if(placementResult.equals("ok"))
            setSail(grid, ship, shipPlacement.getCoordinatesList());
        return new PlacementResponse(placementResult, grid);
    }

    public void setSail(Grid grid, Ship ship, List<Coordinates> coordinatesList){
        if(ship.isSetSail())
            markSquares(grid, null, ship.getPlacement());
        markSquares(grid, ship, coordinatesList);
        ship.setSetSail(true);
        ship.setPlacement(coordinatesList);
    }


    public String isPossibleToPlaceShip(Ship ship, Grid grid, List<Coordinates> coordinatesList) {
        String placementResult = "ok";
        if(ship.getLength() != coordinatesList.size())
            return "Coordinates don't match ship length. Logic error.";
        for(Coordinates coordinates : coordinatesList){
            int x = coordinates.getX(), y = coordinates.getY();
            if(x >= size || y >= size)
                return placementResult = "Out of bounds";
            else if(grid.getBattleMap()[x][y].getShip() != null){
                placementResult = "You can't place ship on top of another";
                break;
            }
            else if(grid.getBattleMap()[x][y].isRestricted())
                placementResult = "You've put a ship too close to another. There must be one square gap between ships";
        }
        return placementResult;
    }

    public Grid removeShip(Player player, String shipName){
        Ship ship = player.getFleet().stream().filter(boat -> boat.getName().equals(shipName)).findFirst().get();
        Grid grid = player.getGrid();
        markSquares(grid, null, ship.getPlacement());
        ship.setPlacement(null);
        ship.setSetSail(false);
        return grid;
    }

    public void markSquares(Grid grid, Ship ship, List<Coordinates> coordinatesList) {
        int startX = coordinatesList.get(0).getX(), startY = coordinatesList.get(0).getY(),
                endX = coordinatesList.get(coordinatesList.size() - 1).getX(),
                endY = coordinatesList.get(coordinatesList.size() - 1).getY();
        markRestrictedArea(grid, ship, startX, startY, endX, endY);
        for(Coordinates coordinates : coordinatesList){
            grid.getBattleMap()[coordinates.getX()][coordinates.getY()].setShip(ship);
        }
    }

    public void markRestrictedArea(Grid grid, Ship ship, int startX, int startY, int endX, int endY){
        for(int i = startX - 1; i <= endX + 1; i++) {
            for (int j = startY - 1; j <= endY + 1; j++) {
                if(i >= 0 && i < size && j >= 0 && j < size)
                    grid.getBattleMap()[i][j].setRestricted(ship != null);
            }
        }
    }

    public Grid putShipsAtRandom(Player player) {
        if(areAllShipsSetSail(player))
            removeAllShips(player);
        for(Ship ship : player.getFleet()){
            while(!ship.isSetSail()){
                ship.setPlacement(new ArrayList<>());
                setRandomCoordinates(ship);
                placeShip(player, new ShipPlacement(ship.getName(), ship.getPlacement()));
            }
        }
        return player.getGrid();
    }

    public void setRandomCoordinates(Ship ship){
        Random rand = new Random();
        ship.setVertical(rand.nextBoolean());
        int x = ship.isVertical() ? rand.nextInt(size - ship.getLength()) : rand.nextInt(size);
        int y = ship.isVertical() ? rand.nextInt(size) : rand.nextInt(size - ship.getLength());
        for(int i = 0; i < ship.getLength(); i++) {
            Coordinates newCoordinates = ship.isVertical() ? new Coordinates(x + i, y) : new Coordinates(x, y + i);
            ship.getPlacement().add(newCoordinates);
        }
    }

    public Grid removeAllShips(Player player){
        Grid grid = player.getGrid();
        if(!areAllShipsSetSail(player))
            return grid;
        for(Ship ship : player.getFleet()){
            markSquares(grid, null, ship.getPlacement());
            ship.setPlacement(null);
            ship.setSetSail(false);
        }
        return grid;
    }

    public boolean areAllShipsSetSail(Player player){
        for(Ship ship : player.getFleet()){
            if(!ship.isSetSail())
                return false;
        }
        return true;
    }
}
