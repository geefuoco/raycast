export default class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  add(vector: Vector2D): Vector2D {
    return new Vector2D(this.x + vector.getX(), this.y + vector.getY());
  }

  subtract(vector: Vector2D): Vector2D {
    return new Vector2D(this.x - vector.getX(), this.y - vector.getY());
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vector2D {
    const magnitude = this.magnitude();
    const x = this.x / magnitude;
    const y = this.y / magnitude;
    return new Vector2D(x, y);
  }

  dot(vec: Vector2D): number {
    return this.x * vec.getX() + this.y * vec.getY();
  }
}
