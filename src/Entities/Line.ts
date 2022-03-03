import Vector2D from "../Util/Vector2D";

export interface LineOptions {
  context: CanvasRenderingContext2D;
  start: Vector2D;
  end: Vector2D;
  color?: string;
}

export default class Line {
  context: CanvasRenderingContext2D;
  start: Vector2D;
  end: Vector2D;
  color: string;

  constructor({
    context,
    color = "rgb(255, 255, 0)",
    start,
    end
  }: LineOptions) {
    this.context = context;
    this.start = start;
    this.end = end;
    this.color = color;
  }

  draw(): void {
    this.context.strokeStyle = this.color;
    this.context.beginPath();
    this.context.moveTo(this.start.getX(), this.start.getY());
    this.context.lineTo(this.end.getX(), this.end.getY());
    this.context.stroke();
  }
}
