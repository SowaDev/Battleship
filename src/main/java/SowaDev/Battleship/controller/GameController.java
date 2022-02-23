package SowaDev.Battleship.controller;

import SowaDev.Battleship.Service.ShipPlacingService;
import SowaDev.Battleship.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@SessionAttributes("player")
public class GameController {
    private final ShipPlacingService shipPlacingService;

//    @Autowired
//    private Grid grid;

    public GameController(ShipPlacingService shipPlacingService) {
        this.shipPlacingService = shipPlacingService;
    }

    @ModelAttribute("player")
    public Player getPlayer(){
        return new Player(shipPlacingService.createFleet(), new Grid());
    }

    @GetMapping
    public Player getAttributes(@ModelAttribute("player") Player player){
        return player;
    }

    @GetMapping("/gridtostring")
    public String gridToString(@ModelAttribute("player") Player player){
        return player.getGrid().toString();
    }

    @PutMapping
    public Grid placeShip(@RequestBody ShipPlacement shipPlacement, @ModelAttribute("player") Player player){
        return shipPlacingService.placeShip(player, shipPlacement);
    }

    @PutMapping("/removeShip")
    public Grid removeShip(@RequestBody int shipId, @ModelAttribute("player") Player player){
        return shipPlacingService.removeShip(player, shipId);
    }

    @PutMapping("/randomPlacement")
    public Grid putShipsAtRandom(@ModelAttribute("player") Player player){
        return shipPlacingService.putShipsAtRandom(player);
    }
}
