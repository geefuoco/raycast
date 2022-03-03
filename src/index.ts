import Circle from "./Entities/Circle";
import MovableShape from "./Entities/MovableShape";
import Vector2D from "./Util/Vector2D";
import Line from "./Entities/Line";
(() => {
  const canvas: HTMLCanvasElement | null = document.querySelector("#canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) {
    alert("Your browser does not support HTML Canvas");
    return;
  }

  canvas.width = 1000;
  canvas.height = 600;

  const offsetX = (canvas.width - window.innerWidth) / 2;
  const offsetY = (canvas.height - window.innerHeight) / 2;

  let animationId: number;
  let isRunning: boolean;
  let player: MovableShape;
  let line: Line;
  const createAssets = () => {
    player = new Circle({
      context,
      color: "rgb(100, 100, 100)",
      position: new Vector2D(canvas.width / 2, canvas.height / 2),
      velocity: new Vector2D(0, 0),
      radius: 30
    });

    //render a line / make a raycast class
  };

  createAssets();

  const loop = () => {
    isRunning = true;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    line.draw();

    animationId = requestAnimationFrame(loop);
  };

  const cancel = () => {
    if (isRunning) {
      isRunning = false;
      cancelAnimationFrame(animationId);
    }
  };

  const togglePause = (ev: KeyboardEvent) => {
    if (ev.key === "P" || ev.key === "p") {
      if (isRunning) {
        cancel();
      } else {
        requestAnimationFrame(loop);
      }
    }
  };

  const updatePlayer = (ev: MouseEvent) => {
    if (!player) return;
    player.setPosition(
      new Vector2D(ev.clientX + offsetX, ev.clientY + offsetY)
    );
  };

  window.addEventListener("mousemove", updatePlayer);
  window.addEventListener("keydown", togglePause);

  requestAnimationFrame(loop);
})();
