import Game from "./game";
const initGame = (): void => {
  new Game();
};
window.addEventListener("DOMContentLoaded", initGame);
// @ts-ignore
module.hot &&
  // @ts-ignore
  module.hot.accept(() => {
    initGame();
    // More brutal
    // window.location.reload();
  });
