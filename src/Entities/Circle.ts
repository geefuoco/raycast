import MovableShape, { MovableShapeOptions } from "./MovableShape";

export interface CircleOptions extends MovableShapeOptions {
  radius: number;
}

export default class Circle extends MovableShape {
  radius: number;

  constructor({ context, color, position, radius, velocity }: CircleOptions) {
    super({ context, color, position, velocity });
    this.radius = radius;
  }

  draw(): void {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(
      this.position.getX(),
      this.position.getY(),
      this.radius,
      0,
      360
    );
    this.context.closePath();
    this.context.fill();
  }
}
