import Game from "./game";
const initGame = (): void => {
  const game = new Game();
};
window.addEventListener("DOMContentLoaded", initGame);
// @ts-ignore
module.hot && module.hot.accept(initGame);
