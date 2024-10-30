import * as THREE from 'three';

export class Gun {
    private mesh: THREE.Group;
    private camera: THREE.Camera;
    private initialOffset: THREE.Vector3;
    private isInRecoil: boolean = false;

    constructor(camera: THREE.Camera) {
        this.camera = camera;
        this.mesh = this.createGunModel();
        // Changed X to positive to move to right side
        this.initialOffset = new THREE.Vector3(0.5, -0.6, -2);
    }

    private createGunModel(): THREE.Group {
        const gun = new THREE.Group();

        // Barrel (longer, darker part)
        const barrel = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.2, 1.8),
            new THREE.MeshPhongMaterial({ color: 0x222222 })
        );
        barrel.position.z = 0.5; // Move barrel forward
        
        // Body (shorter, grey part)
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.4, 0.8),
            new THREE.MeshPhongMaterial({ color: 0x444444 })
        );
        
        gun.add(barrel);
        gun.add(body);

        return gun;
    }

    update() {
        const offset = this.initialOffset.clone();
        if (this.isInRecoil) {
            offset.z += 0.3; // Move gun back during recoil
        }
        offset.applyQuaternion(this.camera.quaternion);
        
        this.mesh.position.copy(this.camera.position).add(offset);
        this.mesh.rotation.copy(this.camera.rotation);
    }

    getMesh() {
        return this.mesh;
    }

    shoot() {
        if (this.isInRecoil) return;
        
        this.isInRecoil = true;
        
        setTimeout(() => {
            this.isInRecoil = false;
        }, 100);
    }
}