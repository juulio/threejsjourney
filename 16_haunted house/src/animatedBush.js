import * as THREE from 'three';

export default class AnimatedBush {
    constructor(particleTexture, particlesCount, particleRadius) {
        this.particleTexture = particleTexture;
        this.particlesCount = particlesCount;
        this.particleRadius = particleRadius;

        /**
         * Particles
         */
        this.particlesGeometry = new THREE.BufferGeometry()
        this.colors = new Float32Array(this.particlesCount * 3)
        this.positions = new Float32Array(this.particlesCount * 3)

        for(let i=0;i<this.particlesCount*3;i++){
            this.colors[i + 0] = Math.random() * 0.5
            this.colors[i + 1] = Math.random() * 0.5
            this.colors[i + 2] = Math.random() * 0.5
        }

        this.particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true, 
            color: '#00ff00',
            transparent: true,
            alphaMap: particleTexture,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        let theta = 0, phi = 0;

        this.particlesGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.positions, 3 ) );

        return new THREE.Points(this.particlesGeometry, this.particlesMaterial)
    }

    /**
     * Update Particles to move and create a sphere
     */
    updateParticles() {
        for (let x = 0; x < this.particlesCount * 3; x+=3) {
            theta = Math.PI*2*Math.random()
            phi =Math.PI*2*Math.random()
            positions[x] = (this.particleRadius) * Math.cos(theta) * Math.sin(phi)
            positions[x + 1] = (this.particleRadius) * Math.sin(theta) * Math.sin(phi)
            positions[x + 2] = (this.particleRadius) * Math.cos(phi)
        }
    
        this.particlesGeometry.attributes.position.array = positions;
        this.particlesGeometry.attributes.position.needsUpdate = true;
    }
}