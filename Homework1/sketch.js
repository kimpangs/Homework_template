const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Body = Matter.Body;

let engine;
let back1, back2, back3;
let lemon;
let lemonS = [];
let mint = [];
let ice, ice2, ice3, ice4;

function setup() {
  createCanvas(700, 1200);
  //
  let cnv = createCanvas(700, 1200);
  cnv.style("width", "100%");
  cnv.style("height", "100%");
  cnv.style("max-width", "700px"); // 원본 크기보다 커지지 않게
  cnv.style("max-height", "1200px");
  cnv.style("width", "auto");
  cnv.style("height", "auto");
  cnv.style("display", "block");
  cnv.style("transform-origin", "top");
  cnv.style("transform", "scale(0.8)");
  rectMode(CENTER);
  //Matter setting
  engine = Engine.create();
  engine.gravity.y = 0.9;
  //Walls
  let margin = 10;
  // Composite.add(engine.world, [
  //   Bodies.rectangle(width / 2, height - margin, width, margin, {
  //     isStatic: true,
  //   }),
  //   Bodies.rectangle(width / 2, margin, width, margin, {
  //     isStatic: true,
  //   }),
  //   Bodies.rectangle(margin, height / 2, margin, height, {
  //     isStatic: true,
  //   }),
  //   Bodies.rectangle(width - margin, height / 2, margin, height, {
  //     isStatic: true,
  //   }),
  // ]);
  //
  let backM = 250;
  back1 = Bodies.rectangle(width / 2, height - backM / 2, 700, backM, {
    fill: color(0),
    label: "back1",
    isStatic: true,
  });
  //
  back2 = Bodies.rectangle(0, height / 2, backM, 1200, {
    fill: color(0),
    label: "back2",
    isStatic: true,
    angle: radians(-7),
  });
  //
  back3 = Bodies.rectangle(700, height / 2, backM, 1200, {
    fill: color(0),
    label: "back3",
    isStatic: true,
    angle: radians(7),
  });
  //
  Body.translate(back1, { x: 20 + 40, y: 175 });
  Body.translate(back2, { x: -130, y: 100 });
  Body.translate(back3, { x: 10 + 30, y: -50 });
  //
  Body.rotate(back1, radians(-15));
  Body.rotate(back2, radians(-15));
  Body.rotate(back3, radians(-15));
  //
  lemon = Bodies.rectangle(400, 700, 280, 350, {
    chamfer: {
      radius: [200, 40, 200, 40],
    },
    restitution: 1,
    frictionAir: 0.01,
    fill: "#fbff00",
  });
  //
  ice = Bodies.rectangle(200, 800, 100, 100, {
    chamfer: {
      radius: [10, 10, 10, 10],
    },
    restitution: 0.6,
    frictionAir: 0.01,
    fill: "#ffffff",
  });
  ice2 = Bodies.rectangle(400, 20, 150, 150, {
    chamfer: {
      radius: [15, 15, 15, 15],
    },
    restitution: 0.6,
    frictionAir: 0.01,
    fill: "#ffffff",
  });
  ice3 = Bodies.rectangle(400, 400, 200, 200, {
    chamfer: {
      radius: [20, 20, 20, 20],
    },
    restitution: 0.6,
    frictionAir: 0.01,
    fill: "#ffffff",
  });
  ice4 = Bodies.rectangle(200, 400, 300, 300, {
    chamfer: {
      radius: [40, 40, 40, 40],
    },
    restitution: 0.6,
    frictionAir: 0.01,
    fill: "#ffffff",
  });
  //
  for (let i = 0; i < 4; i++) {
    let s = Bodies.circle(100 + i * 150, 0 - i * 50, 30, {
      // 위치는 서로 겹치지 않게 x, y를 다르게
      restitution: 0.7,
      frictionAir: 0.01,
      fill: "#fbff00",
    });
    lemonS.push(s);
  }
  //
  for (let i = 0; i < 5; i++) {
    let s = Bodies.rectangle(300 + i * 50, -400 - i * 50, 230, 8, {
      // 위치는 서로 겹치지 않게 x, y를 다르게
      frictionAir: 0.06,
      fill: "#006153",
    });
    mint.push(s);
  }
  Composite.add(engine.world, [
    back1,
    back2,
    back3,
    lemon,
    ice,
    ice2,
    ice3,
    ice4,
    ...lemonS,
    ...mint,
  ]);
  //
  Body.setAngularVelocity(lemon, -0.01);
  for (let s of mint) {
    Body.setAngularVelocity(s, 1.5);
  }
}

function draw() {
  Engine.update(engine);
  background(255);
  //
  fill("#9fffe4");
  rect(width / 2, 800, 700, 800);

  drawBody(back1);
  drawBody(back2);
  drawBody(back3);
  drawStripes();
  drawBody(lemon);
  drawBody(ice);
  drawBody(ice2);
  drawBody(ice3);
  drawBody(ice4);
  for (let s of lemonS) {
    drawBody(s);
  }
  for (let s of mint) {
    drawBody(s);
  }
}

function drawBody(body) {
  fill(body.fill);
  noStroke();
  beginShape();
  for (let v of body.vertices) {
    vertex(v.x, v.y);
  }
  if (body.fill === "#ffffff") {
    fill("#ffffff95");
  }
  endShape(CLOSE);
}

// stripes는 물리엔진 body가 아니라, 초록 사각형처럼 그냥 그려지기만 하는 도형
function drawStripes() {
  let barWidth = 20;
  let barHeight = 1200;
  let count = 5;
  let gap = barWidth;

  push();
  translate(width / 2, 100); // 회전 중심점으로 이동
  rotate(radians(10)); // 원하는 각도만큼 회전

  for (let i = 0; i < count; i++) {
    let x = i * gap - ((count - 1) * gap) / 2;
    let barColor = i % 2 === 0 ? color(226, 88, 63) : color(255);

    fill(barColor);
    noStroke();
    rect(x + 50, 400, barWidth, barHeight);
  }

  pop();
}
