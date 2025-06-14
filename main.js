const gameOptions = new Map([
      ["r", "🪨"],
      ["p", "📄"],
      ["s", "✂️"]
]);
let humanPoints = 0;
let computerPoints = 0;
const DEFAULT_FONT_SIZE = "1.6em";
const DEFAULT_FONT_SIZE_HIGHLIGHT = "4em";

function newGame() {
      const gameStatus = document.querySelector("#game-status")
      gameStatus.innerText = "Choose";
      const gameScreen = document.querySelector("#game-screen")
      gameScreen.replaceChildren();
      drawOption("r")
      drawOption("p")
      drawOption("s")
}

function drawOption(option) {
      const gameScreen = document.querySelector("#game-screen")
      const newOption = document.createElement('div')
      newOption.innerText = gameOptions.get(option);
      newOption.style.fontSize = DEFAULT_FONT_SIZE;
      newOption.style.cursor = "pointer";
      newOption.addEventListener("click", () => {
            playRound(option);
      });
      newOption.addEventListener("mouseenter", () => {
            newOption.style.fontSize = DEFAULT_FONT_SIZE_HIGHLIGHT;
      });
      newOption.addEventListener("mouseleave", () => {
            newOption.style.fontSize = DEFAULT_FONT_SIZE;
      });
      gameScreen.appendChild(newOption)
}

function playRound(playerOption) {
      const gameStatus = document.querySelector("#game-status")
      const computerOption = getComputerOption();
      let gameResult = "t"

      if (playerOption === computerOption) {
            gameStatus.innerText = "It's a tie!";
      } else if (
            (playerOption === "r" && computerOption === "s") ||
            (playerOption === "p" && computerOption === "r") ||
            (playerOption === "s" && computerOption === "p")
      ) {
            gameStatus.innerText = "You win!";
            gameResult = "w";
            updateHumanPoints();
      } else {
            gameStatus.innerText = "You lose!";
            gameResult = "l";
            updateComputerPoints();
      }

      drawGameResult(playerOption, computerOption, gameResult);

      setTimeout(() => {
            newGame();
      }, 3000);

}

function getComputerOption() {
      const options = ["r", "p", "s"];
      const randomIndex = Math.floor(Math.random() * options.length);
      return options[randomIndex];
}

function drawGameResult(playerOption, computerOption, gameResult) {
      const gameScreen = document.querySelector("#game-screen")
      gameScreen.replaceChildren();

      const playerDrawing = new Image(200);
      playerDrawing.style.transform = 'scaleX(-1)'
      if (gameResult === "w") {
            if (playerOption === "r") {
                  playerDrawing.src = "images/rw.png";
            } else if (playerOption === "p") {
                  playerDrawing.src = "images/pw.png";
            } else {
                  playerDrawing.src = "images/sw.png";
            }
      } else if (gameResult === "l" || gameResult === "t") {
            if (playerOption === "r") {
                  playerDrawing.src = "images/rl.png";
            } else if (playerOption === "p") {
                  playerDrawing.src = "images/pl.png";
            } else {
                  playerDrawing.src = "images/sl.png";
            }
      }
      gameScreen.appendChild(playerDrawing)

      const computerDrawing = new Image(200);
      if (gameResult === "l") {
            if (computerOption === "r") {
                  computerDrawing.src = "images/rw.png";
            } else if (computerOption === "p") {
                  computerDrawing.src = "images/pw.png";
            } else {
                  computerDrawing.src = "images/sw.png";
            }
      } else if (gameResult === "w" || gameResult === "t") {
            if (computerOption === "r") {
                  computerDrawing.src = "images/rl.png";
            } else if (computerOption === "p") {
                  computerDrawing.src = "images/pl.png";
            } else {
                  computerDrawing.src = "images/sl.png";
            }
      }
      gameScreen.appendChild(computerDrawing)
}

function updateHumanPoints() {
      const pts = document.querySelector("#human-points");
      humanPoints++
      pts.innerText = `You: ${humanPoints}`;
}

function updateComputerPoints() {
      const pts = document.querySelector("#computer-points");
      computerPoints++
      pts.innerText = `Bot: ${computerPoints}`;
}

newGame();