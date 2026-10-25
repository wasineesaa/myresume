// สร้างลูกโลก 3 มิติ (ใบเดียวใหญ่ๆ อยู่นิ่งๆ และจะหมุนก็ต่อเมื่อเอาเมาส์ชี้แบบสโลว์ๆ)
const container = document.getElementById('globe-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// สร้างลูกโลกทรงกลมใบเดียวเด่นๆ รัศมี 8 และโปร่งแสงจางๆ สบายตา
const geometry = new THREE.SphereGeometry(8, 32, 32);
const material = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.05
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 12;

// เช็คสถานะการวางเมาส์
let isHovered = false;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;

// เมื่อเอาเมาส์เข้ามาในหน้าจอ
document.addEventListener('mouseenter', () => {
    isHovered = true;
});

// เมื่อเอาเมาส์ออกนอกหน้าจอ
document.addEventListener('mouseleave', () => {
    isHovered = false;
});

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 2000;
    mouseY = (event.clientY - window.innerHeight / 2) / 2000;
});

function animate() {
    requestAnimationFrame(animate);
    
    // ถ้าเอาเมาส์ชี้อยู่ ลูกโลกจะหมุนแบบอืด ช้า สโลว์ๆ
    if (isHovered) {
        targetRotationX += (mouseX - targetRotationX) * 0.005;
        targetRotationY += (mouseY - targetRotationY) * 0.005;

        globe.rotation.y += 0.0003 + targetRotationX;
        globe.rotation.x += targetRotationY;
    } else {
        // ถ้าไม่ได้ชี้ ให้ค่อยๆหยุดหมุนนิ่งๆ อย่างนุ่มนวล
        globe.rotation.y += (0 - globe.rotation.y) * 0.02;
        globe.rotation.x += (0 - globe.rotation.x) * 0.02;
    }

    renderer.render(scene, camera);
}
animate();

// ปรับขนาดหน้าจออัตโนมัติ
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});