const SPRITES = {
  palette: {
    '.': null,
    'K': '#120d0a', // 외곽선 검정
    'W': '#ffffff', // 하이라이트 흰색
    'Y': '#ffd43b', // 노랑
    'A': '#f59f00', // 진노랑/황금색
    'O': '#f76707', // 주황
    'R': '#e03131', // 빨강
    'M': '#a61e4d', // 진빨강/자주
    'G': '#2f9e44', // 초록
    'L': '#8ce99a', // 연두
    'D': '#1b4332', // 짙은 녹색
    'B': '#1971c2', // 파랑
    'C': '#74c0fc', // 하늘색
    'N': '#8d5524', // 갈색
    'T': '#c68642', // 밝은 나무색
    'E': '#4a2c11', // 진갈색
    'S': '#adb5bd', // 은색
    'H': '#495057', // 진회색
    'P': '#fcc2d7'  // 분홍/피부색
  },

  // 16x16 정밀 도트 스프라이트 시트
  art16: {
    // 닭 (16x16)
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
    // 표고버섯 (16x16)
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
    // 다 자란 딸기/열매 작물 (16x16)
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
    // 새싹 (16x16)
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
    // 프라이팬 (16x16)
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
    // 도마와 식칼 (16x16)
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
    // 냄비 (16x16)
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
    // 즙 짜는 기계 (16x16)
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
    // 튀김기 (16x16)
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
    ],
    // 물고기 그림자/월척 (16x16)
    fish: [
      '................',
      '................',
      '.....KKKKKK.....',
      '...KKBBBBBBKK...',
      '..KBBWBBBBBBBKK.',
      '.KBBBBBBBBBBBBBK',
      'KBBBBBBBBBBBBKK.',
      '.KBBBBBBBBBBK...',
      '..KKBBBBBBKK....',
      '....KKKKKK......',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................'
    ]
  },

  // 8x8 상단/모달용 미니 아이콘
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

  // 16x16 스프라이트를 원하는 좌표와 배율(pixelSize)로 정밀 렌더링
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

  // 1. 주방 조리대 (고퀄리티 나무결 타일 + 16x16 정밀 조리도구 도트)
  drawKitchen(ctx, w, h, state) {
    // 원목 조리대 바탕
    ctx.fillStyle = '#9c6644';
    ctx.fillRect(0, 0, w, h);

    // 나무 판자 줄무늬 및 입체 명암
    for (let y = 0; y < h; y += 60) {
      ctx.fillStyle = '#7f5539';
      ctx.fillRect(0, y, w, 6);
      ctx.fillStyle = '#b08968';
      ctx.fillRect(0, y + 6, w, 4);
    }

    // 상단 스테인리스 화구 선반
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

      // 화구 인덕션 받침대
      ctx.fillStyle = '#212529';
      ctx.fillRect(pos.x, pos.y, slotW, slotH);
      ctx.fillStyle = '#495057';
      ctx.fillRect(pos.x + 8, pos.y + 8, slotW - 16, slotH - 16);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 5;
      ctx.strokeRect(pos.x, pos.y, slotW, slotH);

      // 16x16 정밀 도트 도구 그리기 (7배 확대 -> 112x112)
      this.drawPixelArt(ctx, toolId, pos.x + 18, pos.y + 18, 7);

      // 도구 이름 명패
      ctx.fillStyle = '#120d0a';
      ctx.fillRect(pos.x + 8, pos.y + slotH + 6, slotW - 16, 30);
      ctx.fillStyle = '#fff6e5';
      ctx.font = 'bold 20px Malgun Gothic, sans-serif';
      ctx.fillText(GAME_DATA.tools[toolId].name, pos.x + 16, pos.y + slotH + 28);

      // 재료 투입 개수 뱃지
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

    // 하단 왼쪽: 쓰레기통 (입체 캔 디자인)
    state.trashRect = { x: 32, y: h - 160, w: 140, h: 125 };
    ctx.fillStyle = '#495057';
    ctx.fillRect(32, h - 160, 140, 125);
    ctx.fillStyle = '#868e96';
    ctx.fillRect(26, h - 168, 152, 20); // 뚜껑 테두리
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(32, h - 160, 140, 125);
    ctx.strokeRect(26, h - 168, 152, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Malgun Gothic, sans-serif';
    ctx.fillText('버리기', 66, h - 85);

    // 하단 오른쪽: 조리 시작 버튼 (입체 버튼 디자인)
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

  // 2. 식당 홀 (아늑한 벽돌/창문 인테리어 + 디테일한 손님 도트 캐릭터)
  drawHall(ctx, w, h, state) {
    // 따뜻한 크림 벽지 + 하단 원목 몰딩
    ctx.fillStyle = '#f4e4c1';
    ctx.fillRect(0, 0, w, h * 0.56);
    ctx.fillStyle = '#b08968';
    ctx.fillRect(0, h * 0.42, w, h * 0.14);

    // 창문 도트 (밤이면 별빛 어두운 하늘)
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

    // 나무 마룻바닥
    ctx.fillStyle = '#6f4e37';
    ctx.fillRect(0, h * 0.56, w, h * 0.44);

    // 손님 슬롯 3명
    state.customerRects = [];
    for (let i = 0; i < 3; i++) {
      const cx = 42 + i * 168;
      const cy = 230;
      state.customerRects.push({ index: i, x: cx - 12, y: cy - 115, w: 148, h: 270 });

      const cust = state.customers[i];
      if (!cust) {
        // 빈 나무 의자 등받이
        ctx.fillStyle = '#4a2c11';
        ctx.fillRect(cx + 28, cy + 75, 68, 65);
        ctx.strokeStyle = '#120d0a';
        ctx.lineWidth = 4;
        ctx.strokeRect(cx + 28, cy + 75, 68, 65);
        continue;
      }

      // 손님 도트 캐릭터 (머리카락 + 얼굴 + 앞머리 + 카라 + 의상)
      // 1) 뒷머리
      ctx.fillStyle = '#2b211a';
      ctx.fillRect(cx + 20, cy + 6, 84, 72);
      // 2) 몸통 의상
      ctx.fillStyle = cust.shirtColor;
      ctx.fillRect(cx + 14, cy + 72, 96, 75);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 5;
      ctx.strokeRect(cx + 14, cy + 72, 96, 75);
      // 3) 흰색 셔츠 카라
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + 42, cy + 72, 40, 16);
      // 4) 얼굴 피부
      ctx.fillStyle = '#ffccd5';
      ctx.fillRect(cx + 28, cy + 16, 68, 56);
      ctx.strokeRect(cx + 28, cy + 16, 68, 56);
      // 5) 앞머리
      ctx.fillStyle = '#2b211a';
      ctx.fillRect(cx + 28, cy + 12, 68, 18);
      // 6) 눈, 볼터치, 입
      ctx.fillStyle = '#120d0a';
      ctx.fillRect(cx + 42, cy + 40, 8, 10);
      ctx.fillRect(cx + 74, cy + 40, 8, 10);
      ctx.fillStyle = '#ff758f';
      ctx.fillRect(cx + 34, cy + 50, 10, 6);
      ctx.fillRect(cx + 80, cy + 50, 10, 6);
      ctx.fillStyle = '#a61e4d';
      ctx.fillRect(cx + 56, cy + 56, 12, 6);

      // 머리 위 꼬리 달린 도트 말풍선
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 12, cy - 105, 148, 72);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 5;
      ctx.strokeRect(cx - 12, cy - 105, 148, 72);
      // 말풍선 꼬리
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + 52, cy - 33, 18, 14);
      ctx.fillStyle = '#120d0a';
      ctx.fillRect(cx + 48, cy - 33, 5, 14);
      ctx.fillRect(cx + 68, cy - 33, 5, 14);

      ctx.fillStyle = '#120d0a';
      ctx.font = 'bold 25px Malgun Gothic, sans-serif';
      ctx.fillText(cust.wantTag, cx + 10, cy - 58);
    }

    // 앞쪽 원목 카운터 테이블
    ctx.fillStyle = '#8d5524';
    ctx.fillRect(0, h * 0.58, w, 65);
    ctx.fillStyle = '#c68642';
    ctx.fillRect(0, h * 0.58, w, 14);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 6;
    ctx.strokeRect(-4, h * 0.58, w + 8, 65);
  },
  // 3. 밭, 닭장(빨간 지붕 + 흰 닭 스프라이트), 버섯 그늘(통나무 + 표고버섯)
  drawFarm(ctx, w, h, state) {
    // 푸른 잔디밭과 꽃 도트
    ctx.fillStyle = '#52b788';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#40916c';
    for (let y = 20; y < h; y += 80) {
      for (let x = 20; x < w; x += 90) {
        ctx.fillRect(x, y, 24, 10);
      }
    }

    // 왼쪽: 빨간 지붕 닭장
    state.coopRect = { x: 20, y: 25, w: 165, h: 215 };
    // 닭장 본체
    ctx.fillStyle = '#c68642';
    ctx.fillRect(28, 75, 149, 165);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 5;
    ctx.strokeRect(28, 75, 149, 165);
    // 빨간 지붕
    ctx.fillStyle = '#e03131';
    ctx.fillRect(16, 35, 173, 45);
    ctx.strokeRect(16, 35, 173, 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Malgun Gothic, sans-serif';
    ctx.fillText('닭장', 80, 65);

    // 닭장 안에 실제 도트 닭(16x16) 그리기
    if (state.chickens > 0) {
      this.drawPixelArt(ctx, 'chicken', 42, 85, 4);
    }
    // 달걀이 있으면 흰 달걀 도트 그리기
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

    // 오른쪽: 버섯 재배용 그늘막
    state.mushroomRect = { x: w - 185, y: 25, w: 165, h: 215 };
    ctx.fillStyle = '#343a40';
    ctx.fillRect(w - 177, 75, 149, 165);
    ctx.strokeStyle = '#120d0a';
    ctx.lineWidth = 5;
    ctx.strokeRect(w - 177, 75, 149, 165);
    // 짙은 초록 그늘 천막
    ctx.fillStyle = '#1b4332';
    ctx.fillRect(w - 189, 35, 173, 45);
    ctx.strokeRect(w - 189, 35, 173, 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Malgun Gothic, sans-serif';
    ctx.fillText('버섯그늘', w - 148, 65);

    // 버섯 키트 통나무 및 수확 가능한 표고버섯 스프라이트
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

    // 중앙: 나무 울타리로 둘러싸인 밭
    const gridSize = state.farmExpanded ? 4 : 3;
    const cellSize = state.farmExpanded ? 84 : 106;
    const startX = Math.floor((w - gridSize * (cellSize + 12)) / 2);
    const startY = 275;

    // 밭 전체 울타리 테두리
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
        // 흙 타일 + 밭고랑 줄무늬
        ctx.fillStyle = plot ? '#5c3a21' : '#7f4f24';
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.fillStyle = '#4a2c11';
        ctx.fillRect(x + 10, y + 22, cellSize - 20, 6);
        ctx.fillRect(x + 10, y + 52, cellSize - 20, 6);
        ctx.fillRect(x + 10, y + 82, cellSize - 20, 6);

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

  // 4. 낚시터 (뭉게구름, 반짝이는 강물 물결, 나무 말뚝 부두, 물고기 그림자)
  drawFishing(ctx, w, h, state) {
    // 맑은 하늘과 구름 도트
    ctx.fillStyle = '#74c0fc';
    ctx.fillRect(0, 0, w, 210);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(60, 45, 90, 26);
    ctx.fillRect(80, 30, 50, 20);
    ctx.fillRect(340, 65, 110, 28);
    ctx.fillRect(365, 48, 60, 22);

    // 강물과 반짝이는 물결 픽셀
    ctx.fillStyle = '#1971c2';
    ctx.fillRect(0, 210, w, h - 210);
    ctx.fillStyle = '#4dabf7';
    for (let y = 240; y < h; y += 75) {
      for (let x = 40; x < w; x += 130) {
        ctx.fillRect(x, y, 42, 8);
        ctx.fillRect(x + 55, y + 30, 32, 8);
      }
    }

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

    // 낚싯대 및 낚시 찌
    if (state.isFishing) {
      // 대나무 낚싯대
      ctx.strokeStyle = '#4a2c11';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(140, 195);
      ctx.lineTo(235, 125);
      ctx.stroke();

      const bobY = state.fishBite ? 395 : 375;
      // 낚싯줄
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(235, 125);
      ctx.lineTo(325, bobY);
      ctx.stroke();

      // 물결 파동 고리
      ctx.strokeStyle = '#a5d8ff';
      ctx.lineWidth = 4;
      ctx.strokeRect(300, bobY + 12, 54, 16);

      // 빨간/흰색 투톤 찌
      ctx.fillStyle = state.fishBite ? '#ffd43b' : '#e03131';
      ctx.fillRect(315, bobY - 6, 24, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(315, bobY + 10, 24, 12);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(315, bobY - 6, 24, 28);

      if (state.fishBite) {
        // 입질 시 물고기 스프라이트 등장!
        this.drawPixelArt(ctx, 'fish', 280, 430, 6);
        ctx.fillStyle = '#120d0a';
        ctx.fillRect(115, 275, 310, 52);
        ctx.fillStyle = '#ffd43b';
        ctx.font = 'bold 28px Malgun Gothic, sans-serif';
        ctx.fillText('입질 왔다! 화면 터치!', 130, 310);
      }
    }

    // 통발 그래픽 (격자 바구니 모양)
    if (state.trapActive) {
      ctx.fillStyle = '#8d5524';
      ctx.fillRect(70, 500, 96, 64);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 5;
      ctx.strokeRect(70, 500, 96, 64);
      // 통발 격자무늬
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

  // 5. 시장 상단 배너 (입체 물결 천막 지붕)
  drawMarketBanner(ctx, w, h, season) {
    ctx.fillStyle = '#e6ccb2';
    ctx.fillRect(0, 0, w, h);

    for (let x = 0; x < w; x += 60) {
      ctx.fillStyle = (x / 60) % 2 === 0 ? '#e03131' : '#fff9db';
      ctx.fillRect(x, 0, 60, 75);
      ctx.strokeStyle = '#120d0a';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, 0, 60, 75);
    }
    ctx.fillStyle = '#120d0a';
    ctx.font = 'bold 28px Malgun Gothic, sans-serif';
    ctx.fillText(`[${season} 시장 가판대]`, 145, 135);
    ctx.font = 'bold 21px Malgun Gothic, sans-serif';
    ctx.fillText('원하는 물품을 터치해 구매하세요', 110, 180);
  }
};
