import MovableShape, { MovableShapeOptions } from "./MovableShape";

export interface RectangleOptions extends MovableShapeOptions {
  length: number;
  width: number;
}

export default class Rectangle extends MovableShape {
  length: number;
  width: number;

  constructor({
    context,
    color,
    position,
    velocity,
    length,
    width
  }: RectangleOptions) {
    super({ context, color, position, velocity });
    this.width = width;
    this.length = length;
  }

  getLength(): number {
    return this.length;
  }

  getWidth(): number {
    return this.width;
  }

  setLength(length: number) {
    this.length = length;
  }

  setWidth(width: number) {
    this.width = width;
  }

  draw(): void {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      this.position.getX(),
      this.position.getY(),
      this.width,
      this.length
    );
  }

  update(): void {
    this.position = this.position.add(this.velocity);
    this.draw();
  }
}
