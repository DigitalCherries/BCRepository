// JavaScript source code

//Get a reference to the stage
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");

//Add a keyboard listener
window.addEventListener("keydown", keydownHandler, false);

//The 2D array that defines the pattern
var map =
    [
        [0, 21, 0, 12, 0, 0, 0, 1],
        [24, 0, 0, 0, 21, 2, 0, 0],
        [0, 16, 0,23, 0, 0, 0, 0],
        [0, 0, 21, 0, 0, 13, 22, 0],
        [0, 0, 0, 0, 0, 0, 0, 21],
        [21, 0, 25, 0, 21, 0, 0, 0],
        [0, 0, 0, 14, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 27, 0, 0]
    ];

var gameObjects =
    [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 15, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [10, 0, 0, 0, 0, 0, 0, 0]
    ];

// Map Elements
var TRAIL = 0;      // pathway
var CAFE = 1;       // strawberry shortcakes final destination
var FLOWER1 = 2;    // Pretty flowers along the path for inspiration

// Characters
// Main character object
var PLAYER1 = {
    encouragement: 10,
    happy: true,
    energy: 10
};

PLAYER1 = 10;   // Main Character

var BADGUY = 11;    // bad guy
var FRIEND1 = 12;   // Friend 1 for encouragement
var FRIEND2 = 13;   // Friend 2 for encouragement
var FRIEND3 = 14;   // Friend 3 for encouragement
var FRIEND4 = 16;   // Friend 4 for encouragement
var BERRYKIN = 15;  // Berrykins (they make the strawberries turn from green to red);

// Snacks
var REDSTRAWBERRIES = 21; // Strawberries for energy
var SUGAR = 22; // Sugar Rush
var PIE = 24;   // Complete Pie
var MILK = 25; // milk for energy
var GREENSTRAWBERRIES = 27; // Bad Strawberries

//The size of each cell
var SIZE = 75;

//The space between each cell
var SPACE = 2;

//Display the array
const ROWS = map.length;
const COLUMNS = map[0].length;

// Character tracking
var playerRow;
var playerColumn;
var berrykinsRow;
var berrykinsColumn;


for (var row = 0; row < ROWS; row++)
{
    for (var column = 0; column < COLUMNS; column++)
    {
        if (gameObjects[row][column] === PLAYER1) // PLAYER1 is the image of the player
        { 
            playerRow = row;
            playerColumn = column;
        }
        if (gameObjects[row][column] === BERRYKIN)
        {
            berrykinsRow = row;
            berrykinsColumn = column;
        }
    }
}

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

var experience = 0; // player starts out with no experience
var energy = 10; // gain energy from landing on strawberry patches and eating strawberries and other snacks
var ingredients = 0; // Pickup ingredients along the way to bake a pie
var encouragement = 10; // gives her energy points and encouragement points
var gameMessage = "User the arrow keys to move.\nGet Energy from Berries,\nEncouragement From Friends\n But don't let the Berrykin catch you!";

render();

function keydownHandler(event)
{
    switch (event.keyCode)
    {
        case UP:
            // Move ship up one row in the gamesObjects array
            if (playerRow > 0)
            {
                // if true clear the current player cell (remove the player from the cell)
                gameObjects[playerRow][playerColumn] = 0;
                // subtract 1 from the player row to move them up one row on the map
                playerRow--;
                // apply the new updated position to the array
                gameObjects[playerRow][playerColumn] = PLAYER1;
            }
            break;

        case DOWN:
            // Move ship down
            if (playerRow < ROWS - 1)
            {
                gameObjects[playerRow][playerColumn] = 0;
                playerRow++
                gameObjects[playerRow][playerColumn] = PLAYER1;
            }
            break;

        case LEFT:
            // Move ship left
            if (playerColumn > 0)
            {
                gameObjects[playerRow][playerColumn] = 0;
                playerColumn--;
                gameObjects[playerRow][playerColumn] = PLAYER1;
            }
            break;

        case RIGHT:
            // Move ship right
            if (playerColumn < COLUMNS - 1)
            {
                gameObjects[playerRow][playerColumn] = 0;
                playerColumn++;
                gameObjects[playerRow][playerColumn] = PLAYER1;
            }
            break;
    }

    // find out what kind of cell the player is on
    switch (map[playerRow][playerColumn]) {
        case TRAIL:
            gameMessage = "Walking along the Strawberry Trail";
            break;
        case REDSTRAWBERRIES:
            console.log("Yummy Strawberry Patch");
            energize();
            break;
        case GREENSTRAWBERRIES:
            console.log("Bad Strawberry Patch");
            gameMessage = "Yuck! Don't eat the Green Strawberries<br/> -2 encouragement and -2 energy";
            yukyStrawberries();
            break;
        case FLOWER1:
            console.log("Flower Patch");
            break;
        case MILK:
            console.log("Carton of Milk");
            healthySnack();
            gameMessage = "Healthy Snack Bonus = 2 Energy, 2 Encouragement";
            break;
        case SUGAR:
            console.log("Bowl of Sugar");
            gameMessage = "Sugar Rush, gain 5 energy points";
            sugarRush();
            break;
        case FRIEND1:
        case FRIEND2:
        case FRIEND3:
        case FRIEND4:
            console.log("Friend's House");
            gameMessage = "You visit your friend and they encourage you. +5 Encouragement";
            encourage();
            break;
        case PIE:
            console.log("Pie");
            gameMessage = "Sugar Rush, gain 5 energy points";
            sugarRush();
            break;
        case FLOWER1:
            console.log("Flower Patch");
            break;
        case CAFE:
            console.log("Cafe");
            endgame();
            break;
    }

    moveBerrykins();  // Moves the Berrykin around the screen

    if (gameObjects[playerRow][playerColumn] === BERRYKIN)
    {
        endgame();
    }

    // subtract some energy and encouragement each step
    energy--;
    encouragement--;

    // Find out the player has run out of energy or encouragement
    if (energy <= 0 || encouragement <= 0) {
        endgame();
    }
    render();
}

