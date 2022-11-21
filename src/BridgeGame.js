const Bridge = require("./Bridge");
const { makeBridge } = require("./BridgeMaker");
const BridgeMap = require("./BridgeMap");
const { generate } = require("./BridgeRandomNumberGenerator");
/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;
  #bridgeMap;
  #step;


  constructor(bridgeSize){
    this.#bridge = new Bridge(makeBridge(bridgeSize, generate));
    this.#bridgeMap = new BridgeMap();
    this.#step = -1;
  }
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(moving) {
    this.#step += 1;
    const isMatch = this.#bridge.matchMoveBridge(moving, this.#step);
    this.#bridgeMap(isMatch);
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {}
}

module.exports = BridgeGame;
