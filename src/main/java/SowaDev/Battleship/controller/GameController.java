package SowaDev.Battleship.controller;

import SowaDev.Battleship.Service.ShipPlacingService;
import SowaDev.Battleship.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
@SessionAttributes("player")
@RestController
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
    public Player getAttributes(@ModelAttribute("player") Player player, HttpSession httpSession){
        return player;
    }

    @GetMapping("/gridtostring")
    public String gridToString(@ModelAttribute("player") Player player){
        return player.getGrid().toString();
    }

    @PutMapping("/setname/{name}")
    public String setPlayerName(@PathVariable String name,
                                @ModelAttribute("player") Player player){
        player.setName(name);
        return player.getName();
    }

    @PutMapping
    public Player placeShip(@RequestBody ShipPlacement shipPlacement,
                          @ModelAttribute("player") Player player,
                          Model model){
        String placementResult = shipPlacingService.placeShip(player, shipPlacement);
        model.addAttribute("player", player);
        return player;
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