// Lose energy from a sugar rush
function sugarRush() {
    energy += 2;
}

// Gain energy and encouragement points for eating a healthy snack
function healthySnack() {
    energy += 2;
    encouragement += 2;
}

// Lose energy from eating a green strawberry
function yukyStrawberries() {
    energy -= 2;
    encouragement -= 2;
}

// get encouragement from visiting friends
function encourage() {
    encouragement += 5;
}

function energize() {
    // Determine how many strawberries are available to pick in the strawberry patch
    var enoughStrawberries = experience + encouragement;
    var cost = Math.ceil(Math.random() * enoughStrawberries);

    // let player pick strawberries if there are enough
    if (encouragement > cost) {
        energy += enoughStrawberries;
        experience += 2;
        energy += 2;

        gameMessage = "You are able to pick " + enoughStrawberries + " Strawberries" + " for " + cost + " encouragement points."
    }
        else {
        // Tell the player if they do not have any more encouragement/motivation to continue the game
        experience += 1;
        gameMessage = "You do not have enough encouragement to pick strawberries";
    }
    console.log(gameMessage);
}

// Move the Berrykin randomly
function moveBerrykins()
{
    var UP = 1;
    var DOWN = 2;
    var LEFT = 3;
    var RIGHT = 4;

    // Array to store the valid directions that the Berrykins can move
    var validDirections = [];

    // Direction Berrykin will move
    var direction = undefined;

    if (berrykinsRow > 0) {
        var thingAbove = map[berrykinsRow - 1][berrykinsColumn];
        if (thingAbove === TRAIL || thingAbove === REDSTRAWBERRIES)
        {
            validDirections.push(UP);
        }
    }
    if (berrykinsRow < ROWS - 1)
    {
        var thingBelow = map[berrykinsRow + 1][berrykinsColumn];
        if (thingBelow === TRAIL || thingBelow === REDSTRAWBERRIES)
        {
            validDirections.push(DOWN);
        }
    }

    if (berrykinsColumn > 0)
    {
        var thingToLeft = map[berrykinsRow][berrykinsColumn - 1];
        if (thingToLeft === TRAIL || thingToLeft === REDSTRAWBERRIES)
        {
            validDirections.push(LEFT);
        }
    }

    if (berrykinsColumn < COLUMNS - 1)
    {
        var thingToRight = map[berrykinsRow][berrykinsColumn + 1];
        if (thingToRight === TRAIL || thingToRight === REDSTRAWBERRIES)
        {
            validDirections.push(RIGHT);
        }
    }

    // if valid direction is found, randomly choose one of the possible directions and assign it
    // to the directions variable

    if (validDirections.length !== 0)
    {
        var randomNumber = Math.floor(Math.random() * validDirections.length);
        direction = validDirections[randomNumber];
    }
  //Move the Berrykin in the chosen direction
    switch (direction)
    {
        case UP:
            // clear the current Berrykin cell
            gameObjects[berrykinsRow][berrykinsColumn] = 0;

            // subtract 1 from Berrykins row (since you are moving closer to 0)
            berrykinsRow--;

            // apply the Berrykins new updated position to the array
            gameObjects[berrykinsRow][berrykinsColumn] = BERRYKIN;
            break;

        case DOWN:
            gameObjects[berrykinsRow][berrykinsColumn] = 0;
            berrykinsRow++;
            gameObjects[berrykinsRow][berrykinsColumn] = BERRYKIN;
            break;

        case LEFT:
            gameObjects[berrykinsRow][berrykinsColumn] = 0;
            berrykinsColumn--;
            gameObjects[berrykinsRow][berrykinsColumn] = BERRYKIN;
            break;

        case RIGHT:
            gameObjects[berrykinsRow][berrykinsColumn] = 0;
            berrykinsColumn++;
            gameObjects[berrykinsRow][berrykinsColumn] = BERRYKIN;
    }
}

