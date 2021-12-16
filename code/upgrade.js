import kaboom from "kaboom";
import * as db from "./data";

const BASE_PRICE = 100;
let speedPrice;
const upgrade = () => {
  speedPrice = db.configuration.speedLevel / 2 * BASE_PRICE;
  weightPrice = db.configuration.weightLevel / 2 * BASE_PRICE;
  add([
    sprite("back_btn"),
    scale(0.5),
    area(),
    solid(),
    pos(30, 30),
    "back_btn"
  ])
  const currentCoin = add([
    text(db.configuration.coin+" coins"),
    pos(700,30),
    scale(0.8)
  ])
  add([
    sprite("truck_front"),
    scale(0.45),
    pos(60,160)
  ])
  const speed_text = add([
    text("Speed Price: "+speedPrice),
    pos(600, 100),
    scale(0.8)
  ])
  for(let i = 0; i < 5; i++) {
    if(i < db.configuration.speedLevel) {
      add([
        rect(40, 40),
        color(180, 207, 19),
        outline(1),
        pos((600 + i * 32), 170),
        scale(0.8)
      ])
    } else {
      add([
        rect(40, 40),
        color(80, 97, 119),
        outline(1),
        pos((600 + i * 32), 170),
        scale(0.8)
      ])
    }
  }
  add([
    sprite("plus_btn"),
    scale(0.4),
    area(),
    solid(),
    pos(800, 170),
    "plus_btn_speed"
  ])
  add([
    text("Capacity"),
    pos(600,300),
    scale(0.8)
  ])
  for(let i = 0; i < 5; i++) {
    if(i < db.configuration.weightLevel) {
      add([
        rect(40, 40),
        color(180, 207, 19),
        outline(1),
        pos((600 + i * 32), 370),
        scale(0.8)
      ])
    } else {
      add([
        rect(40, 40),
        color(80, 97, 119),
        outline(1),
        pos((600 + i * 32), 370),
        scale(0.8)
      ])
    }
  }
  add([
    sprite("plus_btn"),
    scale(0.4),
    area(),
    solid(),
    pos(800, 370),
    "plus_btn_capacity"
  ])
  onClick("back_btn", () => go("menu"))
  onClick("plus_btn_speed", () => upgradeSpeed())
  onClick("plus_btn_capacity", () => upgradeWeight())
}

function upgradeSpeed() {
  if(db.configuration.speedLevel >= 5) {
    return
  }
  if(db.configuration.coin >= speedPrice) {
    db.upgrade(db.TYPE_SPEED, db.LEVEL_SPEED);
    db.deductCoin(speedPrice);
    db.updateConfig();
    go("upgrade");
  }
}

function upgradeWeight() {
  if(db.configuration.weightLevel >= 5) {
    return
  }
  if(db.configuration.coin >= weightPrice) {
    db.upgrade(db.TYPE_WEIGHT, db.LEVEL_WEIGHT);
    db.deductCoin(weightPrice);
    db.updateConfig();
    go("upgrade");
  }
}

export default upgrade;