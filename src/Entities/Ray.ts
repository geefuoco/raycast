import Vector2D from "../Util/Vector2D";
import Line from "./Line";

export interface RayOptions {
  context: CanvasRenderingContext2D;
  position: Vector2D;
  direction: Vector2D;
}

export default class Ray {
  context: CanvasRenderingContext2D;
  position: Vector2D;
  direction: Vector2D;

  constructor({ context, position, direction }: RayOptions) {
    this.context = context;
    this.position = position;
    this.direction = direction;
  }

  getDirection(): Vector2D {
    return this.direction;
  }

  getPosition(): Vector2D {
    return this.position;
  }

  setDirection(vector: Vector2D): void {
    this.direction = vector.subtract(this.position);
    this.direction.normalize();
  }

  setPosition(vector: Vector2D): void {
    this.position = vector;
  }

  draw() {
    this.context.strokeStyle = "white";
    this.context.save();
    this.context.beginPath();
    this.context.translate(this.position.getX(), this.position.getY());
    this.context.moveTo(0, 0);
    this.context.lineTo(this.direction.getX() * 10, this.direction.getY() * 10);
    this.context.stroke();
    this.context.restore();
  }

  cast(line: Line): Vector2D | null {
    const x1 = line.getStart().getX();
    const y1 = line.getStart().getY();
    const x2 = line.getEnd().getX();
    const y2 = line.getEnd().getY();
    const x3 = this.getPosition().getX();
    const y3 = this.getPosition().getX();
    const x4 = x3 + this.getDirection().getX();
    const y4 = y3 + this.getDirection().getY();
    //num = (x1-x3)(y3-y4) - (y1-y3)(x3-x4)
    //den = (x1 - x2)(y3-y4) - (y1-y2)(x3-x4)
    // where t = num/den

    const denomenator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denomenator === 0) {
      return null;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denomenator;
    const u = ((x1 - x3) * (y3 - y2) - (y1 - y3) * (x3 - x2)) / denomenator;

    if (t > 0 && t < 1 && u > 0) {
      const x = x1 + t * (x2 - x1);
      const y = y1 + t * (y2 - y1);

      return new Vector2D(x, y);
    }
    return null;
  }
}