function badBerries() {
    if (gameObjects[berrykinsRow][berrykinsColumn] === REDSTRAWBERRIES) {

    }
}

function endgame() {
    if (map[playerRow][playerColumn] === CAFE)
    {
        // Calculate Score
        var score = encouragement + energy + experience - 2; // -2 to account for the winning square

        // Display the score in game message
        gameMessage = "Yeah! you made it to the Cafe with all the ingredients! Way to Go!\nYour Final Score: " + score;
    }
    else if (gameObjects[playerRow][playerColumn] === BERRYKIN)
    {
        gameMessage = "The Berrykins have turned you into a Strawberry";
        window.alert("Oh no! The Berrykins have turned you into a Strawberry");
    }
    else {
        if (encouragement <= 0) {
            gameMessage += " You've run out of encouragement and given up";
        }
        else {
            gameMessage += " You have run out of energy and need to take a nap";
        }
        gameMessage += "Hit F5 to restart the game and try again";
    }
        //Remove the keyboard listener to end the game
        window.removeEventListener("keydown", keydownHandler, false);
}

function render()
{
    // clear stage of image tag cells
    if (stage.hasChildNodes())
    {
        for (var i = 0; i < ROWS * COLUMNS; i++) {
            stage.removeChild(stage.firstChild);
        }
    }

    // Render the game by looping through the map arrays
    for (var row = 0; row < ROWS; row++)
    {
        for (var column = 0; column < COLUMNS; column++) {

            // create an image tag called "cell"
            var cell = document.createElement("img");

            //set its CSS class to "cell"
            cell.setAttribute("class", "cell");

            // Add the image tag to the stage tag
            stage.appendChild(cell);

            // check the number in the cell and match it with the designated image
            switch (map[row][column]) {
                case PIE:
                    cell.src = "images/pie75x75.jpg";
                    break;
                case REDSTRAWBERRIES:
                    cell.src = "images/strawberry75x75.png";
                    break;
                case GREENSTRAWBERRIES:
                    cell.src = "images/greenStrawberry75x75.png";
                    break;
                case SUGAR:
                    cell.src = "images/sugar75x75.png";
                    break;
                case MILK:
                    cell.src = "images/milk-carton75x75.png";
                    break;
                case BADGUY:
                    cell.src = "images/purplepieman75x75.png";
                    break;
                case CAFE:
                    cell.src = "images/Cafe50x50.jpg";
                    break;
                case FRIEND1:
                    cell.src = "images/blueberry.png";
                    break;
                case FRIEND2:
                    cell.src = "images/lemondrop.png";
                    break;
                case FRIEND3:
                    cell.src = "images/pepermint.png";
                    break;
                case FRIEND4:
                    cell.src = "images/starburst.png";
                    break;
                case FLOWER1:
                    cell.src = "images/flower1_75x75.png";
                    break;
            }
            // Add game objects player and Berrykin
            switch (gameObjects[row][column])
            {
                case PLAYER1:
                    if (energy <= 0)
                    {
                        cell.src = "images/strawberry_shortcake_sleeping.png";
                    }
                    else if (encouragement <= 0)
                    {
                        cell.src = "images/strawberry_shortcake_sad.png";
                    }
                    else if (gameObjects[0][7]) {
                        cell.src = "images/strawberry_shortcake_winner.png";
                        // place winning screen here
                    }
                    else if (gameObjects[playerRow][playerColumn] === GREENSTRAWBERRIES) {
                        cell.src = "images/strawberry_shortcake_sad.png";
                    }
                    else
                    {
                        cell.src = "images/strawberry_shortcake.png";
                    }
                    break;

                case BERRYKIN:
                    cell.src = ("images/Berrykin.png");
                    break;
            }

            //Position the cell in the correct place
            //with 2 pixels of space around it
            cell.style.top = row * (SIZE + SPACE) + "px";  // Note that top and left are "positioning attributes" in this case
            cell.style.left = column * (SIZE + SPACE) + "px"; // this is different from say, padding-left, or top

        } // end render inner loop
    }// end render outer loop
    //Display the game message
    output.innerHTML = gameMessage;

    //Display the player's Engergy, Encouragement, and Experience
    encouragementScore.innerHTML = "Encouragement: " + encouragement;
    energyScore.innerHTML = "Energy: " + energy;
    experienceScore.innerHTML = "Experience: " + experience;

} // end render function




