import Vector2D from "../Util/Vector2D";
import Circle, { CircleOptions } from "./Circle";
import Line from "./Line";
import Ray from "./Ray";

export default class Player extends Circle {
  rays: Ray[];
  constructor({ context, color, position, radius, velocity }: CircleOptions) {
    super({ context, color, position, radius, velocity });
    this.rays = [];
    this.setRays();
  }

  draw(): void {
    this.rays.forEach((ray) => ray.draw());
  }

  getRays(): Ray[] {
    return this.rays;
  }

  setPosition(vector: Vector2D): void {
    super.setPosition(vector);
    this.rays.forEach((ray) => ray.setPosition(vector));
  }

  castTo(lines: Line[]) {
    this.rays.forEach((ray) => {
      let record = Infinity;
      let closest: Vector2D = null!;
      lines.forEach((line) => {
        const intersection = ray.cast(line);
        if (intersection) {
          const diffX = intersection.getX() - this.getPosition().getX();
          const diffY = intersection.getY() - this.getPosition().getY();
          const distance = Math.hypot(diffX, diffY);
          if (distance < record) {
            record = distance;
            closest = intersection;
          }
        }
      });
      if (closest) {
        const l = new Line({
          context: this.context,
          color: "green",
          start: ray.getPosition(),
          end: closest
        });
        l.draw();
      }
    });
  }

  private setRays() {
    for (let i = 0; i < 360; i += 10) {
      const rad = i * (Math.PI / 180);
      this.rays.push(
        new Ray({
          context: this.context,
          position: this.position,
          direction: new Vector2D(Math.cos(rad), Math.sin(rad))
        })
      );
    }
  }
}
