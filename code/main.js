import kaboom from "kaboom";
import * as db from "./data";
import upgrade from "./upgrade.js"
import settings from "./settings.js"
import {run} from "./play.js"

// initialize context
kaboom({
  background: [252, 184, 65]
});

// load assets
loadSprite("logo", "sprites/logo.png");
loadSprite("truck", "sprites/truck.png");
loadSprite("truck_front", "sprites/truck_front.png");
loadSprite("building", "sprites/basic_building.png");
loadSprite("tree", "sprites/tree.png");
loadSprite("black_trash", "sprites/black_trash.png");
loadSprite("red_trash", "sprites/red_trash.png");
loadSprite("tpa", "sprites/TPA.png");
loadSprite("tugu", "sprites/tugu_jogja.png");
loadSprite("logo", "sprites/logo.png");
loadSprite("play_btn", "sprites/play_btn.png");
loadSprite("upgrade_btn", "sprites/upgrade_btn.png");
loadSprite("exit_btn", "sprites/exit_btn.png");
loadSprite("settings_btn", "sprites/settings_btn.png");
loadSprite("back_btn", "sprites/back_btn.png")
loadSprite("plus_btn", "sprites/plus_btn.png")
loadSprite("max_coin_btn", "sprites/max_coin_btn.png")
loadSprite("reset_btn", "sprites/reset_btn.png")
loadSprite("gina", "sprites/gina.png")
loadSound("score", "sounds/score.mp3")
loadSound("soundtrack", "sounds/soundtrack.mp3")
loadSound("soundtrack2", "sounds/soundtrack2.mp3")
loadSound("soundtrack3", "sounds/soundtrack3.mp3")
loadSound("crash", "sounds/crash.mp3")
loadSound("checkpoint", "sounds/checkpoint.mp3")

db.initDb();

scene("play", () => {
  run(db.configuration);
})

scene("menu", () => {
  add([
      pos(center()),
      origin("center"),
      z(0),
      rect(width(),height()),
      color(107, 204, 234),
      area(),
  ])

  const title = add([
    sprite("logo"),
    scale(0.5),
    pos(650, 80),
    z(1),
    area(),
    solid(),
  ])

  const play_btn = add([
    sprite("play_btn"), 
    scale(0.7),
    area(),
    solid(),
    pos(650, 280),
    "play_btn"
  ])

  const upgrade_btn = add([
    sprite("upgrade_btn"), 
    scale(0.7),
    area(),
    solid(),
    pos(650, 360),
    "upgrade_btn"
  ])

    const settings_btn = add([
    sprite("settings_btn"), 
    scale(0.7),
    area(),
    solid(),
    pos(650, 440),
    "settings_btn"
  ])

    const exit_btn = add([ 
    sprite("exit_btn"), 
    scale(0.7),
    area(),
    solid(),
    pos(650, 520),
    "exit_btn"
  ])

  const truck_front = add([
    sprite("truck_front"), 
    scale(0.4),
    area(),
    solid(),
    pos(120, 150),
    "truck_front"
  ])
  onClick("play_btn", (play_btn) => go("cut_scene"))
  onClick("settings_btn", () => go("settings"))
  onClick("upgrade_btn", (upgrade_btn) => go("upgrade"))
})

scene("upgrade", () => {
  upgrade()
})

scene("settings", () => {
  settings()
})

scene("game_over", () => {
  add([
    text("game over"),
    pos(500, height()/2-100)
    ])

  add([
    sprite("exit_btn"), 
    scale(0.7),
    area(),
    solid(),
    pos(550, 520),
    "exit_btn"
  ])
  onClick("exit_btn", () => {
    db.updateConfig();
    go("menu")
  })
})

scene("time_over", () => {
  add([
    text("Mission Success"),
    origin("center"),
    pos(width()/2, height()/2-100)
  ])

  add([
    text("+ Respect"),
    origin("center"),
    pos(width()/2, height()/2)
  ])

  add([
    sprite("exit_btn"), 
    scale(0.7),
    area(),
    solid(),
    pos(550, 520),
    "exit_btn"
  ])
  onClick("exit_btn", () => {
    db.updateConfig();
    go("menu")
  })
})

scene("cut_scene", () => {
  if(true) {
    let gina_dialog = "Hello, Tommy! I am Gina, and I will help you on your mission to save City of Yogyakarta from trash! Are you ready for it?"

    add([
      rect(20,40),
      // color(107, 204, 234),
      area(),
      pos(100, 200),
      scale(0.5),
      text(gina_dialog, {
        width: 600
      })
    ])
    
    add([
      sprite("gina"),
      scale(0.5),
      pos(100, 500),
    ])

    add([
      text("PRESS SPACE TO PLAY", {
        size: 40
      }),
      pos(400, 500)
    ])

    onKeyPress("space", () => go("play"))
  } else {
    go("play")
  }
})

go("menu")