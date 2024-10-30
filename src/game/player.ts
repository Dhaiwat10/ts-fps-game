import { Raycaster, Vector2 } from 'three';
import { Camera } from '../engine/camera';
import { Input } from '../engine/input';
import { Gun } from './gun'

export class Player {
  private camera: Camera;
  private input: Input;
  private moveSpeed: number = 0.1;
  private raycaster: Raycaster;
  public gun: Gun;

  constructor(domElement: HTMLElement) {
    this.camera = new Camera();
    this.input = new Input(this.camera.instance, domElement);
    this.raycaster = new Raycaster();
    this.gun = new Gun(this.camera.instance);

    document.addEventListener('click', () => this.shoot());
  }

  update() {
    this.input.update(this.moveSpeed);
    this.gun.update();
  }

  getCamera() {
    return this.camera;
  }

  shoot() {
    this.gun.shoot();
    this.raycaster.setFromCamera(new Vector2(0, 0), this.camera.instance);

    const event = new CustomEvent('shoot', {
      detail: {
        raycaster: this.raycaster,
      },
    });
    document.dispatchEvent(event);
  }
}
