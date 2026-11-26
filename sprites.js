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
    for (let y = 0; y < h; y += 32) {
      ctx.fillRect(0, y, w, 4);
    }

    const tools = state.unlockedTools;
    const slotW = 96;
    const slotH = 96;
    const positions = [
      { x: 24, y: 30 },
      { x: 132, y: 30 },
      { x: 240, y: 30 },
      { x: 76, y: 165 },
      { x: 188, y: 165 }
    ];

    state.toolSlots = [];

    tools.forEach((toolId, idx) => {
      const pos = positions[idx];
      if (!pos) return;
      state.toolSlots.push({ toolId, x: pos.x, y: pos.y, w: slotW, h: slotH });

      ctx.fillStyle = '#2b211a';
      ctx.fillRect(pos.x, pos.y, slotW, slotH);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(pos.x, pos.y, slotW, slotH);

      if (toolId === 'tool_pan') {
        ctx.fillStyle = '#495057';
        ctx.fillRect(pos.x + 20, pos.y + 16, 56, 56);
        ctx.fillStyle = '#212529';
        ctx.fillRect(pos.x + 28, pos.y + 24, 40, 40);
        ctx.fillRect(pos.x + 44, pos.y + 72, 8, 20);
      } else if (toolId === 'tool_board') {
        ctx.fillStyle = '#deb887';
        ctx.fillRect(pos.x + 16, pos.y + 20, 64, 56);
        ctx.fillStyle = '#adb5bd';
        ctx.fillRect(pos.x + 52, pos.y + 28, 8, 36);
      } else if (toolId === 'tool_pot') {
        ctx.fillStyle = '#1971c2';
        ctx.fillRect(pos.x + 20, pos.y + 20, 56, 56);
        ctx.fillStyle = '#74c0fc';
        ctx.fillRect(pos.x + 28, pos.y + 28, 40, 40);
      } else if (toolId === 'tool_juicer') {
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(pos.x + 28, pos.y + 16, 40, 64);
        ctx.fillStyle = '#ffd43b';
        ctx.fillRect(pos.x + 36, pos.y + 24, 24, 28);
      } else if (toolId === 'tool_fryer') {
        ctx.fillStyle = '#868e96';
        ctx.fillRect(pos.x + 16, pos.y + 16, 64, 64);
        ctx.fillStyle = '#fcc419';
        ctx.fillRect(pos.x + 24, pos.y + 24, 48, 48);
      }

      ctx.fillStyle = '#fff6e5';
      ctx.font = '16px Galmuri9, sans-serif';
      ctx.fillText(GAME_DATA.tools[toolId].name, pos.x + 4, pos.y + slotH + 20);

      const inItems = state.cookingPotItems[toolId] || [];
      if (inItems.length > 0) {
        ctx.fillStyle = '#ffd43b';
        ctx.fillRect(pos.x + 68, pos.y + 4, 24, 24);
        ctx.fillStyle = '#120d0a';
        ctx.font = 'bold 16px Galmuri9, sans-serif';
        ctx.fillText(String(inItems.length), pos.x + 75, pos.y + 22);
      }
    });

    state.trashRect = { x: 24, y: h - 105, w: 84, h: 80 };
    ctx.fillStyle = '#495057';
    ctx.fillRect(24, h - 105, 84, 80);
    ctx.fillStyle = '#212529';
    ctx.fillRect(32, h - 90, 68, 56);
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Galmuri9, sans-serif';
    ctx.fillText('버리기', 42, h - 55);

    state.cookBtnRect = { x: w - 132, y: h - 105, w: 108, h: 80 };
    ctx.fillStyle = '#2f9e44';
    ctx.fillRect(w - 132, h - 105, 108, 80);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 4;
    ctx.strokeRect(w - 132, h - 105, 108, 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Galmuri9, sans-serif';
    ctx.fillText('요리시작', w - 116, h - 58);
  },
  drawHall(ctx, w, h, state) {
    ctx.fillStyle = '#e9d8a6';
    ctx.fillRect(0, 0, w, h * 0.55);
    ctx.fillStyle = '#6f4e37';
    ctx.fillRect(0, h * 0.55, w, h * 0.45);

    ctx.fillStyle = '#4a2c11';
    ctx.fillRect(0, h * 0.62, w, 36);

    state.customerRects = [];
    for (let i = 0; i < 3; i++) {
      const cx = 32 + i * 110;
      const cy = 140;
      state.customerRects.push({ index: i, x: cx - 10, y: cy - 75, w: 96, h: 180 });

      const cust = state.customers[i];
      if (!cust) {
        ctx.fillStyle = '#3b2d24';
        ctx.fillRect(cx + 16, cy + 56, 44, 32);
        continue;
      }

      ctx.fillStyle = cust.shirtColor;
      ctx.fillRect(cx + 12, cy + 40, 52, 52);
      ctx.fillStyle = '#fcc2d7';
      ctx.fillRect(cx + 18, cy + 8, 40, 36);
      ctx.fillStyle = '#120d0a';
      ctx.fillRect(cx + 26, cy + 22, 6, 6);
      ctx.fillRect(cx + 44, cy + 22, 6, 6);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 10, cy - 68, 96, 48);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(cx - 10, cy - 68, 96, 48);

      ctx.fillStyle = '#120d0a';
      ctx.font = 'bold 17px Galmuri9, sans-serif';
      ctx.fillText(cust.wantTag, cx + 4, cy - 38);
    }
  },

  drawFarm(ctx, w, h, state) {
    ctx.fillStyle = '#40916c';
    ctx.fillRect(0, 0, w, h);

    state.coopRect = { x: 16, y: 30, w: 96, h: 140 };
    ctx.fillStyle = '#a47148';
    ctx.fillRect(16, 30, 96, 140);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 30, 96, 140);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Galmuri9, sans-serif';
    ctx.fillText('닭장', 46, 58);
    ctx.font = '15px Galmuri9, sans-serif';
    ctx.fillText(`닭:${state.chickens}마리`, 24, 92);
    ctx.fillStyle = '#ffd43b';
    ctx.fillText(`알:${state.eggsReady}개`, 28, 126);

    state.mushroomRect = { x: w - 112, y: 30, w: 96, h: 140 };
    ctx.fillStyle = '#2d3a3a';
    ctx.fillRect(w - 112, 30, 96, 140);
    ctx.strokeStyle = '#120d0a';
    ctx.strokeRect(w - 112, 30, 96, 140);
    ctx.fillStyle = '#e9ecef';
    ctx.font = 'bold 16px Galmuri9, sans-serif';
    ctx.fillText('버섯그늘', w - 98, 58);
    ctx.font = '15px Galmuri9, sans-serif';
    ctx.fillText(`키트:${state.mushroomKits}`, w - 98, 92);
    if (state.mushroomsReady > 0) {
      ctx.fillStyle = '#ffd43b';
      ctx.fillText(`수확:${state.mushroomsReady}`, w - 98, 126);
    }

    const gridSize = state.farmExpanded ? 4 : 3;
    const cellSize = state.farmExpanded ? 54 : 68;
    const startX = Math.floor((w - gridSize * (cellSize + 8)) / 2);
    const startY = 200;

    state.farmCellRects = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const idx = r * gridSize + c;
        const x = startX + c * (cellSize + 8);
        const y = startY + r * (cellSize + 8);
        state.farmCellRects.push({ idx, x, y, w: cellSize, h: cellSize });

        const plot = state.farmPlots[idx];
        ctx.fillStyle = plot ? '#5c3a21' : '#7f4f24';
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = '#120d0a';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, cellSize, cellSize);

        if (plot) {
          if (plot.ready) {
            ctx.fillStyle = '#2f9e44';
            ctx.fillRect(x + 16, y + 8, cellSize - 32, 12);
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(x + 12, y + 20, cellSize - 24, cellSize - 28);
          } else {
            ctx.fillStyle = '#8ce99a';
            ctx.fillRect(x + cellSize / 2 - 6, y + cellSize / 2 - 6, 12, 12);
          }
        }
      }
    }
  },

  drawFishing(ctx, w, h, state) {
    ctx.fillStyle = '#74c0fc';
    ctx.fillRect(0, 0, w, 150);
    ctx.fillStyle = '#1971c2';
    ctx.fillRect(0, 150, w, h - 150);

    ctx.fillStyle = '#8d5524';
    ctx.fillRect(0, 130, 130, 44);

    if (state.isFishing) {
      const bobY = state.fishBite ? 264 : 250;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(120, 136);
      ctx.lineTo(210, bobY);
      ctx.stroke();

      ctx.fillStyle = state.fishBite ? '#ffd43b' : '#e03131';
      ctx.fillRect(204, bobY, 14, 14);

      if (state.fishBite) {
        ctx.fillStyle = '#ffd43b';
        ctx.font = 'bold 20px Galmuri9, sans-serif';
        ctx.fillText('입질 왔다! 화면 터치!', 110, 220);
      }
    }

    if (state.trapActive) {
      ctx.fillStyle = '#495057';
      ctx.fillRect(50, 350, 48, 34);
      ctx.fillStyle = state.trapReady ? '#ffd43b' : '#ffffff';
      ctx.font = 'bold 16px Galmuri9, sans-serif';
      ctx.fillText(state.trapReady ? '통발 수확 가능!' : '통발 대기중...', 26, 410);
    }
  },

  drawMarketBanner(ctx, w, h, season) {
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(0, 0, w, h);

    for (let x = 0; x < w; x += 40) {
      ctx.fillStyle = (x / 40) % 2 === 0 ? '#e03131' : '#fff9db';
      ctx.fillRect(x, 0, 40, 56);
    }
    ctx.fillStyle = '#120d0a';
    ctx.font = 'bold 20px Galmuri9, sans-serif';
    ctx.fillText(`[${season} 시장 가판대]`, 92, 98);
    ctx.font = '15px Galmuri9, sans-serif';
    ctx.fillText('원하는 물품을 터치해 구매하세요', 66, 130);
  }
};
