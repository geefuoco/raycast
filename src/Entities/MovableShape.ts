import Vector2D from "../Util/Vector2D";
import Shape, { ShapeOptions, Movable } from "./Shape";

export interface MovableShapeOptions extends ShapeOptions {
  velocity: Vector2D;
}

export default abstract class MovableShape extends Shape implements Movable {
  velocity: Vector2D;

  constructor({ context, color, position, velocity }: MovableShapeOptions) {
    super({ context, position, color });
    this.velocity = velocity;
  }

  getVelocity(): Vector2D {
    return this.velocity;
  }

  setVelocity(velocity: Vector2D): void {
    this.velocity = velocity;
  }

  abstract draw(): void;

  update(): void {
    this.position = this.position.add(this.velocity);
    this.draw();
  }
}
