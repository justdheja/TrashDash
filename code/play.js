import kaboom from "kaboom";
import * as db from "./data";

export function run(configuration) {
  // Speed Variable
  const MOVE_SPEED = configuration.speed*25;
  const MAX_WEIGHT = configuration.maxWeight;
  const TIMER = 60;
  let currentSpeed = MOVE_SPEED;
  let canMove = true;

  const music = play("soundtrack3", {
      volume: 0.5,
      loop: true
  })
  
// objects
  const map = addLevel([
    "                                ",
    "                                ",
    "=================================",
    "=   b       b       rssssr      =",
    "=  brrrrrrrrrrrrrrrrr  b r      =",
    "=       r           rrrrrrrr    =",
    "=  b r  rrrrr              r    =",
    "=    r    r                r    =",
    "=    r  b r      b        br    =",
    "=  b r    rb    r               =",
    "= rrrrrrrrrrrrrrrrr             =",
    "=              rj r     b       =",
    "=              r  rrrrrrr       =",
    "=    b         r  r             =",
    "=   rrrrrrrrrrrr  rrrrrrrrrrrrrr=",
    "=         b rrrrrrrrr   b       =",
    "=           r       rrrrrrrrrrrr=",
    "=           r       r      c    =",
    "=  b        rb      rrrrrrrrr   =",
    "=rrrrrrrrrrrr       r           =",
    "=           rrrrrrrrr           =",
    "=           r       r           =",
    "================================"
  ], {
    pos: vec2(20, 0),
    width: 32,
    height: 32,
    "=": () => [
      sprite("tree"),
      area(),
      scale(0.8),
      origin("bot"),
      solid(),
      "tree"
    ],
    "j": () => [
      sprite("tugu"),
      z(2),
      area(),
      solid()
    ],
    "b": () => [
      sprite("building"),
      z(1),
      area(),
      solid(),
      "building"
    ],
    "s": () => [
      rect(32, 32),
      z(-1),
      color(107, 204, 234),
      area(),
      solid(),
      pos(),
      "river"
    ],
    "c": () => [
      sprite("tpa"),
      area(),
      "checkpoint"
    ],
    "r": () => [
      rect(32, 32),
      color(80, 97, 119),
      z(-1),
      "road"
    ]
  })

  // add a character to screen
  const truck = add([
    sprite("truck"),
    pos(900, 575),
    scale(0.1),
    area(),
    solid()
  ]);
  const levelLabel = add ([
    text("Level"),
    scale(0.4)
  ])
  const levelCurrent = add ([
    {value: 1},
    circle(3)
  ])
  const truckWeight = add([
      text("Truck Weight: 0/"+MAX_WEIGHT),
      pos(3*width()/4, 24),
      scale(0.4),
      { value: 0 },
  ])

  const score = add([
      text("Score: 0"),
      pos(3*width()/4, 72),
      scale(0.4),
      { value: 0 },
  ])

  const truckSpeed = add([
      text("Speed: "+currentSpeed/MOVE_SPEED*100+"%"),
      pos(3*width()/4, 120),
      scale(0.4),
      { value: 0 },
  ])

  const timer = add([
    text("Time:\n"),
    pos(3*width()/4, 180),
    scale(0.4),
    { value: TIMER }
  ])

  add([
    pos(1080, 0),
    z(-1),
    rect(400, height()),
    color(200, 100, 93),
    area(),
  ])

  loop(1, () => {
    if(timer.value - 1 <= 0) {
      canMove = false;
      var xp = score.value * 100;
      var coin = score.value * 10;
      db.addXp(xp);
      db.addCoin(coin);
      db.updateConfig();
      go("time_over")
      music.pause()
      play("checkpoint")  
      wait(1.5, () => {
        go("time_over")
      })
    }
    generateTrash()
    timer.value -= 1
    timer.text = "Time:\n"+timer.value
  })

  truck.action(() => {
    if(!canMove) {
      return
    }
    const left = keyIsDown("left")
    const right = keyIsDown("right")
    const up = keyIsDown("up")
    const down = keyIsDown("down")
    const space = keyIsDown("space")
    if(left) {
      truck.flipX(false);
      lastMovement = left;
      truck.move(-currentSpeed, 0);
    } else if (right) {
      truck.flipX(true);
      truck.move(currentSpeed, 0);
    } else if (up) {
      truck.move(0, -currentSpeed);
    } else if (down) {
      truck.move(0, currentSpeed);
    } else if (space) {
      if(truck.isColliding(get("checkpoint")[0])) {
        score.value += truckWeight.value
        truckWeight.value = 0
        currentSpeed = MOVE_SPEED
        redrawText()
      }
    }
  })

  truck.onCollide("red_trash", (red_trash) => {
    if(!isCanAddWeight(1)) {
        return
      }
      play("score")
      destroy(red_trash)
      truckWeight.value += 1
      currentSpeed = calculateSpeed()
      redrawText()
  })

  truck.onCollide("black_trash", (black_trash) => {
    if(!isCanAddWeight(2)) {
        return
      }
      play("score")
      destroy(black_trash)
      truckWeight.value += 2
      currentSpeed = calculateSpeed()
      redrawText()
  })

  truck.onCollide("tree", () => {
    music.pause()
    play("crash")
    shake(6)
    canMove = false
    wait(1, () => {
      go("game_over")
    })
  })

  function calculateSpeed() {
    return (MOVE_SPEED - truckWeight.value/MAX_WEIGHT * currentSpeed)
  }

  function isCanAddWeight(weight) {
    if(truckWeight.value + weight <= MAX_WEIGHT) {
      return true
    }
    return false
  }

  function redrawText() {
    score.text = "Score: "+score.value
    truckWeight.text = "Truck Weight: "+truckWeight.value+"/"+MAX_WEIGHT
    truckSpeed.text = "Current Speed: " + currentSpeed/MOVE_SPEED*100+"%"
  }

  function generateTrash() {
    let buildings = get("building")
    let i = randi(0, buildings.length-1)
    let x = buildings[i].pos.x;
    let y = buildings[i].pos.y;
    let rand_num = rand(0,100)
    if(rand_num < 70) {
      add([
        sprite("red_trash"),
        pos(x-20, y+45),
        scale(0.1),
        z(1),
        area(),
        solid(),
        "red_trash"
      ])
    } else {
      add([
        sprite("black_trash"),
        pos(x+20, y+45),
        scale(0.1),
        z(1),
        area(),
        solid(),
        "black_trash"
      ])
    }
  }
}