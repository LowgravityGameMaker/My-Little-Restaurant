const SPRITES = {
  palette: {
    '.': null,
    'K': '#120d0a',
    'W': '#ffffff',
    'Y': '#ffd43b',
    'A': '#f59f00',
    'O': '#f76707',
    'R': '#e03131',
    'M': '#a61e4d',
    'G': '#2f9e44',
    'L': '#8ce99a',
    'D': '#1b4332',
    'B': '#1971c2',
    'C': '#74c0fc',
    'N': '#8d5524',
    'T': '#c68642',
    'E': '#4a2c11',
    'S': '#adb5bd',
    'H': '#495057',
    'P': '#fcc2d7'
  },

  art16: {
    chicken: [
      '......RR........',
      '.....RRRR.......',
      '....KWWWWK......',
      '...KWWWWWWK.....',
      '..YYWWWWKWWK....',
      '..YYWWWWWWWK....',
      '...KWWWWWWWK....',
      '....KWWWWWWWK...',
      '...KWWWWWWWWWK..',
      '..KWWSSSSWWWWWK.',
      '..KWWWWWWWWWWWK.',
      '...KWWWWWWWWWK..',
      '....KKKKKKKKK...',
      '.....Y.....Y....',
      '....YYY...YYY...',
      '................'
    ],
    mushroom: [
      '....KKKKKKKK....',
      '..KKNNNNNNNNKK..',
      '.KNNTTNNNNTTNNK.',
      'KNNNNNNNNNNNNNNK',
      'KNNNNTTNNNNNNNNK',
      'KNNNNNNNNTTNNNNK',
      'KNNNNNNNNNNNNNNK',
      '.KKKKKKKKKKKKKK.',
      '.....KWWWWK.....',
      '.....KWSSWK.....',
      '.....KWSSWK.....',
      '.....KWSSWK.....',
      '......KKKK......',
      '................',
      '................',
      '................'
    ],
    crop_berry: [
      '......GGGG......',
      '....GGLLLLGG....',
      '...GLLGGGGLLG...',
      '....KKKKKKKK....',
      '...KRRRRRRRRK...',
      '..KRRWRRRRRRRK..',
      '..KRRRRRYRRRRK..',
      '..KRRRRRRRRRRK..',
      '...KRRRYRRRRK...',
      '...KRRRRRRRRK...',
      '....KRRRRRRK....',
      '.....KRRRRK.....',
      '......KKKK......',
      '................',
      '................',
      '................'
    ],
    sprout: [
      '................',
      '................',
      '................',
      '................',
      '....KK....KK....',
      '...KLLK..KLLK...',
      '..KLGGLKKLGGLK..',
      '..KGGGGKKGGGGK..',
      '...KKKKKKKKKK...',
      '.......KK.......',
      '.......KK.......',
      '......KKKK......',
      '................',
      '................',
      '................',
      '................'
    ],
    tool_pan: [
      '....KKKKKKKK....',
      '..KKHHHHHHHHKK..',
      '.KHSSSSSSSSSSHK.',
      'KHSSHHHHHHHHSSHK',
      'KHSKKKKKKKKKKSHK',
      'KHSKKKKKKKKKKSHK',
      'KHSKKKKKKKKKKSHK',
      'KHSKKKKKKKKKKSHK',
      '.KHSSSSSSSSSSHK.',
      '..KKHHHHHHHHKK..',
      '....KKKKKKKK....',
      '.......KK.......',
      '.......KNK......',
      '.......KNK......',
      '.......KNK......',
      '........K.......'
    ],
    tool_board: [
      '................',
      '.KKKKKKKKKKKKKK.',
      'KTTTTTTTTTTTTTTK',
      'KTNNNNNNNNNNNNTK',
      'KTNNKKKKKKKKNNTK',
      'KTNNKSSSSSSKNNTK',
      'KTNNKSSSSSSKNNTK',
      'KTNNKKKKKKKKNNTK',
      'KTNNNNNNNNNNNNTK',
      'KTNNNNNNNNNNNNTK',
      'KTTTTTTTTTTTTTTK',
      '.KKKKKKKKKKKKKK.',
      '................',
      '................',
      '................',
      '................'
    ],
    tool_pot: [
      '.....W....W.....',
      '....W......W....',
      '....KKKKKKKK....',
      '..KKCCCCCCCCKK..',
      'KKBBWWWWWWWWBBKK',
      'KBBCCCCCCCCCCBBK',
      'KBBBBBBBBBBBBBBK',
      'KBBBBBBBBBBBBBBK',
      'KBBBBBBBBBBBBBBK',
      '.KBBBBBBBBBBBBK.',
      '..KKKKKKKKKKKK..',
      '................',
      '................',
      '................',
      '................',
      '................'
    ],
    tool_juicer: [
      '.....KKKKKK.....',
      '....KHHHHHHK....',
      '.....KCCCCK.....',
      '.....KCWWCK.....',
      '.....KYYYYK.....',
      '.....KYYYYK.....',
      '.....KAAAAK.....',
      '....KKKKKKKK....',
      '...KWWWWWWWWK...',
      '...KWWRGGWWWK...',
      '...KWWWWWWWWK...',
      '....KKKKKKKK....',
      '................',
      '................',
      '................',
      '................'
    ],
    tool_fryer: [
      '......KKKK......',
      '.....KHHHHK.....',
      '..KKKKKKKKKKKK..',
      '.KSSSSSSSSSSSSK.',
      '.KSKKKKKKKKKKSK.',
      '.KSKYYYYYYYYKSK.',
      '.KSKYAYAYAYAKSK.',
      '.KSKYYYYYYYYKSK.',
      '.KSKKKKKKKKKKSK.',
      '.KSSSSSSSSSSSSK.',
      '..KKKKKKKKKKKK..',
      '................',
      '................',
      '................',
      '................',
      '................'
    ]
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

  drawPixelArt(ctx, artKey, startX, startY, pixelSize = 6) {
    const map = this.art16[artKey];
    if (!map) return;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const ch = map[y][x];
        const color = this.palette[ch];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(
            Math.floor(startX + x * pixelSize),
            Math.floor(startY + y * pixelSize),
            pixelSize,
            pixelSize
          );
        }
      }
    }
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
    ctx.fillStyle = '#9c6644';
    ctx.fillRect(0, 0, w, h);

    for (let y = 0; y < h; y += 60) {
      ctx.fillStyle = '#7f5539';
      ctx.fillRect(0, y, w, 6);
      ctx.fillStyle = '#b08968';
      ctx.fillRect(0, y + 6, w, 4);
    }

    ctx.fillStyle = '#343a40';
    ctx.fillRect(16, 20, w - 32, 430);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(16, 20, w - 32, 430);

    const tools = state.unlockedTools;
    const slotW = 148;
    const slotH = 148;
    const positions = [
      { x: 32, y: 40 },
      { x: 196, y: 40 },
      { x: 360, y: 40 },
      { x: 112, y: 245 },
      { x: 280, y: 245 }
    ];

    state.toolSlots = [];

    tools.forEach((toolId, idx) => {
      const pos = positions[idx];
      if (!pos) return;
      state.toolSlots.push({ toolId, x: pos.x, y: pos.y, w: slotW, h: slotH });

      ctx.fillStyle = '#212529';
      ctx.fillRect(pos.x, pos.y, slotW, slotH);
      ctx.fillStyle = '#495057';
      ctx.fillRect(pos.x + 8, pos.y + 8, slotW - 16, slotH - 16);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 5;
      ctx.strokeRect(pos.x, pos.y, slotW, slotH);

      this.drawPixelArt(ctx, toolId, pos.x + 18, pos.y + 18, 7);

      ctx.fillStyle = '#120d0a';
      ctx.fillRect(pos.x + 8, pos.y + slotH + 6, slotW - 16, 30);
      ctx.fillStyle = '#fff6e5';
      ctx.font = 'bold 20px Malgun Gothic, sans-serif';
      ctx.fillText(GAME_DATA.tools[toolId].name, pos.x + 16, pos.y + slotH + 28);

      const inItems = state.cookingPotItems[toolId] || [];
      if (inItems.length > 0) {
        ctx.fillStyle = '#ffd43b';
        ctx.fillRect(pos.x + 104, pos.y + 8, 36, 36);
        ctx.strokeStyle = '#120d0a';
        ctx.lineWidth = 4;
        ctx.strokeRect(pos.x + 104, pos.y + 8, 36, 36);
        ctx.fillStyle = '#120d0a';
        ctx.font = 'bold 22px Malgun Gothic, sans-serif';
        ctx.fillText(String(inItems.length), pos.x + 115, pos.y + 34);
      }
    });

    state.trashRect = { x: 32, y: h - 160, w: 140, h: 125 };
    ctx.fillStyle = '#495057';
    ctx.fillRect(32, h - 160, 140, 125);
    ctx.fillStyle = '#868e96';
    ctx.fillRect(26, h - 168, 152, 20);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(32, h - 160, 140, 125);
    ctx.strokeRect(26, h - 168, 152, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Malgun Gothic, sans-serif';
    ctx.fillText('버리기', 66, h - 85);

    state.cookBtnRect = { x: w - 204, y: h - 160, w: 172, h: 125 };
    ctx.fillStyle = '#2b8a3e';
    ctx.fillRect(w - 204, h - 160, 172, 125);
    ctx.fillStyle = '#40c057';
    ctx.fillRect(w - 198, h - 154, 160, 105);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(w - 204, h - 160, 172, 125);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px Malgun Gothic, sans-serif';
    ctx.fillText('요리시작', w - 172, h - 88);
  },

  drawHall(ctx, w, h, state) {
    ctx.fillStyle = '#f4e4c1';
    ctx.fillRect(0, 0, w, h * 0.56);
    ctx.fillStyle = '#b08968';
    ctx.fillRect(0, h * 0.42, w, h * 0.14);

    ctx.fillStyle = state.phase === 'night' ? '#1c2541' : '#74c0fc';
    ctx.fillRect(190, 25, 160, 100);
    ctx.strokeStyle = '#5c3a21';
    ctx.lineWidth = 8;
    ctx.strokeRect(190, 25, 160, 100);
    ctx.beginPath();
    ctx.moveTo(270, 25);
    ctx.lineTo(270, 125);
    ctx.moveTo(190, 75);
    ctx.lineTo(350, 75);
    ctx.stroke();

    ctx.fillStyle = '#6f4e37';
    ctx.fillRect(0, h * 0.56, w, h * 0.44);

    state.customerRects = [];
    for (let i = 0; i < 3; i++) {
      const cx = 42 + i * 168;
      const cy = 230;
      state.customerRects.push({ index: i, x: cx - 12, y: cy - 115, w: 148, h: 270 });

      const cust = state.customers[i];
      if (!cust) {
        ctx.fillStyle = '#4a2c11';
        ctx.fillRect(cx + 28, cy + 75, 68, 65);
        ctx.strokeStyle = '#120d0a';
        ctx.lineWidth = 4;
        ctx.strokeRect(cx + 28, cy + 75, 68, 65);
        continue;
      }

      ctx.fillStyle = '#2b211a';
      ctx.fillRect(cx + 20, cy + 6, 84, 72);
      ctx.fillStyle = cust.shirtColor;
      ctx.fillRect(cx + 14, cy + 72, 96, 75);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 5;
      ctx.strokeRect(cx + 14, cy + 72, 96, 75);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + 42, cy + 72, 40, 16);
      ctx.fillStyle = '#ffccd5';
      ctx.fillRect(cx + 28, cy + 16, 68, 56);
      ctx.strokeRect(cx + 28, cy + 16, 68, 56);
      ctx.fillStyle = '#2b211a';
      ctx.fillRect(cx + 28, cy + 12, 68, 18);
      ctx.fillStyle = '#120d0a';
      ctx.fillRect(cx + 42, cy + 40, 8, 10);
      ctx.fillRect(cx + 74, cy + 40, 8, 10);
      ctx.fillStyle = '#ff758f';
      ctx.fillRect(cx + 34, cy + 50, 10, 6);
      ctx.fillRect(cx + 80, cy + 50, 10, 6);
      ctx.fillStyle = '#a61e4d';
      ctx.fillRect(cx + 56, cy + 56, 12, 6);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 12, cy - 105, 148, 72);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 5;
      ctx.strokeRect(cx - 12, cy - 105, 148, 72);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + 52, cy - 33, 18, 14);
      ctx.fillStyle = '#120d0a';
      ctx.fillRect(cx + 48, cy - 33, 5, 14);
      ctx.fillRect(cx + 68, cy - 33, 5, 14);

      ctx.fillStyle = '#120d0a';
      ctx.font = 'bold 25px Malgun Gothic, sans-serif';
      ctx.fillText(cust.wantTag, cx + 10, cy - 58);
    }

    ctx.fillStyle = '#8d5524';
    ctx.fillRect(0, h * 0.58, w, 65);
    ctx.fillStyle = '#c68642';
    ctx.fillRect(0, h * 0.58, w, 14);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(-4, h * 0.58, w + 8, 65);
  },
  drawFarm(ctx, w, h, state) {
    ctx.fillStyle = '#52b788';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#40916c';
    for (let y = 20; y < h; y += 80) {
      for (let x = 20; x < w; x += 90) {
        ctx.fillRect(x, y, 24, 10);
      }
    }

    state.coopRect = { x: 20, y: 25, w: 165, h: 215 };
    ctx.fillStyle = '#c68642';
    ctx.fillRect(28, 75, 149, 165);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 5;
    ctx.strokeRect(28, 75, 149, 165);
    ctx.fillStyle = '#e03131';
    ctx.fillRect(16, 35, 173, 45);
    ctx.strokeRect(16, 35, 173, 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Malgun Gothic, sans-serif';
    ctx.fillText('닭장', 80, 65);

    if (state.chickens > 0) {
      this.drawPixelArt(ctx, 'chicken', 42, 85, 4);
    }
    if (state.eggsReady > 0) {
      ctx.fillStyle = '#fff9db';
      ctx.fillRect(120, 115, 22, 28);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(120, 115, 22, 28);
    }

    ctx.fillStyle = '#120d0a';
    ctx.font = 'bold 20px Malgun Gothic, sans-serif';
    ctx.fillText(`닭: ${state.chickens}마리`, 42, 182);
    ctx.fillStyle = '#fff3bf';
    ctx.fillText(`달걀: ${state.eggsReady}개`, 42, 218);

    state.mushroomRect = { x: w - 185, y: 25, w: 165, h: 215 };
    ctx.fillStyle = '#343a40';
    ctx.fillRect(w - 177, 75, 149, 165);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 5;
    ctx.strokeRect(w - 177, 75, 149, 165);
    ctx.fillStyle = '#1b4332';
    ctx.fillRect(w - 189, 35, 173, 45);
    ctx.strokeRect(w - 189, 35, 173, 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Malgun Gothic, sans-serif';
    ctx.fillText('버섯그늘', w - 148, 65);

    if (state.mushroomKits > 0) {
      ctx.fillStyle = '#5c3a21';
      ctx.fillRect(w - 155, 128, 105, 24);
      if (state.mushroomsReady > 0) {
        this.drawPixelArt(ctx, 'mushroom', w - 135, 82, 4);
      }
    }

    ctx.fillStyle = '#e9ecef';
    ctx.font = 'bold 20px Malgun Gothic, sans-serif';
    ctx.fillText(`키트: ${state.mushroomKits}개`, w - 155, 182);
    ctx.fillStyle = '#ffd43b';
    ctx.fillText(`버섯: ${state.mushroomsReady}개`, w - 155, 218);

    const gridSize = state.farmExpanded ? 4 : 3;
    const cellSize = state.farmExpanded ? 84 : 106;
    const startX = Math.floor((w - gridSize * (cellSize + 12)) / 2);
    const startY = 275;

    ctx.fillStyle = '#8d5524';
    ctx.fillRect(startX - 16, startY - 16, gridSize * (cellSize + 12) + 20, gridSize * (cellSize + 12) + 20);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(startX - 16, startY - 16, gridSize * (cellSize + 12) + 20, gridSize * (cellSize + 12) + 20);

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
          const pScale = state.farmExpanded ? 4 : 5;
          const offset = Math.floor((cellSize - 16 * pScale) / 2);
          if (plot.ready) {
            this.drawPixelArt(ctx, 'crop_berry', x + offset, y + offset, pScale);
          } else {
            this.drawPixelArt(ctx, 'sprout', x + offset, y + offset, pScale);
          }
        }
      }
    }
  },

  // 4. 낚시터 (정밀 도트 낚싯대 + 입질 시 낚싯줄과 찌 진동 애니메이션)
  drawFishing(ctx, w, h, state) {
    // 맑은 하늘과 구름
    ctx.fillStyle = '#74c0fc';
    ctx.fillRect(0, 0, w, 210);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(60, 45, 90, 26);
    ctx.fillRect(80, 30, 50, 20);
    ctx.fillRect(340, 65, 110, 28);
    ctx.fillRect(365, 48, 60, 22);

    // 강물과 물결
    ctx.fillStyle = '#1971c2';
    ctx.fillRect(0, 210, w, h - 210);
    ctx.fillStyle = '#4dabf7';
    for (let y = 240; y < h; y += 75) {
      for (let x = 40; x < w; x += 130) {
        ctx.fillRect(x, y, 42, 8);
        ctx.fillRect(x + 55, y + 30, 32, 8);
      }
    }

    // 왼쪽 풀숲 & 바위
    ctx.fillStyle = '#2b8a3e';
    ctx.fillRect(0, 145, 70, 45);
    ctx.fillStyle = '#40c057';
    ctx.fillRect(10, 130, 22, 35);
    ctx.fillRect(40, 138, 18, 28);
    ctx.fillStyle = '#868e96';
    ctx.fillRect(195, 195, 45, 30);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 4;
    ctx.strokeRect(195, 195, 45, 30);

    // 나무 부두와 말뚝 기둥
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(35, 230, 24, 65);
    ctx.fillRect(155, 230, 24, 65);
    ctx.fillStyle = '#8d5524';
    ctx.fillRect(0, 180, 205, 56);
    ctx.fillStyle = '#c68642';
    ctx.fillRect(0, 180, 205, 14);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 5;
    ctx.strokeRect(-4, 180, 209, 56);

    // 낚시 중일 때 정밀 도트 낚싯대 & 낚싯줄 연출
    if (state.isFishing) {
      // 입질 시 좌우/상하 진동 값 계산
      const shakeX = state.fishBite ? Math.sin(Date.now() / 45) * 10 : 0;
      const shakeY = state.fishBite ? Math.abs(Math.cos(Date.now() / 45)) * 14 : Math.sin(Date.now() / 350) * 3;

      // 1) 코르크 손잡이 & 황금 릴 + 길게 뻗은 카본 낚싯대 (픽셀 계단형 정밀 렌더링)
      const rodStartX = 115;
      const rodStartY = 185;
      const tipX = 290 + shakeX * 0.4;
      const tipY = 55 + shakeY * 0.6;

      // 코르크 그립
      ctx.fillStyle = '#c68642';
      ctx.fillRect(rodStartX - 8, rodStartY - 8, 28, 18);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(rodStartX - 8, rodStartY - 8, 28, 18);

      // 낚싯대 본체 (픽셀 블록으로 계단식 곡선 표현)
      const steps = 16;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        // 끝부분이 살짝 휘어지는 포물선 궤적
        const rx = Math.floor(rodStartX + 16 + (tipX - (rodStartX + 16)) * t);
        const bend = state.fishBite ? t * t * 18 : t * t * 6;
        const ry = Math.floor(rodStartY - 4 + (tipY - (rodStartY - 4)) * t + bend);
        const thickness = s < 5 ? 10 : s < 11 ? 7 : 5;

        ctx.fillStyle = '#120d0a';
        ctx.fillRect(rx - 2, ry - 2, thickness + 4, thickness + 4);
        ctx.fillStyle = s % 4 === 0 ? '#e03131' : '#343a40'; // 마디 포인트
        ctx.fillRect(rx, ry, thickness, thickness);

        // 가이드 고리 (은색 링)
        if (s === 6 || s === 11 || s === 16) {
          ctx.fillStyle = '#dee2e6';
          ctx.fillRect(rx + 2, ry + thickness, 6, 6);
        }
      }

      // 황금 스피닝 릴
      ctx.fillStyle = '#f59f00';
      ctx.fillRect(rodStartX + 26, rodStartY - 2, 22, 24);
      ctx.fillStyle = '#ffd43b';
      ctx.fillRect(rodStartX + 30, rodStartY + 2, 14, 10);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(rodStartX + 26, rodStartY - 2, 22, 24);

      // 2) 낚싯줄 (입질이 오면 팽팽하게 직선으로 당겨지며 좌우로 떨림)
      const bobX = 355 + shakeX;
      const bobY = (state.fishBite ? 415 : 380) + shakeY;

      ctx.strokeStyle = state.fishBite ? '#ffd43b' : '#ffffff';
      ctx.lineWidth = state.fishBite ? 4 : 3;
      ctx.beginPath();
      ctx.moveTo(tipX + 4, tipY + 12);
      if (state.fishBite) {
        // 입질 시 팽팽하게 일직선으로 당겨짐
        ctx.lineTo(bobX + 12, bobY);
      } else {
        // 평소에는 살짝 느슨한 곡선
        ctx.quadraticCurveTo(tipX + 25, (tipY + bobY) / 2 + 25, bobX + 12, bobY);
      }
      ctx.stroke();

      // 3) 수면 파동 고리 (입질 시 물보라 파동이 2겹으로 크게 퍼짐)
      ctx.strokeStyle = state.fishBite ? '#ffffff' : '#a5d8ff';
      ctx.lineWidth = 4;
      if (state.fishBite) {
        const ripple = (Date.now() % 400) / 10;
        ctx.strokeRect(bobX - 24 - ripple * 0.5, bobY + 10, 72 + ripple, 20);
        ctx.strokeRect(bobX - 10, bobY + 14, 44, 12);
      } else {
        ctx.strokeRect(bobX - 14, bobY + 14, 52, 14);
      }

      // 4) 빨간/흰색 투톤 찌 (입질 시 물속으로 반쯤 잠김)
      const submerge = state.fishBite ? 10 : 0;
      ctx.fillStyle = '#e03131';
      ctx.fillRect(bobX, bobY - 6 + submerge, 24, 15);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(bobX, bobY + 9 + submerge, 24, 11 - submerge * 0.5);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(bobX, bobY - 6 + submerge, 24, 26 - submerge * 0.5);
    }

    // 통발 그래픽
    if (state.trapActive) {
      ctx.fillStyle = '#8d5524';
      ctx.fillRect(70, 500, 96, 64);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 5;
      ctx.strokeRect(70, 500, 96, 64);
      ctx.beginPath();
      ctx.moveTo(102, 500);
      ctx.lineTo(102, 564);
      ctx.moveTo(134, 500);
      ctx.lineTo(134, 564);
      ctx.moveTo(70, 532);
      ctx.lineTo(166, 532);
      ctx.stroke();

      ctx.fillStyle = '#120d0a';
      ctx.fillRect(35, 576, 175, 40);
      ctx.fillStyle = state.trapReady ? '#ffd43b' : '#ffffff';
      ctx.font = 'bold 22px Malgun Gothic, sans-serif';
      ctx.fillText(state.trapReady ? '통발 수확 가능!' : '통발 대기중...', 48, 604);
    }
  },

  drawMarketBanner(ctx, w, h, season) {
    ctx.fillStyle = '#e6ccb2';
    ctx.fillRect(0, 0, w, h);

    for (let x = 0; x < w; x += 60) {
      ctx.fillStyle = (x / 60) % 2 === 0 ? '#e03131' : '#fff9db';
      ctx.fillRect(x, 0, 60, 68);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, 0, 60, 68);
    }
    ctx.fillStyle = '#120d0a';
    ctx.font = 'bold 28px Malgun Gothic, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`[${season} 시장 가판대]`, w / 2, 125);
    ctx.font = 'bold 20px Malgun Gothic, sans-serif';
    ctx.fillText('원하는 물품을 터치해 구매하세요', w / 2, 172);
    ctx.textAlign = 'left';
  }
};
