import * as db from "./data";

const settings = () => {
  const set_money_btn = add([ 
      sprite("max_coin_btn"), 
      scale(0.7),
      area(),
      solid(),
      pos(650, 150),
      "set_money_btn"
    ])
  const reset_btn = add([ 
      sprite("reset_btn"), 
      scale(0.7),
      area(),
      solid(),
      pos(650, 300),
      "reset_btn"
    ])

  const exit_btn = add([ 
    sprite("exit_btn"), 
    scale(0.7),
    area(),
    solid(),
    pos(650, 500),
    "exit_btn"
  ])

  onClick("set_money_btn", () => {
    replit.setData("xp", 1000);
    replit.setData("coin", 10000);
    replit.setData(db.TYPE_SPEED, 5);
    replit.setData(db.TYPE_WEIGHT, 5);
    replit.setData(db.LEVEL_SPEED, 1);
    replit.setData(db.LEVEL_WEIGHT, 1);
    db.updateConfig();
  })
  onClick("reset_btn", () => {
    db.reset()
  })
  onClick("exit_btn", () => {
    go("menu")
  })
}

export default settings


