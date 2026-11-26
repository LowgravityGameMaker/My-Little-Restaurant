
const STATE = {
  money: 500,
  day: 1,
  seasonIndex: 0, // 0:봄, 1:여름, 2:가을, 3:겨울
  phase: 'day',   // 'day' (10분=600초) | 'night' (5분=300초)
  timeLeft: 600,

  // 인벤토리 (아이템ID: 수량)
  inventory: {
    seed_turnip: 3,
    egg: 2,
    flour: 2
  },

  // 해금된 조리도구 및 설비
  unlockedTools: ['tool_pan', 'tool_board'],
  farmExpanded: false,
  farmPlots: Array(9).fill(null), // { cropId, elapsed, growSec, ready }

  // 닭장 및 버섯 키트
  chickens: 2,
  eggsReady: 1,
  eggTimer: 0,
  mushroomKits: 0,
  mushroomsReady: 0,
  mushroomTimer: 0,

  // 낚시 및 통발
  isFishing: false,
  fishBite: false,
  fishTimer: 0,
  trapActive: false,
  trapReady: false,
  trapTimer: 0,

  // 주방 조리 상태
  cookingPotItems: {}, // { tool_pan: ['egg'], ... }
  cookedDishes: [],    // 완성된 요리 객체 리스트 (최대 3개 보관)

  // 밤 시간 손님 상태 (최대 3명)
  customers: [null, null, null],
  customerSpawnTimer: 0,

  // 도감 및 레시피 발견 기록
  discoveredRecipes: [],
  discoveredItems: ['turnip', 'egg', 'flour'],

  // 캔버스 터치 판정용 좌표 저장소
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

  addItem(id, count = 1) {
    if (!this.inventory[id]) this.inventory[id] = 0;
    this.inventory[id] += count;
    if (!this.discoveredItems.includes(id)) {
      this.discoveredItems.push(id);
    }
  },

  removeItem(id, count = 1) {
    if (!this.inventory[id] || this.inventory[id] < count) return false;
    this.inventory[id] -= count;
    if (this.inventory[id] <= 0) delete this.inventory[id];
    return true;
  },

  // 1초마다 흐르는 시간 및 생산물 업데이트
  tick() {
    this.timeLeft--;

    // 닭장 달걀 생산 (30초마다)
    if (this.chickens > 0 && this.eggsReady < this.chickens) {
      this.eggTimer++;
      if (this.eggTimer >= 30) {
        this.eggsReady++;
        this.eggTimer = 0;
      }
    }

    // 버섯 키트 생산 (40초마다)
    if (this.mushroomKits > 0 && this.mushroomsReady < this.mushroomKits) {
      this.mushroomTimer++;
      if (this.mushroomTimer >= 40) {
        this.mushroomsReady++;
        this.mushroomTimer = 0;
      }
    }

    // 밭 작물 성장
    this.farmPlots.forEach((plot) => {
      if (plot && !plot.ready) {
        plot.elapsed++;
        if (plot.elapsed >= plot.growSec) {
          plot.ready = true;
        }
      }
    });

    // 낚시 입질 체크
    if (this.isFishing && !this.fishBite) {
      this.fishTimer--;
      if (this.fishTimer <= 0) {
        this.fishBite = true;
      }
    }

    // 통발 수확 체크 (25초 소요)
    if (this.trapActive && !this.trapReady) {
      this.trapTimer--;
      if (this.trapTimer <= 0) {
        this.trapReady = true;
      }
    }

    // 밤 시간 손님 입장 및 대기 시간 관리
    if (this.phase === 'night') {
      this.handleCustomers();
    }

    // 낮 <-> 밤 전환 체크
    if (this.timeLeft <= 0) {
      this.switchPhase();
    }
  },

  handleCustomers() {
    const colors = ['#e03131', '#1971c2', '#2f9e44', '#f08c00', '#7950f2'];
    // 빈 자리가 있으면 3초마다 손님 입장
    const emptyIdx = this.customers.findIndex((c) => c === null);
    if (emptyIdx !== -1) {
      this.customerSpawnTimer++;
      if (this.customerSpawnTimer >= 3) {
        const reqs = GAME_DATA.customerRequests;
        const wantTag = reqs[Math.floor(Math.random() * reqs.length)];
        this.customers[emptyIdx] = {
          wantTag,
          patience: 55, // 55초 내 서빙 실패 시 퇴장
          shirtColor: colors[Math.floor(Math.random() * colors.length)]
        };
        this.customerSpawnTimer = 0;
      }
    }

    // 손님 인내심 감소
    this.customers.forEach((c, i) => {
      if (!c) return;
      c.patience--;
      if (c.patience <= 0) {
        this.customers[i] = null; // 요구 불만족 퇴장
      }
    });
  },

  switchPhase() {
    if (this.phase === 'day') {
      // 낮 10분 종료 -> 밤 5분 시작 및 식당으로 자동 이동
      this.phase = 'night';
      this.timeLeft = 300;
      this.customers = [null, null, null];
      this.customerSpawnTimer = 2;
      if (typeof UI !== 'undefined') {
        UI.switchScene('restaurant');
        UI.showToast('밤이 되었습니다! 식당 문을 열고 손님을 맞이합니다.');
      }
    } else {
      // 밤 5분 종료 -> 모든 손님 퇴장 & 다음 날 아침
      this.phase = 'day';
      this.timeLeft = 600;
      this.customers = [null, null, null];
      this.day++;
      // 7일마다 계절 변경
      if ((this.day - 1) % 7 === 0) {
        this.seasonIndex = (this.seasonIndex + 1) % 4;
        if (typeof UI !== 'undefined') {
          UI.showToast(`계절이 바뀌어 [${this.currentSeason}]이(가) 되었습니다!`);
        }
      } else if (typeof UI !== 'undefined') {
        UI.showToast(`${this.currentSeason} ${this.day}일차 아침이 밝았습니다!`);
      }
    }
  }
};
