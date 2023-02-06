package SowaDev.Battleship.controller;

import SowaDev.Battleship.service.ShipPlacingService;
import SowaDev.Battleship.model.*;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@SessionAttributes("player")
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class GameController {
    private final ShipPlacingService shipPlacingService;

    public GameController(ShipPlacingService shipPlacingService) {
        this.shipPlacingService = shipPlacingService;
    }

    @ModelAttribute("player")
    public Player getPlayer(){
        return shipPlacingService.createPlayer();
    }

    @GetMapping
    public Player getAttributes(@ModelAttribute("player") Player player, HttpSession httpSession){
        return player;
    }

    @PutMapping
    public PlacementResponse placeShip(@RequestBody ShipPlacement shipPlacement,
                            @ModelAttribute("player") Player player){
        return shipPlacingService.placeShip(player, shipPlacement);
    }

    @DeleteMapping()
    public Grid removeShip(@RequestBody String shipName, @ModelAttribute("player") Player player){
        return shipPlacingService.removeShip(player, shipName);
    }

    @PutMapping("/randomPlacement")
    public Grid putShipsAtRandom(@ModelAttribute("player") Player player){
        return shipPlacingService.putShipsAtRandom(player);
    }

    @PutMapping("/removeShips")
    public Grid removeAllShips(@ModelAttribute("player") Player player){
        return shipPlacingService.removeAllShips(player);
    }

    @PostMapping("/username")
    public Player setUsername(@ModelAttribute("player") Player player, @RequestBody String name){
        player.setName(name);
        return player;
    }

}
