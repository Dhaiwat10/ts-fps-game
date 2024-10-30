import * as THREE from 'three';

export class Renderer {
    private renderer: THREE.WebGLRenderer;

    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    get domElement() {
        return this.renderer.domElement;
    }

    render(scene: THREE.Scene, camera: THREE.Camera) {
        this.renderer.render(scene, camera);
    }

    onWindowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}