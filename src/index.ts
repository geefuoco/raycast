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

  let animationId: number;
  let isRunning: boolean;

  const loop = () => {
    isRunning = true;
    context.fillStyle = "rgb(200, 100, 50)";
    context.fillRect(0, 0, canvas.width, canvas.height);
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

  window.addEventListener("keydown", togglePause);

  requestAnimationFrame(loop);
})();
