const UI = {
  selectedIngredient: null,
  selectedDishIndex: null,

  init() {
    SPRITES.drawIcon(document.getElementById('icon-coin'), 'coin');
    SPRITES.drawIcon(document.getElementById('icon-book'), 'book');
    SPRITES.drawIcon(document.getElementById('icon-dex'), 'dex');

    this.bindEvents();
    this.renderMarket();
    this.updateAll();

    // 1초 게임 시간 루프
    setInterval(() => {
      STATE.tick();
      this.updateAll();
    }, 1000);

    // 낚싯줄 및 찌 실시간 진동 애니메이션 루프 (약 20fps, 저사양 폰 최적화)
    setInterval(() => {
      if (STATE.isFishing) {
        const fiCanvas = document.getElementById('fishing-canvas');
        if (fiCanvas && document.getElementById('scene-fishing').classList.contains('active')) {
          SPRITES.drawFishing(fiCanvas.getContext('2d'), fiCanvas.width, fiCanvas.height, STATE);
        }
      }
    }, 50);
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
    document.getElementById('money-text').textContent = `${STATE.money} G`;
    document.getElementById('season-day-text').textContent = `${STATE.currentSeason} ${STATE.day}일차`;

    const min = String(Math.floor(STATE.timeLeft / 60)).padStart(2, '0');
    const sec = String(STATE.timeLeft % 60).padStart(2, '0');
    const phaseName = STATE.phase === 'day' ? '낮' : '밤(영업중)';
    document.getElementById('phase-timer-text').textContent = `${phaseName} ${min}:${sec}`;

    // 낮일 때만 '밤으로' 건너뛰기 버튼 표시
    const skipBtn = document.getElementById('btn-skip-day');
    if (skipBtn) {
      skipBtn.style.display = STATE.phase === 'day' ? 'inline-block' : 'none';
    }

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
    // 낮 건너뛰기 버튼 클릭 -> 즉시 밤(식당 영업)으로 전환
    document.getElementById('btn-skip-day').addEventListener('click', () => {
      if (STATE.phase === 'day') {
        STATE.switchPhase();
        this.updateAll();
      }
    });

    document.querySelectorAll('.nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.switchScene(btn.dataset.target);
      });
    });

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

    document.getElementById('btn-recipe-book').addEventListener('click', () => this.openRecipeBook());
    document.getElementById('btn-encyclopedia').addEventListener('click', () => this.openEncyclopedia());
    document.getElementById('btn-close-modal').addEventListener('click', () => this.closeModal());
    document.getElementById('btn-open-ingredients').addEventListener('click', () => this.openIngredientModal());

    const kCanvas = document.getElementById('kitchen-canvas');
    kCanvas.addEventListener('click', (e) => {
      const pt = this.getCanvasCoords(kCanvas, e);

      for (const slot of STATE.toolSlots) {
        if (this.inRect(pt, slot)) {
          if (this.selectedIngredient) {
            if (STATE.removeItem(this.selectedIngredient, 1)) {
              if (!STATE.cookingPotItems[slot.toolId]) STATE.cookingPotItems[slot.toolId] = [];
              STATE.cookingPotItems[slot.toolId].push(this.selectedIngredient);
              const itemName = GAME_DATA.items[this.selectedIngredient].name;
              const toolName = GAME_DATA.tools[slot.toolId].name;
              this.showToast(`${toolName}에 [${itemName}]을(를) 넣었습니다.`);
              this.selectedIngredient = null;
              this.updateAll();
            }
          } else {
            const cur = STATE.cookingPotItems[slot.toolId] || [];
            if (cur.length > 0) {
              const names = cur.map((id) => GAME_DATA.items[id].name).join(', ');
              this.showToast(`현재 재료: ${names}`);
            } else {
              this.showToast('먼저 상단의 [재료 꺼내기]로 재료를 선택하세요.');
            }
          }
          return;
        }
      }

      if (STATE.trashRect && this.inRect(pt, STATE.trashRect)) {
        STATE.cookingPotItems = {};
        this.selectedIngredient = null;
        this.showToast('조리도구 안의 재료를 모두 쓰레기통에 버렸습니다.');
        this.updateAll();
        return;
      }

      if (STATE.cookBtnRect && this.inRect(pt, STATE.cookBtnRect)) {
        this.tryCook();
      }
    });

    const hCanvas = document.getElementById('hall-canvas');
    hCanvas.addEventListener('click', (e) => {
      const pt = this.getCanvasCoords(hCanvas, e);
      for (const rect of STATE.customerRects) {
        if (this.inRect(pt, rect)) {
          const cust = STATE.customers[rect.index];
          if (!cust) return;
          if (this.selectedDishIndex === null) {
            this.showToast(`손님 요구: [${cust.wantTag}] 요리. 아래 접시를 먼저 선택하세요!`);
            return;
          }
          const dish = STATE.cookedDishes[this.selectedDishIndex];
          if (!dish) return;

          if (dish.tags.includes(cust.wantTag)) {
            STATE.money += dish.price;
            this.showToast(`대성공! [${dish.name}] 서빙 완료 (+${dish.price} G)`);
          } else {
            this.showToast(`손님이 실망하며 나갔습니다... (${cust.wantTag} 요리를 원함)`);
          }
          STATE.customers[rect.index] = null;
          STATE.cookedDishes.splice(this.selectedDishIndex, 1);
          this.selectedDishIndex = null;
          this.updateAll();
          return;
        }
      }
    });
    const fCanvas = document.getElementById('farm-canvas');
    fCanvas.addEventListener('click', (e) => {
      const pt = this.getCanvasCoords(fCanvas, e);

      if (STATE.coopRect && this.inRect(pt, STATE.coopRect)) {
        this.openCoopModal();
        return;
      }

      if (STATE.mushroomRect && this.inRect(pt, STATE.mushroomRect)) {
        if (STATE.mushroomKits <= 0) {
          this.showToast('시장에서 [버섯 재배 키트]를 먼저 구매하세요!');
        } else if (STATE.mushroomsReady > 0) {
          const count = STATE.mushroomsReady;
          STATE.addItem('mushroom', count);
          STATE.mushroomsReady = 0;
          this.showToast(`표고버섯 ${count}개를 수확했습니다!`);
          this.updateAll();
        } else {
          this.showToast('버섯이 자라는 중입니다...');
        }
        return;
      }

      for (const cell of STATE.farmCellRects) {
        if (this.inRect(pt, cell)) {
          const plot = STATE.farmPlots[cell.idx];
          if (!plot) {
            this.openSeedModal(cell.idx);
          } else if (plot.ready) {
            STATE.addItem(plot.cropId, 1);
            const cropName = GAME_DATA.items[plot.cropId].name;
            STATE.farmPlots[cell.idx] = null;
            this.showToast(`[${cropName}]을(를) 수확했습니다!`);
            this.updateAll();
          } else {
            const left = Math.max(0, plot.growSec - plot.elapsed);
            this.showToast(`작물이 자라는 중... (남은 시간: ${left}초)`);
          }
          return;
        }
      }
    });

    document.getElementById('btn-cast-rod').addEventListener('click', () => {
      if (STATE.isFishing) {
        STATE.isFishing = false;
        STATE.fishBite = false;
        this.showToast('낚싯대를 거두었습니다.');
      } else {
        STATE.isFishing = true;
        STATE.fishBite = false;
        STATE.fishTimer = Math.floor(Math.random() * 5) + 3;
        this.showToast('찌를 던졌습니다. 입질을 기다리세요!');
      }
      this.updateAll();
    });

    document.getElementById('fishing-canvas').addEventListener('click', () => {
      if (STATE.isFishing && STATE.fishBite) {
        const season = STATE.currentSeason;
        const pool = Object.entries(GAME_DATA.items).filter(
          ([, item]) => item.type === 'fish' && item.method === 'rod' && item.season.includes(season)
        );
        const [fishId, fishObj] = pool[Math.floor(Math.random() * pool.length)];
        STATE.addItem(fishId, 1);
        STATE.isFishing = false;
        STATE.fishBite = false;
        this.showToast(`월척이다! [${fishObj.name}]을(를) 낚았습니다!`);
        this.updateAll();
      }
    });

    document.getElementById('btn-set-trap').addEventListener('click', () => {
      if (!STATE.trapActive) {
        STATE.trapActive = true;
        STATE.trapReady = false;
        STATE.trapTimer = 25;
        this.showToast('강물에 통발을 설치했습니다! (25초 소요)');
      } else if (STATE.trapReady) {
        const season = STATE.currentSeason;
        const pool = Object.entries(GAME_DATA.items).filter(
          ([, item]) => item.type === 'fish' && item.method === 'trap' && item.season.includes(season)
        );
        const [fishId, fishObj] = pool[Math.floor(Math.random() * pool.length)];
        STATE.addItem(fishId, 1);
        STATE.trapActive = false;
        STATE.trapReady = false;
        this.showToast(`통발에서 [${fishObj.name}]을(를) 건졌습니다!`);
      } else {
        this.showToast(`통발에 수생생물이 모이는 중... (${STATE.trapTimer}초 남음)`);
      }
      this.updateAll();
    });
  },

  tryCook() {
    if (STATE.cookedDishes.length >= 3) {
      this.showToast('서빙 쟁반이 가득 찼습니다! 먼저 손님에게 서빙하거나 버리세요.');
      return;
    }

    const activeTools = Object.keys(STATE.cookingPotItems).filter(
      (t) => STATE.cookingPotItems[t] && STATE.cookingPotItems[t].length > 0
    );

    if (activeTools.length !== 1) {
      this.showToast('한 번에 하나의 조리도구에만 재료를 넣고 요리하세요!');
      return;
    }

    const toolId = activeTools[0];
    const usedIngs = [...STATE.cookingPotItems[toolId]].sort();
    STATE.cookingPotItems = {};

    const matched = GAME_DATA.recipes.find((r) => {
      if (r.tool !== toolId) return false;
      const reqSorted = [...r.ingredients].sort();
      return reqSorted.length === usedIngs.length && reqSorted.every((v, i) => v === usedIngs[i]);
    });

    if (matched) {
      STATE.cookedDishes.push(matched);
      if (!STATE.discoveredRecipes.includes(matched.id)) {
        STATE.discoveredRecipes.push(matched.id);
        this.showToast(`신메뉴 발견! [${matched.name}] 완성! 레시피북에 등록되었습니다.`);
      } else {
        this.showToast(`[${matched.name}] 완성! 서빙 벨을 눌러 손님에게 내어주세요.`);
      }
    } else {
      this.showToast('실패한 요리! 레시피에 없는 조합이라 자동으로 버려졌습니다.');
    }
    this.updateAll();
  },

  renderServingTray() {
    const tray = document.getElementById('serving-tray');
    if (!tray) return;
    tray.innerHTML = '';

    if (STATE.cookedDishes.length === 0) {
      tray.innerHTML = '<span style="font-size:11px;color:#cbbba8;">완성된 요리가 없습니다</span>';
      return;
    }

    STATE.cookedDishes.forEach((dish, idx) => {
      const btn = document.createElement('button');
      btn.className = 'pixel-btn small';
      if (this.selectedDishIndex === idx) btn.classList.add('accent');
      btn.textContent = `${dish.name} (${dish.tags[0]})`;
      btn.addEventListener('click', () => {
        this.selectedDishIndex = idx;
        this.showToast(`[${dish.name}] 선택됨! 이제 원하는 손님을 터치하세요.`);
        this.renderServingTray();
      });
      tray.appendChild(btn);
    });
  },
  openModal(title, buildFn) {
    document.getElementById('modal-title').textContent = title;
    const content = document.getElementById('modal-content');
    content.innerHTML = '';
    buildFn(content);
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  },

  openIngredientModal() {
    this.openModal('보유 식재료 선택', (box) => {
      const entries = Object.entries(STATE.inventory).filter(([id]) => {
        const item = GAME_DATA.items[id];
        return item && (item.type === 'ingredient' || item.type === 'fish');
      });

      if (entries.length === 0) {
        box.textContent = '보유한 식재료가 없습니다. 밭, 낚시터, 시장에서 재료를 구해보세요!';
        return;
      }

      entries.forEach(([id, count]) => {
        const item = GAME_DATA.items[id];
        const row = document.createElement('button');
        row.className = 'pixel-btn';
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';

        const left = document.createElement('span');
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.style.gap = '6px';
        left.appendChild(SPRITES.createIconCanvas(SPRITES.getIconKeyForItem(id), 16));
        left.appendChild(document.createTextNode(`${item.name} (${count}개)`));

        row.appendChild(left);
        row.appendChild(document.createTextNode(`[${item.tags.join(',')}]`));

        row.addEventListener('click', () => {
          this.selectedIngredient = id;
          this.showToast(`[${item.name}] 선택됨! 넣을 조리도구를 터치하세요.`);
          this.closeModal();
        });
        box.appendChild(row);
      });
    });
  },

  openSeedModal(plotIdx) {
    this.openModal('심을 씨앗 선택', (box) => {
      const seeds = Object.entries(STATE.inventory).filter(([id]) => GAME_DATA.items[id]?.type === 'seed');
      if (seeds.length === 0) {
        box.textContent = '보유한 씨앗이 없습니다. 시장에서 계절 씨앗을 구매하세요!';
        return;
      }
      seeds.forEach(([id, count]) => {
        const seed = GAME_DATA.items[id];
        const btn = document.createElement('button');
        btn.className = 'pixel-btn';
        btn.textContent = `${seed.name} (${count}개) - 계절: ${seed.season.join(',')}`;
        btn.addEventListener('click', () => {
          if (!seed.season.includes(STATE.currentSeason)) {
            this.showToast(`현재 계절(${STATE.currentSeason})에는 심을 수 없는 씨앗입니다!`);
            this.closeModal();
            return;
          }
          if (STATE.removeItem(id, 1)) {
            STATE.farmPlots[plotIdx] = {
              cropId: seed.cropId,
              elapsed: 0,
              growSec: seed.growSec,
              ready: false
            };
            this.showToast(`${seed.name}을(를) 심었습니다!`);
            this.updateAll();
            this.closeModal();
          }
        });
        box.appendChild(btn);
      });
    });
  },

  openCoopModal() {
    this.openModal('닭장 관리', (box) => {
      const info = document.createElement('p');
      info.textContent = `현재 닭: ${STATE.chickens}마리 / 모인 달걀: ${STATE.eggsReady}개`;
      box.appendChild(info);

      const eggBtn = document.createElement('button');
      eggBtn.className = 'pixel-btn';
      eggBtn.textContent = `달걀 수확하기 (${STATE.eggsReady}개)`;
      eggBtn.addEventListener('click', () => {
        if (STATE.eggsReady > 0) {
          const n = STATE.eggsReady;
          STATE.addItem('egg', n);
          STATE.eggsReady = 0;
          this.showToast(`달걀 ${n}개를 얻었습니다!`);
          this.updateAll();
        } else {
          this.showToast('아직 낳은 달걀이 없습니다.');
        }
        this.closeModal();
      });
      box.appendChild(eggBtn);

      const meatBtn = document.createElement('button');
      meatBtn.className = 'pixel-btn accent';
      meatBtn.textContent = '닭고기 획득하기 (닭 1마리 감소)';
      meatBtn.addEventListener('click', () => {
        if (STATE.chickens > 0) {
          STATE.chickens--;
          STATE.addItem('chicken_meat', 2);
          this.showToast('닭고기 2개를 얻었습니다.');
          this.updateAll();
        } else {
          this.showToast('닭장에 닭이 없습니다. 시장에서 병아리를 구매하세요.');
        }
        this.closeModal();
      });
      box.appendChild(meatBtn);
    });
  },

  openRecipeBook() {
    this.openModal(`레시피북 (${STATE.discoveredRecipes.length}/${GAME_DATA.recipes.length})`, (box) => {
      GAME_DATA.recipes.forEach((r) => {
        const discovered = STATE.discoveredRecipes.includes(r.id);
        const card = document.createElement('div');
        card.className = 'hud-box';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'flex-start';

        if (discovered) {
          const toolName = GAME_DATA.tools[r.tool].name;
          const ingNames = r.ingredients.map((id) => GAME_DATA.items[id].name).join(' + ');
          card.innerHTML = `<strong>${r.name} (${r.price} G)</strong><span>도구: ${toolName} | 재료: ${ingNames}</span><span>특징: ${r.tags.join(', ')}</span>`;
        } else {
          card.innerHTML = `<strong>??? (미발견 레시피)</strong><span>힌트: [${r.tags[0]}] 속성의 요리</span>`;
        }
        box.appendChild(card);
      });
    });
  },

  openEncyclopedia() {
    this.openModal('재료 및 물고기 도감', (box) => {
      Object.entries(GAME_DATA.items).forEach(([id, item]) => {
        if (item.type === 'tool' || item.type === 'facility' || item.type === 'seed') return;
        const found = STATE.discoveredItems.includes(id);
        const row = document.createElement('div');
        row.className = 'hud-box';
        row.style.justifyContent = 'space-between';

        const left = document.createElement('span');
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.style.gap = '6px';
        left.appendChild(SPRITES.createIconCanvas(SPRITES.getIconKeyForItem(id), 16));
        left.appendChild(document.createTextNode(found ? `${item.name} [${item.category}]` : '???'));

        row.appendChild(left);
        row.appendChild(document.createTextNode(found ? `계절: ${item.season.join(',')}` : '미발견'));
        box.appendChild(row);
      });
    });
  },

  renderMarket() {
    const grid = document.getElementById('market-stalls');
    if (!grid) return;
    grid.innerHTML = '';

    const season = STATE.currentSeason;
    Object.entries(GAME_DATA.items).forEach(([id, item]) => {
      if (!item.price || item.price <= 0) return;
      if (item.season && !item.season.includes(season)) return;
      if (item.type === 'tool' && STATE.unlockedTools.includes(id)) return;
      if (id === 'expand_farm' && STATE.farmExpanded) return;

      const card = document.createElement('button');
      card.className = 'pixel-btn';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'center';
      card.style.gap = '4px';

      card.appendChild(SPRITES.createIconCanvas(SPRITES.getIconKeyForItem(id), 16));
      const label = document.createElement('span');
      label.textContent = `${item.name}`;
      const price = document.createElement('span');
      price.style.color = '#ffd43b';
      price.textContent = `${item.price} G`;

      card.appendChild(label);
      card.appendChild(price);

      card.addEventListener('click', () => {
        if (STATE.money < item.price) {
          this.showToast('골드가 부족합니다!');
          return;
        }
        STATE.money -= item.price;

        if (item.type === 'tool') {
          STATE.unlockedTools.push(id);
          this.showToast(`새 조리도구 [${item.name}] 구매 완료!`);
        } else if (id === 'kit_mushroom') {
          STATE.mushroomKits++;
          this.showToast('버섯 재배 키트를 밭 오른쪽 그늘에 설치했습니다!');
        } else if (id === 'item_chicken') {
          STATE.chickens++;
          this.showToast('닭장에 새 병아리가 추가되었습니다!');
        } else if (id === 'expand_farm') {
          STATE.farmExpanded = true;
          while (STATE.farmPlots.length < 16) STATE.farmPlots.push(null);
          this.showToast('밭이 4x4 크기로 넓어졌습니다!');
        } else {
          STATE.addItem(id, 1);
          this.showToast(`[${item.name}] 1개를 구매했습니다!`);
        }

        this.renderMarket();
        this.updateAll();
      });

      grid.appendChild(card);
    });
  },

  getCanvasCoords(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  },

  inRect(pt, rect) {
    return pt.x >= rect.x && pt.x <= rect.x + rect.w && pt.y >= rect.y && pt.y <= rect.y + rect.h;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  UI.init();
});
