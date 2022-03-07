import Vector2D from "./Util/Vector2D";
import Line from "./Entities/Line";
import Player from "./Entities/Player";
import Circle from "./Entities/Circle";
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
  let drawMode = false;
  let drawModeCircle: Circle | null;
  let newLine: Line | null = null;
  let player: Player;
  const lines: Line[] = [];
  const numberOfLines = 6;

  const getVectorWithinBounds = (): Vector2D => {
    const maxX = canvas.width;
    const maxY = canvas.height;

    let x: number, y: number, diff: number;

    x = Math.random() * maxX;
    y = Math.random() * maxY;
    diff = Math.abs(x - y);
    while (x === y || diff < 10) {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      diff = Math.abs(x - y);
    }
    return new Vector2D(x, y);
  };

  const createAssets = () => {
    player = new Player({
      context,
      color: "rgb(100, 100, 100)",
      position: new Vector2D(canvas.width / 2, canvas.height / 2),
      velocity: new Vector2D(0, 0),
      radius: 5
    });

    for (let i = 0; i < numberOfLines; i++) {
      lines.push(
        new Line({
          context,
          color: "white",
          start: getVectorWithinBounds(),
          end: getVectorWithinBounds()
        })
      );
    }
  };

  createAssets();

  const loop = () => {
    isRunning = true;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (player && lines.length > 0) {
      lines.forEach((line) => {
        line.draw();
      });
      player.update();
      player.castTo(lines);
    }
    if (drawModeCircle) {
      drawModeCircle.draw();
    }

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
        drawMode = false;
      }
    }
  };

  const toggleDraw = (ev: KeyboardEvent) => {
    if (ev.key === "D" || ev.key === "d") {
      drawMode = !drawMode;
      if (drawMode) {
        window.removeEventListener("mousemove", updatePlayer);
      } else {
        drawModeCircle = null;
        window.addEventListener("mousemove", updatePlayer);
      }
    }
  };

  const updatePlayer = (ev: MouseEvent) => {
    if (player) {
      player.setPosition(
        new Vector2D(ev.clientX + offsetX, ev.clientY + offsetY)
      );
    }
  };

  const drawLine = (ev: MouseEvent) => {
    console.log(ev.button);
    if (!drawMode) return;
    drawModeCircle = new Circle({
      context,
      color: "red",
      position: new Vector2D(ev.clientX + offsetX, ev.clientY + offsetY),
      radius: 5,
      velocity: new Vector2D(0, 0)
    });
    if (newLine) {
      newLine.setEnd(new Vector2D(ev.clientX + offsetX, ev.clientY + offsetY));
      lines.push(newLine);
      newLine = null;
    } else {
      newLine = new Line({
        context,
        color: "white",
        start: new Vector2D(ev.clientX + offsetX, ev.clientY + offsetY),
        end: new Vector2D(ev.clientX + offsetX, ev.clientY + offsetY)
      });
    }
  };

  window.addEventListener("mousedown", drawLine);
  window.addEventListener("mousemove", updatePlayer);
  window.addEventListener("keydown", togglePause);
  window.addEventListener("keydown", toggleDraw);

  requestAnimationFrame(loop);
})();
