import { Vector3, Mesh, ShaderMaterial, DoubleSide, TextureLoader, NearestFilter, Clock, SphereGeometry } from "three";

export default class Particle {
    constructor(x, y, z, radius) {
        this.pos = new Vector3(x, y, z);
        this.lifespan = 1;
        this.radius = radius;
        const geometry = new SphereGeometry( this.radius);
        this.particleMesh = new Mesh( geometry, this.shaderMaterial );
        this.clock = new Clock();
    }

    isDead() {
        return this.pos.y < 0;
    }


    update() {
        // console.log(this.vel);
        this.lifespan -= 0.1;
        // console.log(this.particleMesh.material.opacity  + " -> " + this.lifespan);
        this.particleMesh.material.opacity = this.lifespan;
        this.particleMesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    }
}
