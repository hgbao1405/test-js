var elem = document.getElementById("atoms");
if (elem !== null) {
    // Kiểm tra xem phần tử tồn tại trước khi truy cập thuộc tính style
    elem.style.color = 'red';
} else {
    console.error("Element with ID 'yourElementId' not found.");
}
var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;
var parsedData = {
    circles: [
        {
            x: 100, y: 100, radius: 50, fill: 'red', stroke: 'black', linewidth: 5,
            content: [
                {
                    text: "Hello",fill: "yellow",x:100,y:100,size:12
                },
                {
                    text: "Hello2",fill: "yellow",x:100,y:130,size:14
                },
            ]
        },
        { x: 200, y: 200, radius: 70, fill: 'blue', stroke: 'green', linewidth: 3,
        content: [
            {
                text: "Hello",fill: "yellow",x:200,y:200,size:12
            },
            {
                text: "Hello2",fill: "yellow",x:200,y:230,size:14
            },
        ]
        }
    ],
    rectangles: [
        { x: 300, y: 300, width: 100, height: 80, fill: 'yellow', stroke: 'purple', linewidth: 2 }
    ]
};

var elementNames = [
  "",
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium",
  "Boron",
  "Carbon",
  "Nitrogen",
  "Oxygen",
  "Fluorine",
  "Neon"
];

var styles = {
  alignment: "center",
  size: 36,
  family: "Lato"
};

var nucleusCount = 10;
var nucleusArray = Array();

var electronCount = 10;
var electronArray = Array();

function intRange(min, max) {
  return Math.random() * (max - min) + min;
}

var two = new Two({ fullscreen: true }).appendTo(elem);

// Vẽ các hình tròn từ dữ liệu
parsedData.circles.forEach(function(circleData) {
    var circle = two.makeCircle(circleData.x, circleData.y, circleData.radius);
    circle.fill = circleData.fill;
    circle.stroke = circleData.stroke;
    circle.linewidth = circleData.linewidth;
    
    // Thêm văn bản vào hình tròn
    circleData.content.forEach(function(content){
        var text = two.makeText(content.text, content.x, content.y);
        text.size = content.size;
        text.fill=content.fill;
    })
});

var protonColor = two.makeRadialGradient(
  0,
  0,
  15,
  new Two.Stop(0, "red", 1),
  new Two.Stop(1, "black", 1)
);

var neutronColor = two.makeRadialGradient(
  0,
  0,
  15,
  new Two.Stop(0, "blue", 1),
  new Two.Stop(1, "black", 1)
);

for (i = 0; i < nucleusCount; i++) {
  nucleusArray.push(two.makeCircle(intRange(-10, 10), intRange(-10, 10), 8));
}

nucleusArray.forEach(function(nucleus, index) {
  if (index % 2 == 0) {
    nucleus.fill = protonColor;
  }
  if (index % 2 == 1) {
    nucleus.fill = neutronColor;
  }
  nucleus.noStroke();
});

for (var i = 0; i < 10; i++) {
  if (i < 2) {
    var shellRadius = 50;
    var angle = i * Math.PI;
    electronArray.push(
      two.makeCircle(
        Math.cos(angle) * shellRadius,
        Math.sin(angle) * shellRadius,
        5
      )
    );
  }
  if (i >= 2 && i < 10) {
    var shellRadius = 80;
    var angle = (i - 2) * Math.PI / 4;
    electronArray.push(
      two.makeCircle(
        Math.cos(angle) * shellRadius,
        Math.sin(angle) * shellRadius,
        5
      )
    );
  }
}

var orbitA = two.makeCircle(centerX, centerY, 50);
orbitA.fill = "transparent";
orbitA.linewidth = 2;
orbitA.stroke = "rgba(0, 0, 0, 0.1)";

var orbitB = two.makeCircle(centerX, centerY, 80);
orbitB.fill = "transparent";
orbitB.linewidth = 2;
orbitB.stroke = "rgba(0, 0, 0, 0.1)";

var groupElectronA = two.makeGroup(electronArray.slice(0, 2));
groupElectronA.translation.set(centerX, centerY);
groupElectronA.fill = "orange";
groupElectronA.linewidth = 1;

var groupElectronB = two.makeGroup(electronArray.slice(2, 10));
groupElectronB.translation.set(centerX, centerY);
groupElectronB.fill = "yellow";
groupElectronB.linewidth = 1;

var groupNucleus = two.makeGroup(nucleusArray);
groupNucleus.translation.set(centerX, centerY);

two
  .bind("update", function(frameCount) {
    groupElectronA.rotation += 0.025 * Math.PI;
    groupElectronB.rotation += 0.005 * Math.PI;
    groupNucleus.rotation -= 0.05;
  })
  .play();

var text = two.makeText("", centerX, 100, styles);

nucleusArray.forEach(function(nucleus, index) {
  nucleus.opacity = 0;
});

electronArray.forEach(function(electron, index) {
  electron.opacity = 0;
});

visible = 0;

document.addEventListener("click", function(event) {
  if (visible < nucleusArray.length) {
    nucleusArray[visible].opacity = 1;
    electronArray[visible].opacity = 1;
    visible++;
    text.value = elementNames[visible];
  }
  else {
    nucleusArray.forEach(el => el.opacity=0);
    electronArray.forEach(el => el.opacity=0);
    visible = 0;
    text.value = elementNames[0];
  }
});         