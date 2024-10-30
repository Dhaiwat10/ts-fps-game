import { Raycaster } from "three";
import { Renderer } from "./engine/renderer";
import { Player } from "./game/player";
import { World } from "./game/world";
import { Crosshair } from "./ui/crosshair";
import { Score } from "./ui/score";

class Game {
  private renderer: Renderer;
  private player: Player;
  private world: World;
  private score: Score;

  constructor() {
    this.renderer = new Renderer();
    this.world = new World();
    this.player = new Player(this.renderer.domElement);
    new Crosshair();
    this.score = new Score();

    this.world.getScene().add(this.player.gun.getMesh());

    document.addEventListener("shoot", (e: any) => {
      this.handleShoot(e.detail.raycaster);
    });

    window.addEventListener("resize", () => {
      this.onWindowResize();
    });

    this.animate();
  }

  private handleShoot(raycaster: Raycaster) {
    console.log("LOOK IM HITTING");
    const hit = this.world.checkHit(raycaster);
    if (hit) {
      this.score.increment(100);
    }
  }

  private onWindowResize() {
    this.player.getCamera().onWindowResize();
    this.renderer.onWindowResize();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.player.update();

    this.renderer.render(
      this.world.getScene().instance,
      this.player.getCamera().instance
    );
  };
}

new Game();
