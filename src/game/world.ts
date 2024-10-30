import * as THREE from "three";
import { Scene } from "../engine/scene";
import { Target } from "./target";

export class World {
  private scene: Scene;
  private targets: Target[] = [];

  constructor() {
    this.scene = new Scene();
    this.createFloor();
    this.createTargets();
  }

  private createFloor() {
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: "gray" });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    this.scene.add(floor);
  }

  private createTargets() {
    const targetPositions = [
      new THREE.Vector3(0, 1, -5),
      new THREE.Vector3(-3, 1, -5),
      new THREE.Vector3(3, 1, -5),
      new THREE.Vector3(-2, 1, -7),
      new THREE.Vector3(2, 1, -7),
    ];

    targetPositions.forEach((position) => {
      const target = new Target(position);
      this.targets.push(target);
      this.scene.add(target.mesh);
    });
  }

  getScene() {
    return this.scene;
  }

  /**
   * Check target hit and prevent duplicate scoring
   * Only increment score for targets that haven't been hit before
   */
  checkHit(raycaster: THREE.Raycaster): boolean {
    const targetMeshes = this.targets.map((target) => target.mesh);
    const intersects = raycaster.intersectObjects(targetMeshes);

    if (intersects.length <= 0) return false;

    const hitTarget = this.targets.find(
      (target) => target.mesh === intersects[0].object
    );

    if (!hitTarget || hitTarget.getIsHit()) return false;

    hitTarget.hit();
    return true;
  }
}
