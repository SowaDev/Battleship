package SowaDev.Battleship.controller;

import SowaDev.Battleship.Service.ShipPlacingService;
import SowaDev.Battleship.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class GameController {
    private final ShipPlacingService shipPlacingService;

//    @Autowired
//    private Grid grid;

    public GameController(ShipPlacingService shipPlacingService) {
        this.shipPlacingService = shipPlacingService;
    }

    @GetMapping
    public Player getAttributes(HttpSession httpSession){
        Player player = (Player) httpSession.getAttribute("player");
        if(httpSession.getAttribute("player") == null) {
            player = new Player("player", shipPlacingService.createFleet(), new Grid());
            httpSession.setAttribute("player", player);
        }
        return player;
    }

    @GetMapping("/checkgrid")
    public Grid getGridFromSession(HttpSession httpSession){
        Player player = (Player) httpSession.getAttribute("player");
        return player.getGrid();
    }

    @GetMapping("/gridtostring")
    public String gridToString(HttpSession httpSession){
        Player player = (Player) httpSession.getAttribute("player");
        System.out.println(player.getGrid().toString());
        return player.getGrid().toString();
    }

    @PutMapping
    public Grid placeShip(@RequestBody ShipPlacement shipPlacement, HttpSession httpSession){
        Player player = (Player) httpSession.getAttribute("player");
        return shipPlacingService.placeShip(player, shipPlacement);
    }

    @PutMapping("/removeShip")
    public Grid removeShip(@RequestBody int shipId, HttpSession httpSession){
        Player player = (Player) httpSession.getAttribute("player");
        return shipPlacingService.removeShip(player, shipId);
    }
}
