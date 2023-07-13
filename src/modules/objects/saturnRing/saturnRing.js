import * as THREE from 'three'
import { saturn } from '../index'
const texture = new THREE.TextureLoader().load('/textures/planets/2k_saturn_ring_alpha.png')

const saturnDistance = saturn.position.x;
const saturnDiameter = 0.275;

const geometry = new THREE.RingGeometry(saturnDiameter, 5, 64);

const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
        texture: { value: texture },
        innerRadius: { value: 0.5 },
        outerRadius: { value: 0.05 }
    },
    vertexShader: `
      varying vec3 vPos;
      
      void main() {
        vPos = position;
        vec3 viewPosition = (modelViewMatrix * vec4(position, 1.)).xyz;
        gl_Position = projectionMatrix * vec4(viewPosition, 1.);
      }
    `,
    fragmentShader: `
      uniform sampler2D texture;
      uniform float innerRadius;
      uniform float outerRadius;

      varying vec3 vPos;

      vec4 color() {
        vec2 uv = vec2(0);
        uv.x = (length(vPos) - innerRadius) / (outerRadius - innerRadius);
        if (uv.x < 0.0 || uv.x > 1.0) {
          discard;
        }
        
        vec4 pixel = texture2D(texture, uv);
        return pixel;
      }

      void main() {
        gl_FragColor = color();
      }
    `,
    transparent: true
});
const saturnRing = new THREE.Mesh(geometry, material);

saturnRing.position.x = saturnDistance;
geometry.rotateX(300)

export default saturnRing