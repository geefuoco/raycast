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

  getRays(): Ray[] {
    return this.rays;
  }

  setPosition(vector: Vector2D): void {
    super.setPosition(vector);
    this.rays.forEach((ray) => ray.setPosition(vector));
  }

  // draw(): void {
  //   super.draw();
  //   this.rays.forEach((ray) => ray.draw());
  // }

  castTo(lines: Line[]) {
    this.rays.forEach((ray) => {
      let min = Infinity;
      let closest: Vector2D = null!;
      lines.forEach((line) => {
        const intersection = ray.cast(line);
        if (intersection) {
          const distance = Math.sqrt(
            (intersection.getX() - ray.getPosition().getX()) ** 2 +
              (intersection.getY() - ray.getPosition().getY()) ** 2
          );
          if (distance < min) {
            min = distance;
            closest = intersection;
          }
          if (closest) {
            const l = new Line({
              context: this.context,
              color: "white",
              start: this.getPosition(),
              end: closest
            });
            l.draw();
          }
        }
      });
    });
  }

  private setRays() {
    for (let i = 0; i < 360; i += 10) {
      this.rays.push(
        new Ray({
          context: this.context,
          position: this.getPosition(),
          direction: new Vector2D(Math.cos(i), Math.sin(i))
        })
      );
    }
  }
}
