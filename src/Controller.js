const BridgeGame = require("./BridgeGame");
const { readBridgeSize, readMoving, readGameCommand } = require("./InputView");
const { printMap, printResult, printResultMap } = require("./OutputView");

class Controller {
  #bridgeGame;
  #tryingNum;

  constructor() {
    this.#tryingNum = 1;
    this.init();
  }
  init() {
    readBridgeSize((bridgeSize)=>{
      this.#bridgeGame = new BridgeGame(Number(bridgeSize));
      this.play();
    });
  }
  play() {
    readMoving((moving) => {
      const isMatch = this.#bridgeGame.move(moving);
      this.showMap();
      this.handleBridgeGame(isMatch);
    })
  }

  showMap() {
    const map = this.#bridgeGame.result();
    printMap(map);
  }

  handleBridgeGame(isMatch){
    if(!isMatch){
      this.askReplay();
      return;
    }
    if(this.#bridgeGame.isEnd()){
      this.end(isMatch);
      return;
    }
    this.play();
  }

  askReplay(){
    readGameCommand((retry) => {
      if(retry === 'R'){
        this.#tryingNum += 1;
        this.#bridgeGame.retry();
        this.play();
        return;
      }
      this.end();
    })
  }
  end(isMatch){
    printResultMap();
    this.showMap();
    printResult(isMatch, this.#tryingNum);
  }
}

module.exports = Controller;