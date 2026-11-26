const SAVE_KEY = 'dot_four_seasons_restaurant_v1';

const STATE = {
  money: 500,
  day: 1,
  seasonIndex: 0,
  phase: 'day',
  timeLeft: 600,
  autoSaveCounter: 0,

  inventory: {
    seed_turnip: 3,
    egg: 2,
    flour: 2
  },

  unlockedTools: ['tool_pan', 'tool_board'],
  farmExpanded: false,
  farmPlots: Array(9).fill(null),

  chickens: 2,
  eggsReady: 1,
  eggTimer: 0,
  mushroomKits: 0,
  mushroomsReady: 0,
  mushroomTimer: 0,

  isFishing: false,
  fishBite: false,
  fishTimer: 0,
  trapActive: false,
  trapReady: false,
  trapTimer: 0,

  cookingPotItems: {},
  cookedDishes: [],

  customers: [null, null, null],
  customerSpawnTimer: 0,

  discoveredRecipes: [],
  discoveredItems: ['turnip', 'egg', 'flour'],

  toolSlots: [],
  trashRect: null,
  cookBtnRect: null,
  customerRects: [],
  coopRect: null,
  mushroomRect: null,
  farmCellRects: [],

  get currentSeason() {
    return GAME_DATA.seasons[this.seasonIndex];
  },

  save() {
    try {
      const dataToSave = {
        money: this.money,
        day: this.day,
        seasonIndex: this.seasonIndex,
        phase: this.phase,
        timeLeft: this.timeLeft,
        inventory: this.inventory,
        unlockedTools: this.unlockedTools,
        farmExpanded: this.farmExpanded,
        farmPlots: this.farmPlots,
        chickens: this.chickens,
        eggsReady: this.eggsReady,
        eggTimer: this.eggTimer,
        mushroomKits: this.mushroomKits,
        mushroomsReady: this.mushroomsReady,
        mushroomTimer: this.mushroomTimer,
        trapActive: this.trapActive,
        trapReady: this.trapReady,
        trapTimer: this.trapTimer,
        cookedDishes: this.cookedDishes,
        discoveredRecipes: this.discoveredRecipes,
        discoveredItems: this.discoveredItems
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      // 저장 공간 예외 무시
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const saved = JSON.parse(raw);
      Object.assign(this, saved);
      return true;
    } catch (e) {
      return false;
    }
  },

  addItem(id, count = 1) {
    if (!this.inventory[id]) this.inventory[id] = 0;
    this.inventory[id] += count;
    if (!this.discoveredItems.includes(id)) {
      this.discoveredItems.push(id);
    }
    this.save();
  },

  removeItem(id, count = 1) {
    if (!this.inventory[id] || this.inventory[id] < count) return false;
    this.inventory[id] -= count;
    if (this.inventory[id] <= 0) delete this.inventory[id];
    this.save();
    return true;
  },

  tick() {
    this.timeLeft--;

    // 5초마다 자동 저장
    this.autoSaveCounter++;
    if (this.autoSaveCounter >= 5) {
      this.save();
      this.autoSaveCounter = 0;
    }

    if (this.chickens > 0 && this.eggsReady < this.chickens) {
      this.eggTimer++;
      if (this.eggTimer >= 30) {
        this.eggsReady++;
        this.eggTimer = 0;
      }
    }

    if (this.mushroomKits > 0 && this.mushroomsReady < this.mushroomKits) {
      this.mushroomTimer++;
      if (this.mushroomTimer >= 40) {
        this.mushroomsReady++;
        this.mushroomTimer = 0;
      }
    }

    this.farmPlots.forEach((plot) => {
      if (plot && !plot.ready) {
        plot.elapsed++;
        if (plot.elapsed >= plot.growSec) {
          plot.ready = true;
        }
      }
    });

    if (this.isFishing && !this.fishBite) {
      this.fishTimer--;
      if (this.fishTimer <= 0) {
        this.fishBite = true;
      }
    }

    if (this.trapActive && !this.trapReady) {
      this.trapTimer--;
      if (this.trapTimer <= 0) {
        this.trapReady = true;
      }
    }

    if (this.phase === 'night') {
      this.handleCustomers();
    }

    if (this.timeLeft <= 0) {
      this.switchPhase();
    }
  },

  handleCustomers() {
    const colors = ['#e03131', '#1971c2', '#2f9e44', '#f08c00', '#7950f2'];
    const emptyIdx = this.customers.findIndex((c) => c === null);
    if (emptyIdx !== -1) {
      this.customerSpawnTimer++;
      if (this.customerSpawnTimer >= 3) {
        const reqs = GAME_DATA.customerRequests;
        const wantTag = reqs[Math.floor(Math.random() * reqs.length)];
        this.customers[emptyIdx] = {
          wantTag,
          patience: 55,
          shirtColor: colors[Math.floor(Math.random() * colors.length)]
        };
        this.customerSpawnTimer = 0;
      }
    }

    this.customers.forEach((c, i) => {
      if (!c) return;
      c.patience--;
      if (c.patience <= 0) {
        this.customers[i] = null;
      }
    });
  },

  switchPhase() {
    if (this.phase === 'day') {
      this.phase = 'night';
      this.timeLeft = 300;
      this.customers = [null, null, null];
      this.customerSpawnTimer = 2;
      if (typeof UI !== 'undefined') {
        UI.switchScene('restaurant');
        UI.showToast('밤이 되었습니다! 식당 문을 열고 손님을 맞이합니다.');
      }
    } else {
      this.phase = 'day';
      this.timeLeft = 600;
      this.customers = [null, null, null];
      this.day++;
      if ((this.day - 1) % 7 === 0) {
        this.seasonIndex = (this.seasonIndex + 1) % 4;
        if (typeof UI !== 'undefined') {
          UI.showToast(`계절이 바뀌어 [${this.currentSeason}]이(가) 되었습니다!`);
        }
      } else if (typeof UI !== 'undefined') {
        UI.showToast(`${this.currentSeason} ${this.day}일차 아침이 밝았습니다!`);
      }
    }
    this.save();
  }
};

// 스크립트 로드 즉시 저장 데이터 불러오기
STATE.load();
