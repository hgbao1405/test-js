var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var textureLoader = new THREE.TextureLoader();
var xSlider = $('#x-slider');
var ySlider = $('#y-slider');

var canvasContainer = document.getElementById('canvas-container');
var canvas = renderer.domElement;

// Thiết lập kích thước ban đầu cho renderer và camera
function setInitialSizes() {
    var rect = canvasContainer.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
}

// Gọi hàm setInitialSizes để đặt kích thước ban đầu
setInitialSizes();

canvasContainer.appendChild(canvas); // Thêm canvas vào div
var directory = 'Images/DUCK/';

// Mảng chứa các đường dẫn đầy đủ của các tệp hình ảnh
var imagePaths = [
    //directory + 'frame_00_delay-0.04s.png',
    directory + 'frame_01_delay-0.04s.png',
    directory + 'frame_02_delay-0.04s.png',
    directory + 'frame_03_delay-0.04s.png',
    directory + 'frame_04_delay-0.04s.png',
    directory + 'frame_05_delay-0.04s.png',
    directory + 'frame_06_delay-0.04s.png',
    directory + 'frame_07_delay-0.04s.png',
    directory + 'frame_08_delay-0.04s.png',
    directory + 'frame_09_delay-0.04s.png',
    directory + 'frame_10_delay-0.04s.png',
    directory + 'frame_11_delay-0.04s.png',
    directory + 'frame_12_delay-0.04s.png',
    directory + 'frame_13_delay-0.04s.png',
    directory + 'frame_14_delay-0.04s.png'
];

var currentIndex = 0; // Index hiện tại của hình ảnh

// Tạo một plane cho mỗi hình ảnh
var plane = createPlane(imagePaths[currentIndex]);
scene.add(plane);
function updatePlaneTexture(imagePath) {
    var texture = textureLoader.load(imagePath);
    plane.material.map = texture;
    plane.material.needsUpdate = true;
}


camera.position.z = 5;

xSlider.on("input",function() {
    var rotationX = $(this).val();
    plane.rotation.x = (rotationX * Math.PI) / 180; // Chuyển đổi độ sang radian
});
ySlider.on("input",function() {
    var rotationY = $(this).val();
    plane.rotation.y = (rotationY * Math.PI) / 180; // Chuyển đổi độ sang radian
});

// Hàm thay đổi kích thước canvas và camera khi thẻ div thay đổi kích thước
function onDivResize() {
    setInitialSizes();
}

// Gắn sự kiện resize vào thẻ div
window.addEventListener('resize', onDivResize);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function createPlane(imagePath) {
    var texture = textureLoader.load(imagePath);
    var geometry = new THREE.PlaneGeometry(2, 2);     
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
}

// Hàm để chuyển đổi sang hình ảnh tiếp theo
function nextImage() {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    //$("#index").text(currentIndex);
    var nextImagePath = imagePaths[currentIndex];
    updatePlaneTexture(nextImagePath);
}

var intervalId; // Biến để lưu ID của interval

// Hàm để bắt đầu thay đổi hình ảnh liên tục
function startImageLoop(interval) {
    intervalId = setInterval(nextImage, interval);
}

// Hàm để dừng thay đổi hình ảnh liên tục
function stopImageLoop() {
    clearInterval(intervalId);
}

// Bắt đầu thay đổi hình ảnh liên tục với khoảng thời gian 2 giây (2000 milliseconds)
startImageLoop(50);
animate();
