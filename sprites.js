const SPRITES = {
  palette: {
    '.': null,
    'K': '#120d0a',
    'W': '#ffffff',
    'Y': '#ffd43b',
    'O': '#f76707',
    'R': '#e03131',
    'G': '#2f9e44',
    'L': '#8ce99a',
    'B': '#1971c2',
    'C': '#74c0fc',
    'N': '#8d5524',
    'D': '#4a2c11',
    'S': '#adb5bd',
    'P': '#fcc2d7'
  },

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

  createIconCanvas(iconName, size = 16) {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    c.className = 'pixel-icon';
    this.drawIcon(c, iconName);
    return c;
  },

  getIconKeyForItem(itemId) {
    const item = GAME_DATA.items[itemId];
    if (!item) return 'misc';
    if (item.type === 'fish') return 'fish';
    if (item.category === '채소' || item.category === '과일' || item.type === 'seed') return 'veg';
    if (item.category === '축산') return 'meat';
    return 'misc';
  },

  drawKitchen(ctx, w, h, state) {
    ctx.fillStyle = '#8d5524';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#734218';
    for (let y = 0; y < h; y += 48) {
      ctx.fillRect(0, y, w, 6);
    }

    const tools = state.unlockedTools;
    const slotW = 144;
    const slotH = 144;
    const positions = [
      { x: 36, y: 45 },
      { x: 198, y: 45 },
      { x: 360, y: 45 },
      { x: 114, y: 245 },
      { x: 282, y: 245 }
    ];

    state.toolSlots = [];

    tools.forEach((toolId, idx) => {
      const pos = positions[idx];
      if (!pos) return;
      state.toolSlots.push({ toolId, x: pos.x, y: pos.y, w: slotW, h: slotH });

      ctx.fillStyle = '#2b211a';
      ctx.fillRect(pos.x, pos.y, slotW, slotH);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 6;
      ctx.strokeRect(pos.x, pos.y, slotW, slotH);

      if (toolId === 'tool_pan') {
        ctx.fillStyle = '#495057';
        ctx.fillRect(pos.x + 30, pos.y + 24, 84, 84);
        ctx.fillStyle = '#212529';
        ctx.fillRect(pos.x + 42, pos.y + 36, 60, 60);
        ctx.fillRect(pos.x + 66, pos.y + 108, 12, 30);
      } else if (toolId === 'tool_board') {
        ctx.fillStyle = '#deb887';
        ctx.fillRect(pos.x + 24, pos.y + 30, 96, 84);
        ctx.fillStyle = '#adb5bd';
        ctx.fillRect(pos.x + 78, pos.y + 42, 12, 54);
      } else if (toolId === 'tool_pot') {
        ctx.fillStyle = '#1971c2';
        ctx.fillRect(pos.x + 30, pos.y + 30, 84, 84);
        ctx.fillStyle = '#74c0fc';
        ctx.fillRect(pos.x + 42, pos.y + 42, 60, 60);
      } else if (toolId === 'tool_juicer') {
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(pos.x + 42, pos.y + 24, 60, 96);
        ctx.fillStyle = '#ffd43b';
        ctx.fillRect(pos.x + 54, pos.y + 36, 36, 42);
      } else if (toolId === 'tool_fryer') {
        ctx.fillStyle = '#868e96';
        ctx.fillRect(pos.x + 24, pos.y + 24, 96, 96);
        ctx.fillStyle = '#fcc419';
        ctx.fillRect(pos.x + 36, pos.y + 36, 72, 72);
      }

      ctx.fillStyle = '#fff6e5';
      ctx.font = 'bold 24px Malgun Gothic, sans-serif';
      ctx.fillText(GAME_DATA.tools[toolId].name, pos.x + 6, pos.y + slotH + 30);

      const inItems = state.cookingPotItems[toolId] || [];
      if (inItems.length > 0) {
        ctx.fillStyle = '#ffd43b';
        ctx.fillRect(pos.x + 102, pos.y + 6, 36, 36);
        ctx.fillStyle = '#120d0a';
        ctx.font = 'bold 24px Malgun Gothic, sans-serif';
        ctx.fillText(String(inItems.length), pos.x + 112, pos.y + 33);
      }
    });

    state.trashRect = { x: 36, y: h - 155, w: 130, h: 120 };
    ctx.fillStyle = '#495057';
    ctx.fillRect(36, h - 155, 130, 120);
    ctx.fillStyle = '#212529';
    ctx.fillRect(48, h - 135, 106, 84);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Malgun Gothic, sans-serif';
    ctx.fillText('버리기', 65, h - 85);

    state.cookBtnRect = { x: w - 198, y: h - 155, w: 162, h: 120 };
    ctx.fillStyle = '#2f9e44';
    ctx.fillRect(w - 198, h - 155, 162, 120);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(w - 198, h - 155, 162, 120);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px Malgun Gothic, sans-serif';
    ctx.fillText('요리시작', w - 168, h - 85);
  },
  drawHall(ctx, w, h, state) {
    ctx.fillStyle = '#e9d8a6';
    ctx.fillRect(0, 0, w, h * 0.55);
    ctx.fillStyle = '#6f4e37';
    ctx.fillRect(0, h * 0.55, w, h * 0.45);

    ctx.fillStyle = '#4a2c11';
    ctx.fillRect(0, h * 0.62, w, 54);

    state.customerRects = [];
    for (let i = 0; i < 3; i++) {
      const cx = 48 + i * 165;
      const cy = 210;
      state.customerRects.push({ index: i, x: cx - 15, y: cy - 110, w: 144, h: 270 });

      const cust = state.customers[i];
      if (!cust) {
        ctx.fillStyle = '#3b2d24';
        ctx.fillRect(cx + 24, cy + 84, 66, 48);
        continue;
      }

      ctx.fillStyle = cust.shirtColor;
      ctx.fillRect(cx + 18, cy + 60, 78, 78);
      ctx.fillStyle = '#fcc2d7';
      ctx.fillRect(cx + 27, cy + 12, 60, 54);
      ctx.fillStyle = '#120d0a';
      ctx.fillRect(cx + 39, cy + 33, 9, 9);
      ctx.fillRect(cx + 66, cy + 33, 9, 9);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 15, cy - 102, 144, 72);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 6;
      ctx.strokeRect(cx - 15, cy - 102, 144, 72);

      ctx.fillStyle = '#120d0a';
      ctx.font = 'bold 25px Malgun Gothic, sans-serif';
      ctx.fillText(cust.wantTag, cx + 6, cy - 56);
    }
  },

  drawFarm(ctx, w, h, state) {
    ctx.fillStyle = '#40916c';
    ctx.fillRect(0, 0, w, h);

    state.coopRect = { x: 24, y: 40, w: 144, h: 200 };
    ctx.fillStyle = '#a47148';
    ctx.fillRect(24, 40, 144, 200);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 40, 144, 200);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Malgun Gothic, sans-serif';
    ctx.fillText('닭장', 70, 82);
    ctx.font = 'bold 22px Malgun Gothic, sans-serif';
    ctx.fillText(`닭:${state.chickens}마리`, 38, 135);
    ctx.fillStyle = '#ffd43b';
    ctx.fillText(`알:${state.eggsReady}개`, 42, 185);

    state.mushroomRect = { x: w - 168, y: 40, w: 144, h: 200 };
    ctx.fillStyle = '#2d3a3a';
    ctx.fillRect(w - 168, 40, 144, 200);
    ctx.strokeStyle = '#120d0a';
    ctx.strokeRect(w - 168, 40, 144, 200);
    ctx.fillStyle = '#e9ecef';
    ctx.font = 'bold 24px Malgun Gothic, sans-serif';
    ctx.fillText('버섯그늘', w - 144, 82);
    ctx.font = 'bold 22px Malgun Gothic, sans-serif';
    ctx.fillText(`키트:${state.mushroomKits}`, w - 144, 135);
    if (state.mushroomsReady > 0) {
      ctx.fillStyle = '#ffd43b';
      ctx.fillText(`수확:${state.mushroomsReady}`, w - 144, 185);
    }

    const gridSize = state.farmExpanded ? 4 : 3;
    const cellSize = state.farmExpanded ? 82 : 102;
    const startX = Math.floor((w - gridSize * (cellSize + 12)) / 2);
    const startY = 280;

    state.farmCellRects = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const idx = r * gridSize + c;
        const x = startX + c * (cellSize + 12);
        const y = startY + r * (cellSize + 12);
        state.farmCellRects.push({ idx, x, y, w: cellSize, h: cellSize });

        const plot = state.farmPlots[idx];
        ctx.fillStyle = plot ? '#5c3a21' : '#7f4f24';
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = '#120d0a';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, cellSize, cellSize);

        if (plot) {
          if (plot.ready) {
            ctx.fillStyle = '#2f9e44';
            ctx.fillRect(x + 24, y + 12, cellSize - 48, 18);
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(x + 18, y + 30, cellSize - 36, cellSize - 42);
          } else {
            ctx.fillStyle = '#8ce99a';
            ctx.fillRect(x + cellSize / 2 - 9, y + cellSize / 2 - 9, 18, 18);
          }
        }
      }
    }
  },

  drawFishing(ctx, w, h, state) {
    ctx.fillStyle = '#74c0fc';
    ctx.fillRect(0, 0, w, 210);
    ctx.fillStyle = '#1971c2';
    ctx.fillRect(0, 210, w, h - 210);

    ctx.fillStyle = '#8d5524';
    ctx.fillRect(0, 185, 195, 66);

    if (state.isFishing) {
      const bobY = state.fishBite ? 390 : 370;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(180, 195);
      ctx.lineTo(315, bobY);
      ctx.stroke();

      ctx.fillStyle = state.fishBite ? '#ffd43b' : '#e03131';
      ctx.fillRect(305, bobY, 22, 22);

      if (state.fishBite) {
        ctx.fillStyle = '#ffd43b';
        ctx.font = 'bold 30px Malgun Gothic, sans-serif';
        ctx.fillText('입질 왔다! 화면 터치!', 150, 320);
      }
    }

    if (state.trapActive) {
      ctx.fillStyle = '#495057';
      ctx.fillRect(75, 500, 72, 50);
      ctx.fillStyle = state.trapReady ? '#ffd43b' : '#ffffff';
      ctx.font = 'bold 24px Malgun Gothic, sans-serif';
      ctx.fillText(state.trapReady ? '통발 수확 가능!' : '통발 대기중...', 40, 590);
    }
  },

  drawMarketBanner(ctx, w, h, season) {
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(0, 0, w, h);

    for (let x = 0; x < w; x += 60) {
      ctx.fillStyle = (x / 60) % 2 === 0 ? '#e03131' : '#fff9db';
      ctx.fillRect(x, 0, 60, 75);
    }
    ctx.fillStyle = '#120d0a';
    ctx.font = 'bold 28px Malgun Gothic, sans-serif';
    ctx.fillText(`[${season} 시장 가판대]`, 145, 135);
    ctx.font = 'bold 21px Malgun Gothic, sans-serif';
    ctx.fillText('원하는 물품을 터치해 구매하세요', 110, 180);
  }
};
