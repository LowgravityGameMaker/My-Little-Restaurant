
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
