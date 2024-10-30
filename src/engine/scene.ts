import * as THREE from 'three';

export class Scene {
    private scene: THREE.Scene;

    constructor() {
        this.scene = new THREE.Scene();
        this.setupSky();
        
        // Add lighting
        const light = new THREE.DirectionalLight('white', 1);
        light.position.set(1, 1, 1);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0x404040));
    }

    private setupSky() {
        // Create a gradient texture
        const topColor = new THREE.Color(0x0077ff);  // Blue
        const bottomColor = new THREE.Color(0xffffff);  // White

        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 2;
        
        const context = canvas.getContext('2d');
        if (!context) return;

        const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, topColor.getStyle());
        gradient.addColorStop(1, bottomColor.getStyle());

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const texture = new THREE.CanvasTexture(canvas);
        this.scene.background = texture;
    }

    add(object: THREE.Object3D) {
        this.scene.add(object);
    }

    remove(object: THREE.Object3D) {
        this.scene.remove(object);
    }

    get instance() {
        return this.scene;
    }
}