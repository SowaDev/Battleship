package SowaDev.Battleship.controller;

import SowaDev.Battleship.Service.BattleshipService;
import SowaDev.Battleship.Service.ShipPlacingService;
import SowaDev.Battleship.model.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
@SessionAttributes("player")
@RestController
public class GameController {
    private final ShipPlacingService shipPlacingService;
    private final BattleshipService battleshipService;
    private final SimpMessagingTemplate simpMessagingTemplate;

//    @Autowired
//    private Grid grid;

    public GameController(ShipPlacingService shipPlacingService, BattleshipService battleshipService, SimpMessagingTemplate simpMessagingTemplate) {
        this.shipPlacingService = shipPlacingService;
        this.battleshipService = battleshipService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @ModelAttribute("player")
    public Player getPlayer(){
        return shipPlacingService.createPlayer();
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
    public String placeShip(@RequestBody ShipPlacement shipPlacement,
                            @ModelAttribute("player") Player player){
        //        model.addAttribute("player", player);
        return shipPlacingService.placeShip(player, shipPlacement);
    }

    @DeleteMapping()
    public Grid removeShip(@RequestBody int shipId, @ModelAttribute("player") Player player){
        return shipPlacingService.removeShip(player, shipId);
    }

    @PutMapping("/randomPlacement")
    public Grid putShipsAtRandom(@ModelAttribute("player") Player player){
        return shipPlacingService.putShipsAtRandom(player);
    }

    @PostMapping("/play")
    public Game play(@ModelAttribute("player") Player player,
                     @RequestBody String name){
        return shipPlacingService.play(player, name);
    }

    @PostMapping("/shoot")
    public Game shoot(@RequestBody Coordinates coordinates,
                      @RequestBody String gameId,
                      @RequestBody String playerId){
        Game game = battleshipService.playerMove(coordinates, gameId, playerId);
        simpMessagingTemplate.convertAndSend("/topic/game-progress" + gameId, game);
        return game;
    }
}
