export const TYPE_SPEED = "speed";
export const TYPE_WEIGHT = "max_weight";
export const LEVEL_SPEED = "speedLevel";
export const LEVEL_WEIGHT = "weightLevel";
export let configuration = {};

export function initDb() {
  replit.getData("xp").then((xp) => {
    if(xp === null) {
      replit.setData("xp", 0);
      replit.setData("coin", 0);
      replit.setData(TYPE_SPEED, 5);
      replit.setData(TYPE_WEIGHT, 5);
      replit.setData(LEVEL_SPEED, 1);
      replit.setData(LEVEL_WEIGHT, 1);
      configuration = {
        xp: 0,
        coin: 0,
        speed: 5,
        speedLevel: 1,
        weightLevel: 1,
        maxWeight: 5
      }
    } else {
      configuration.xp = xp;
      replit.getData("coin").then((coin) => {
        configuration.coin = coin;
      })

      replit.getData(TYPE_SPEED).then((speed) => {
        configuration.speed = speed;
      })
      
      replit.getData(TYPE_WEIGHT).then((weight) => {
        configuration.maxWeight = weight;
      })

      replit.getData(LEVEL_SPEED).then((level) => {
        configuration.speedLevel = level;
      })

      replit.getData(LEVEL_WEIGHT).then((level) => {
        configuration.weightLevel = level;
      })
      
    }
  })
}

export function updateConfig() {
  replit.getData("xp").then((xp) => {
    configuration.xp = xp;
  })

  replit.getData("coin").then((coin) => {
    configuration.coin = coin;
  })

  replit.getData(TYPE_SPEED).then((speed) => {
    configuration.speed = speed;
  })
  
  replit.getData(TYPE_WEIGHT).then((weight) => {
    configuration.maxWeight = weight;
  })

  replit.getData("speedLevel").then((level) => {
    configuration.speedLevel = level;
  })

  replit.getData("weightLevel").then((level) => {
    configuration.weightLevel = level;
  })
}

export function addXp(xp_amount) {
  replit.getData("xp").then((xp) => {
    replit.setData("xp", xp+xp_amount);
  })
}

export function addCoin(coin_amount) {
  replit.getData("coin").then((coin) => {
    replit.setData("coin", coin+coin_amount);
  })
}

export function deductCoin(coin_amount) {
  replit.getData("coin").then((coin) => {
    replit.setData("coin", coin-coin_amount);
  })
}

export function upgrade(upgrade_type, level_type) {
  replit.getData(upgrade_type).then((level) => {
    replit.setData(upgrade_type, level+=1);
  })
  replit.getData(level_type).then((level) => {
    replit.setData(level_type, level+=1)
  })
}

export function reset() {
  replit.clearData();
}