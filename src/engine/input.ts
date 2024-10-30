import { Camera } from 'three';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

export class Input {
  private controls: PointerLockControls;
  private moveState: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
  };

  constructor(camera: Camera, domElement: HTMLElement) {
    this.controls = new PointerLockControls(camera, domElement);
    this.moveState = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };

    this.setupEventListeners();
  }

  private setupEventListeners() {
    // click to start
    document.addEventListener('click', () => {
      this.controls.lock();
    });

    // movement keys
    document.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });
    document.addEventListener('keyup', (event) => {
      this.handleKeyUp(event);
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyW':
        this.moveState.forward = true;
        break;
      case 'KeyS':
        this.moveState.backward = true;
        break;
      case 'KeyA':
        this.moveState.left = true;
        break;
      case 'KeyD':
        this.moveState.right = true;
        break;
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyW':
        this.moveState.forward = false;
        break;
      case 'KeyS':
        this.moveState.backward = false;
        break;
      case 'KeyA':
        this.moveState.left = false;
        break;
      case 'KeyD':
        this.moveState.right = false;
        break;
    }
  }

  update(moveSpeed: number) {
    if (this.controls.isLocked) {
      if (this.moveState.forward) this.controls.moveForward(moveSpeed);
      if (this.moveState.backward) this.controls.moveForward(-moveSpeed);
      if (this.moveState.left) this.controls.moveRight(-moveSpeed);
      if (this.moveState.right) this.controls.moveRight(moveSpeed);
    }
  }
}
