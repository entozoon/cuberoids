import Game from "./lib/game";
const initGame = (): void => {
  const wrapper = document.querySelector(".game-wrapper") as HTMLElement;
  const game = new Game({ wrapper });
};
window.addEventListener("DOMContentLoaded", initGame);
// @ts-ignore
module.hot && module.hot.accept(initGame);
