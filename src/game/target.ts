import * as THREE from 'three';

export class Target {
    public mesh: THREE.Mesh;
    private isHit: boolean = false;

    constructor(position: THREE.Vector3) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 'red' });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(position);
    }

    hit() {
        if (!this.isHit) {
            this.isHit = true;
            (this.mesh.material as THREE.MeshPhongMaterial).color.set('darkred');
            // Make it fall over
            this.mesh.rotation.x = Math.PI / 2;
        }
    }

    reset() {
        this.isHit = false;
        (this.mesh.material as THREE.MeshPhongMaterial).color.set('red');
        this.mesh.rotation.x = 0;
    }
}