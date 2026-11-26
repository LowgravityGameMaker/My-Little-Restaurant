
const SPRITES = {
  // 8x8 또는 16x16 도트 매트릭스 팔레트
  palette: {
    '.': null,
    'K': '#120d0a', // 검정 외곽선
    'W': '#ffffff', // 흰색
    'Y': '#ffd43b', // 노랑 (코인/옥수수/병아리)
    'O': '#f76707', // 주황 (당근/호박/불꽃)
    'R': '#e03131', // 빨강 (딸기/토마토/책갈피)
    'G': '#2f9e44', // 초록 (잎사귀/채소)
    'L': '#8ce99a', // 연두
    'B': '#1971c2', // 파랑 (물/물고기)
    'C': '#74c0fc', // 하늘색
    'N': '#8d5524', // 갈색 (나무/흙/도마)
    'D': '#4a2c11', // 진갈색
    'S': '#adb5bd', // 은색 (프라이팬/칼날)
    'P': '#fcc2d7'  // 분홍 (순무/피부)
  },

  // 아이콘 픽셀 맵 (8x8)
  icons: {
    coin: [
      '..KKKK..',
      '.KYYYYK.',
      'KYYWWYYK',
      'KYYWKYYK',
      'KYYWKYYK',
      'KYYYYYYK',
      '.KYYYYK.',
      '..KKKK..'
    ],
    book: [
      '.KKKKKK.',
      'KRRRRRRK',
      'KRWWWWWK',
      'KRRRRRRK',
      'KRWWWWWK',
      'KRRRRRRK',
      'KYYYYYYK',
      '.KKKKKK.'
    ],
    dex: [
      '.KKKKKK.',
      'KBBBBBBK',
      'KBCCCCBK',
      'KBCWWCBK',
      'KBCWWCBK',
      'KBCCCCBK',
      'KBBBBBBK',
      '.KKKKKK.'
    ],
    veg: [
      '...KK...',
      '..KGGK..',
      '.KRRRRK.',
      'KRRWRRRK',
      'KRRRRRRK',
      '.KRRRRK.',
      '..KKKK..',
      '........'
    ],
    fish: [
      '........',
      '..KKKK..',
      '.KBBBBKK',
      'KBWBBBBK',
      'KBBBBBBK',
      '.KBBBBKK',
      '..KKKK..',
      '........'
    ],
    meat: [
      '..KKKK..',
      '.KOOOOOK',
      'KOOOOOOK',
      '.KOOOOK.',
      '..KNNK..',
      '..KWWK..',
      '...KK...',
      '........'
    ],
    misc: [
      '..KKKK..',
      '.KWWWWK.',
      'KWYYYYWK',
      'KWYYYYWK',
      'KWYYYYWK',
      'KWWWWWWK',
      '.KKKKKK.',
      '........'
    ]
  },

  // 지정된 캔버스에 8x8 도트 아이콘 렌더링
  drawIcon(canvas, iconName) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const map = this.icons[iconName] || this.icons.misc;
    const scale = Math.floor(canvas.width / 8);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const ch = map[y][x];
        const color = this.palette[ch];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  },

  // 새 캔버스 엘리먼트를 만들어 도트 아이콘 반환
  createIconCanvas(iconName, size = 16) {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    c.className = 'pixel-icon';
    this.drawIcon(c, iconName);
    return c;
  },

  // 아이템 ID에 맞는 도트 아이콘 이름 매핑
  getIconKeyForItem(itemId) {
    const item = GAME_DATA.items[itemId];
    if (!item) return 'misc';
    if (item.type === 'fish') return 'fish';
    if (item.category === '채소' || item.category === '과일' || item.type === 'seed') return 'veg';
    if (item.category === '축산') return 'meat';
    return 'misc';
  },

  // 1. 조리대 배경 및 조리도구(위에서 내려다본 탑뷰) 그리기
  drawKitchen(ctx, w, h, state) {
    // 나무 조리대 타일 배경
    ctx.fillStyle = '#8d5524';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#734218';
    for (let y = 0; y < h; y += 16) {
      ctx.fillRect(0, y, w, 2);
    }

    // 상단 화구 및 조리 슬롯 영역
    const tools = state.unlockedTools;
    const slotW = 48;
    const slotH = 48;
    const positions = [
      { x: 14, y: 20 },
      { x: 66, y: 20 },
      { x: 118, y: 20 },
      { x: 40, y: 80 },
      { x: 92, y: 80 }
    ];

    state.toolSlots = [];

    tools.forEach((toolId, idx) => {
      const pos = positions[idx];
      if (!pos) return;
      state.toolSlots.push({ toolId, x: pos.x, y: pos.y, w: slotW, h: slotH });

      // 화구/작업대 받침
      ctx.fillStyle = '#2b211a';
      ctx.fillRect(pos.x, pos.y, slotW, slotH);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 2;
      ctx.strokeRect(pos.x, pos.y, slotW, slotH);

      // 도구별 도트 그래픽
      if (toolId === 'tool_pan') {
        ctx.fillStyle = '#495057';
        ctx.fillRect(pos.x + 10, pos.y + 8, 28, 28);
        ctx.fillStyle = '#212529';
        ctx.fillRect(pos.x + 14, pos.y + 12, 20, 20);
        ctx.fillRect(pos.x + 22, pos.y + 36, 4, 10); // 손잡이
      } else if (toolId === 'tool_board') {
        ctx.fillStyle = '#deb887';
        ctx.fillRect(pos.x + 8, pos.y + 10, 32, 28);
        ctx.fillStyle = '#adb5bd';
        ctx.fillRect(pos.x + 26, pos.y + 14, 4, 18); // 칼날
      } else if (toolId === 'tool_pot') {
        ctx.fillStyle = '#1971c2';
        ctx.fillRect(pos.x + 10, pos.y + 10, 28, 28);
        ctx.fillStyle = '#74c0fc';
        ctx.fillRect(pos.x + 14, pos.y + 14, 20, 20);
      } else if (toolId === 'tool_juicer') {
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(pos.x + 14, pos.y + 8, 20, 32);
        ctx.fillStyle = '#ffd43b';
        ctx.fillRect(pos.x + 18, pos.y + 12, 12, 14);
      } else if (toolId === 'tool_fryer') {
        ctx.fillStyle = '#868e96';
        ctx.fillRect(pos.x + 8, pos.y + 8, 32, 32);
        ctx.fillStyle = '#fcc419';
        ctx.fillRect(pos.x + 12, pos.y + 12, 24, 24);
      }

      // 도구 이름 라벨
      ctx.fillStyle = '#fff6e5';
      ctx.font = '8px monospace';
      ctx.fillText(GAME_DATA.tools[toolId].name, pos.x + 4, pos.y + slotH + 9);

      // 현재 도구 안에 들어간 재료 수 표시
      const inItems = state.cookingPotItems[toolId] || [];
      if (inItems.length > 0) {
        ctx.fillStyle = '#ffd43b';
        ctx.fillRect(pos.x + 34, pos.y + 2, 12, 12);
        ctx.fillStyle = '#120d0a';
        ctx.fillText(String(inItems.length), pos.x + 38, pos.y + 11);
      }
    });

    // 하단 왼쪽: 쓰레기통
    state.trashRect = { x: 14, y: h - 54, w: 40, h: 42 };
    ctx.fillStyle = '#495057';
    ctx.fillRect(14, h - 54, 40, 42);
    ctx.fillStyle = '#212529';
    ctx.fillRect(18, h - 46, 32, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.fillText('버리기', 20, h - 28);

    // 하단 오른쪽: 조리 실행 버튼
    state.cookBtnRect = { x: w - 68, y: h - 54, w: 54, h: 42 };
    ctx.fillStyle = '#2f9e44';
    ctx.fillRect(w - 68, h - 54, 54, 42);
    ctx.strokeStyle = '#120d0a';
    ctx.strokeRect(w - 68, h - 54, 54, 42);
    ctx.fillStyle = '#ffffff';
    ctx.font = '9px monospace';
    ctx.fillText('요리시작', w - 62, h - 30);
  },
  // 2. 식당 홀 (손님 3명 좌석 및 말풍선 요구사항) 그리기
  drawHall(ctx, w, h, state) {
    // 벽지와 바닥
    ctx.fillStyle = '#e9d8a6';
    ctx.fillRect(0, 0, w, h * 0.55);
    ctx.fillStyle = '#6f4e37';
    ctx.fillRect(0, h * 0.55, w, h * 0.45);

    // 카운터 테이블
    ctx.fillStyle = '#4a2c11';
    ctx.fillRect(0, h * 0.62, w, 18);

    // 손님 슬롯 3개
    state.customerRects = [];
    for (let i = 0; i < 3; i++) {
      const cx = 18 + i * 54;
      const cy = 68;
      state.customerRects.push({ index: i, x: cx - 4, y: cy - 35, w: 46, h: 90 });

      const cust = state.customers[i];
      if (!cust) {
        // 빈 의자
        ctx.fillStyle = '#3b2d24';
        ctx.fillRect(cx + 8, cy + 28, 22, 16);
        continue;
      }

      // 도트 손님 캐릭터
      ctx.fillStyle = cust.shirtColor;
      ctx.fillRect(cx + 6, cy + 20, 26, 26); // 몸통
      ctx.fillStyle = '#fcc2d7';
      ctx.fillRect(cx + 9, cy + 4, 20, 18);  // 얼굴
      ctx.fillStyle = '#120d0a';
      ctx.fillRect(cx + 13, cy + 11, 3, 3);  // 왼쪽 눈
      ctx.fillRect(cx + 22, cy + 11, 3, 3);  // 오른쪽 눈

      // 머리 위 요구사항 말풍선
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 4, cy - 32, 46, 24);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 4, cy - 32, 46, 24);

      ctx.fillStyle = '#120d0a';
      ctx.font = '8px monospace';
      ctx.fillText(cust.wantTag, cx + 1, cy - 17);
    }
  },

  // 3. 밭, 닭장, 버섯 그늘 그리기
  drawFarm(ctx, w, h, state) {
    // 잔디 배경
    ctx.fillStyle = '#40916c';
    ctx.fillRect(0, 0, w, h);

    // 왼쪽: 닭장
    state.coopRect = { x: 8, y: 20, w: 42, h: 70 };
    ctx.fillStyle = '#a47148';
    ctx.fillRect(8, 20, 42, 70);
    ctx.strokeStyle = '#120d0a';
    ctx.strokeRect(8, 20, 42, 70);
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.fillText('닭장', 18, 34);
    ctx.fillText(`닭:${state.chickens}마리`, 11, 50);
    ctx.fillStyle = '#ffd43b';
    ctx.fillText(`알:${state.eggsReady}개`, 13, 66);

    // 오른쪽: 버섯 재배 그늘
    state.mushroomRect = { x: w - 50, y: 20, w: 42, h: 70 };
    ctx.fillStyle = '#2d3a3a';
    ctx.fillRect(w - 50, 20, 42, 70);
    ctx.strokeStyle = '#120d0a';
    ctx.strokeRect(w - 50, 20, 42, 70);
    ctx.fillStyle = '#e9ecef';
    ctx.fillText('버섯그늘', w - 47, 34);
    ctx.fillText(`키트:${state.mushroomKits}`, w - 47, 50);
    if (state.mushroomsReady > 0) {
      ctx.fillStyle = '#ffd43b';
      ctx.fillText(`수확:${state.mushroomsReady}`, w - 47, 66);
    }

    // 중앙: 밭 타일 (3x3 또는 확장 시 4x4)
    const gridSize = state.farmExpanded ? 4 : 3;
    const cellSize = state.farmExpanded ? 26 : 32;
    const startX = Math.floor((w - gridSize * (cellSize + 4)) / 2);
    const startY = 105;

    state.farmCellRects = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const idx = r * gridSize + c;
        const x = startX + c * (cellSize + 4);
        const y = startY + r * (cellSize + 4);
        state.farmCellRects.push({ idx, x, y, w: cellSize, h: cellSize });

        const plot = state.farmPlots[idx];
        ctx.fillStyle = plot ? '#5c3a21' : '#7f4f24';
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = '#120d0a';
        ctx.strokeRect(x, y, cellSize, cellSize);

        if (plot) {
          if (plot.ready) {
            // 수확 가능 작물 도트
            ctx.fillStyle = '#2f9e44';
            ctx.fillRect(x + 8, y + 4, cellSize - 16, 6);
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(x + 6, y + 10, cellSize - 12, cellSize - 14);
          } else {
            // 자라는 중인 새싹
            ctx.fillStyle = '#8ce99a';
            ctx.fillRect(x + cellSize / 2 - 3, y + cellSize / 2 - 3, 6, 6);
          }
        }
      }
    }
  },

  // 4. 낚시터 그리기
  drawFishing(ctx, w, h, state) {
    // 하늘과 강물
    ctx.fillStyle = '#74c0fc';
    ctx.fillRect(0, 0, w, 75);
    ctx.fillStyle = '#1971c2';
    ctx.fillRect(0, 75, w, h - 75);

    // 나무 부두
    ctx.fillStyle = '#8d5524';
    ctx.fillRect(0, 65, 65, 22);

    // 낚시 찌 애니메이션
    if (state.isFishing) {
      const bobY = state.fishBite ? 132 : 125;
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(60, 68);
      ctx.lineTo(105, bobY);
      ctx.stroke();

      ctx.fillStyle = state.fishBite ? '#ffd43b' : '#e03131';
      ctx.fillRect(102, bobY, 6, 6);

      if (state.fishBite) {
        ctx.fillStyle = '#ffd43b';
        ctx.font = '10px monospace';
        ctx.fillText('입질 왔다! 터치!', 65, 110);
      }
    }

    // 통발 표시
    if (state.trapActive) {
      ctx.fillStyle = '#495057';
      ctx.fillRect(25, 175, 22, 16);
      ctx.fillStyle = state.trapReady ? '#ffd43b' : '#ffffff';
      ctx.font = '8px monospace';
      ctx.fillText(state.trapReady ? '통발 완료!' : '통발 대기중', 16, 202);
    }
  },

  // 5. 시장 상단 배너 그리기
  drawMarketBanner(ctx, w, h, season) {
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(0, 0, w, h);

    // 줄무늬 천막 지붕
    for (let x = 0; x < w; x += 20) {
      ctx.fillStyle = (x / 20) % 2 === 0 ? '#e03131' : '#fff9db';
      ctx.fillRect(x, 0, 20, 32);
    }
    ctx.fillStyle = '#120d0a';
    ctx.font = '10px monospace';
    ctx.fillText(`[${season} 시장 가판대]`, 45, 58);
    ctx.fillText('원하는 물품을 터치해 구매하세요', 16, 76);
  }
};
