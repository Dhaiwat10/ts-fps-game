import * as THREE from 'three';

export class Camera {
    private camera: THREE.PerspectiveCamera;

    constructor() {
        this.camera = new THREE.PerspectiveCamera(
            75, // FOV
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );
        this.camera.position.set(0, 2, 5); // Start position
    }

    get instance() {
        return this.camera;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    setPosition(x: number, y: number, z: number) {
        this.camera.position.set(x, y, z);
    }

    getPosition() {
        return this.camera.position;
    }
}