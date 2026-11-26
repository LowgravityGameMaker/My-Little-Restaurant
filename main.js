
const UI = {
  selectedIngredient: null, // 조리도구에 넣기 위해 선택한 재료 ID
  selectedDishIndex: null,  // 손님에게 서빙하기 위해 선택한 완성 요리 인덱스

  init() {
    // 상단 도트 아이콘 렌더링
    SPRITES.drawIcon(document.getElementById('icon-coin'), 'coin');
    SPRITES.drawIcon(document.getElementById('icon-book'), 'book');
    SPRITES.drawIcon(document.getElementById('icon-dex'), 'dex');

    this.bindEvents();
    this.renderMarket();
    this.updateAll();

    // 1초 게임 루프 시작
    setInterval(() => {
      STATE.tick();
      this.updateAll();
    }, 1000);
  },

  showToast(msg) {
    const hint = document.getElementById('kitchen-hint');
    const farmText = document.getElementById('farm-status-text');
    if (hint) hint.textContent = msg;
    if (farmText) farmText.textContent = msg;
  },

  switchScene(target) {
    document.querySelectorAll('.scene').forEach((el) => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach((el) => el.classList.remove('active'));

    const targetScene = document.getElementById(`scene-${target}`);
    const targetBtn = document.querySelector(`.nav-btn[data-target="${target}"]`);
    if (targetScene) targetScene.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');

    if (target === 'market') this.renderMarket();
    this.updateCanvases();
  },

  updateAll() {
    // 상단 재화 및 시간 텍스트 갱신
    document.getElementById('money-text').textContent = `${STATE.money} G`;
    document.getElementById('season-day-text').textContent = `${STATE.currentSeason} ${STATE.day}일차`;

    const min = String(Math.floor(STATE.timeLeft / 60)).padStart(2, '0');
    const sec = String(STATE.timeLeft % 60).padStart(2, '0');
    const phaseName = STATE.phase === 'day' ? '낮' : '밤(영업중)';
    document.getElementById('phase-timer-text').textContent = `${phaseName} ${min}:${sec}`;

    this.updateCanvases();
    this.renderServingTray();
  },

  updateCanvases() {
    const kCanvas = document.getElementById('kitchen-canvas');
    if (kCanvas) SPRITES.drawKitchen(kCanvas.getContext('2d'), kCanvas.width, kCanvas.height, STATE);

    const hCanvas = document.getElementById('hall-canvas');
    if (hCanvas) SPRITES.drawHall(hCanvas.getContext('2d'), hCanvas.width, hCanvas.height, STATE);

    const fCanvas = document.getElementById('farm-canvas');
    if (fCanvas) SPRITES.drawFarm(fCanvas.getContext('2d'), fCanvas.width, fCanvas.height, STATE);

    const fiCanvas = document.getElementById('fishing-canvas');
    if (fiCanvas) SPRITES.drawFishing(fiCanvas.getContext('2d'), fiCanvas.width, fiCanvas.height, STATE);

    const mCanvas = document.getElementById('market-canvas');
    if (mCanvas) SPRITES.drawMarketBanner(mCanvas.getContext('2d'), mCanvas.width, mCanvas.height, STATE.currentSeason);
  },

  bindEvents() {
    // 하단 장소 이동 버튼
    document.querySelectorAll('.nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.switchScene(btn.dataset.target);
      });
    });

    // 식당: 조리대 <-> 홀(서빙 벨) 전환
    document.getElementById('btn-ring-bell').addEventListener('click', () => {
      document.getElementById('kitchen-view').classList.remove('active');
      document.getElementById('hall-view').classList.add('active');
      this.updateCanvases();
    });

    document.getElementById('btn-back-kitchen').addEventListener('click', () => {
      document.getElementById('hall-view').classList.remove('active');
      document.getElementById('kitchen-view').classList.add('active');
      this.updateCanvases();
    });

    // 상단 아이콘: 레시피북 & 도감
    document.getElementById('btn-recipe-book').addEventListener('click', () => this.openRecipeBook());
    document.getElementById('btn-encyclopedia').addEventListener('click', () => this.openEncyclopedia());
    document.getElementById('btn-close-modal').addEventListener('click', () => this.closeModal());

    // 식당: 재료 꺼내기 버튼
    document.getElementById('btn-open-ingredients').addEventListener('click', () => this.openIngredientModal());
