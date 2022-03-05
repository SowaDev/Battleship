package SowaDev.Battleship.service;

import SowaDev.Battleship.model.*;
import SowaDev.Battleship.storage.GameStorage;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShipPlacingService {
    private final int size = 10;

    public Game createGame(Player player) {
        Game game = new Game(UUID.randomUUID().toString(), player, null, GameStatus.NEW);
        GameStorage.getInstance().setGame(game);
        return game;
    }

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

    public String placeShip(Player player, ShipPlacement shipPlacement) {
        Ship ship = player.getFleet().get(shipPlacement.getShipId());
        Grid grid = player.getGrid();
        String placementResult = isPossibleToPlaceShip(ship, grid, shipPlacement.getCoordinatesList());
        if(placementResult.equals("ok")) {
            if(ship.isSetSail())
                markSquares(grid, null, ship.getPlacement(), true);
            markSquares(grid, ship, shipPlacement.getCoordinatesList(), false);
            ship.setSetSail(true);
            ship.setPlacement(shipPlacement.getCoordinatesList());
        }
        return placementResult;
    }


    public String isPossibleToPlaceShip(Ship ship, Grid grid, List<Coordinates> coordinatesList) {
        String placementResult = "ok";
        if(ship.getLength() != coordinatesList.size())
            placementResult = "Coordinates don't match ship length. Logic error.";
        for(Coordinates coordinates : coordinatesList){
            int x = coordinates.getX(), y = coordinates.getY();
            if(x >= 10 || y >= 10)
                placementResult = "Out of bounds";
            else if(grid.getBattleMap()[x][y].getShip() != null)
                placementResult = "You can't place ship on top of another";
            else if(grid.getBattleMap()[x][y].isRestricted())
                placementResult = "You've put a ship too close to another. There must be one square gap between ships";
        }
        return placementResult;
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
        int startX = coordinatesList.get(0).getX(), startY = coordinatesList.get(0).getY(),
                endX = coordinatesList.get(coordinatesList.size() - 1).getX(),
                endY = coordinatesList.get(coordinatesList.size() - 1).getY();
        for(int i = startX - 1; i <= endX + 1; i++) {
            for (int j = startY - 1; j <= endY + 1; j++) {
                if(i >= 0 && i < 10 && j >= 0 && j < 10)
                    grid.getBattleMap()[i][j].setRestricted(!isBeingRemoved);
            }
        }
        for(Coordinates coordinates : coordinatesList){
            grid.getBattleMap()[coordinates.getX()][coordinates.getY()].setShip(ship);
        }
    }

    public boolean areAllShipsSetSail(Player player){
        for(Ship ship : player.getFleet()){
            if(!ship.isSetSail())
                return false;
        }
        return true;
    }

    public Grid putShipsAtRandom(Player player) {
        Random rand = new Random();
        for(Ship ship : player.getFleet()){
            while(!ship.isSetSail()){
                ship.setPlacement(new ArrayList<>());
                ship.setVertical(rand.nextBoolean());
                int x = ship.isVertical() ? rand.nextInt(10 - ship.getLength()) : rand.nextInt(10);
                int y = ship.isVertical() ? rand.nextInt(10) : rand.nextInt(10 - ship.getLength());
                for(int i = 0; i < ship.getLength(); i++) {
                    Coordinates newCoordinates = ship.isVertical() ? new Coordinates(x + i, y) : new Coordinates(x, y + i);
                    ship.getPlacement().add(newCoordinates);
                }
                placeShip(player, new ShipPlacement(player.getFleet().indexOf(ship), ship.getPlacement()));
            }
        }
        return player.getGrid();
    }

    public Game play(Player player, String name) {
        player.setName(name);
        if(!areAllShipsSetSail(player))
            throw new IllegalStateException("You didn't put out all of the ships");
        Optional<Game> optionalGame = GameStorage.getInstance().getGames().values().stream()
                .filter(g -> g.getGameStatus().equals(GameStatus.NEW))
                .findFirst();
        Game game;
        if(optionalGame.isPresent()) {
            game = optionalGame.get();
            game.setPlayer2(player);
            game.setGameStatus(GameStatus.IN_PROGRESS);
            game.setPlayerTurn(setRandomStarter(game.getPlayer1().getPlayerId(), game.getPlayer2().getPlayerId()));
        } else
            game = createGame(player);
        return game;
    }

    private String setRandomStarter(String player1Id, String player2Id) {
        Random rand = new Random();
        int r = rand.nextInt(2);
        return r == 0 ? player1Id : player2Id;
    }

}
