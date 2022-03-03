import Vector2D from "../Util/Vector2D";

export interface ShapeOptions {
  context: CanvasRenderingContext2D;
  position: Vector2D;
  color: string;
}

export interface Renderable {
  draw: () => void;
}

export interface Movable extends Renderable {
  update: () => void;
}

export default class Shape {
  context: CanvasRenderingContext2D;
  position: Vector2D;
  color: string;

  constructor({ context, position, color = "rgb(0,0,0)" }: ShapeOptions) {
    this.position = position;
    this.color = color;
    this.context = context;
  }

  getPosition(): Vector2D {
    return this.position;
  }

  getColor(): string {
    return this.color;
  }

  setPosition(position: Vector2D): void {
    this.position = position;
  }

  setColor(color: string): void {
    this.color = color;
  }
}
