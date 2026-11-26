
const GAME_DATA = {
  seasons: ['봄', '여름', '가을', '겨울'],

  // 아이템 사전 (씨앗, 작물, 축산, 수산, 시장 식재료, 조리도구)
  items: {
    // 봄 작물 & 씨앗
    seed_turnip: { name: '순무 씨앗', type: 'seed', season: ['봄'], price: 20, cropId: 'turnip', growSec: 30 },
    turnip: { name: '순무', type: 'ingredient', category: '채소', season: ['봄'], sellPrice: 35, tags: ['시원한', '가벼운'] },
    seed_strawberry: { name: '딸기 씨앗', type: 'seed', season: ['봄'], price: 40, cropId: 'strawberry', growSec: 45 },
    strawberry: { name: '딸기', type: 'ingredient', category: '과일', season: ['봄'], sellPrice: 65, tags: ['달콤한', '상큼한'] },

    // 여름 작물 & 씨앗
    seed_tomato: { name: '토마토 씨앗', type: 'seed', season: ['여름'], price: 30, cropId: 'tomato', growSec: 35 },
    tomato: { name: '토마토', type: 'ingredient', category: '채소', season: ['여름'], sellPrice: 50, tags: ['상큼한', '시원한'] },
    seed_corn: { name: '옥수수 씨앗', type: 'seed', season: ['여름'], price: 35, cropId: 'corn', growSec: 40 },
    corn: { name: '옥수수', type: 'ingredient', category: '채소', season: ['여름'], sellPrice: 55, tags: ['달콤한', '기운나는'] },

    // 가을 작물 & 씨앗
    seed_pumpkin: { name: '단호박 씨앗', type: 'seed', season: ['가을'], price: 45, cropId: 'pumpkin', growSec: 50 },
    pumpkin: { name: '단호박', type: 'ingredient', category: '채소', season: ['가을'], sellPrice: 75, tags: ['달콤한', '따뜻한'] },
    seed_sweetpotato: { name: '고구마 씨앗', type: 'seed', season: ['가을'], price: 30, cropId: 'sweetpotato', growSec: 40 },
    sweetpotato: { name: '고구마', type: 'ingredient', category: '채소', season: ['가을'], sellPrice: 50, tags: ['달콤한', '따뜻한', '기운나는'] },

    // 겨울 작물 & 씨앗
    seed_radish: { name: '겨울무 씨앗', type: 'seed', season: ['겨울'], price: 25, cropId: 'radish', growSec: 35 },
    radish: { name: '겨울무', type: 'ingredient', category: '채소', season: ['겨울'], sellPrice: 45, tags: ['시원한', '따뜻한'] },
    seed_cabbage: { name: '양배추 씨앗', type: 'seed', season: ['겨울'], price: 35, cropId: 'cabbage', growSec: 45 },
    cabbage: { name: '양배추', type: 'ingredient', category: '채소', season: ['겨울'], sellPrice: 60, tags: ['가벼운', '따뜻한'] },

    // 축산 & 버섯
    egg: { name: '달걀', type: 'ingredient', category: '축산', season: ['봄', '여름', '가을', '겨울'], price: 30, sellPrice: 25, tags: ['기운나는', '고소한'] },
    chicken_meat: { name: '닭고기', type: 'ingredient', category: '축산', season: ['봄', '여름', '가을', '겨울'], sellPrice: 60, tags: ['기운나는', '따뜻한'] },
    mushroom: { name: '표고버섯', type: 'ingredient', category: '버섯', season: ['봄', '여름', '가을', '겨울'], sellPrice: 40, tags: ['따뜻한', '고소한'] },

    // 수산물 (계절별 낚시 & 통발)
    crucian: { name: '붕어', type: 'fish', category: '수산', season: ['봄', '가을'], sellPrice: 40, method: 'rod', tags: ['따뜻한', '기운나는'] },
    sweetfish: { name: '은어', type: 'fish', category: '수산', season: ['여름'], sellPrice: 55, method: 'rod', tags: ['시원한', '고소한'] },
    smelt: { name: '빙어', type: 'fish', category: '수산', season: ['겨울'], sellPrice: 50, method: 'rod', tags: ['고소한', '가벼운'] },
    shrimp: { name: '민물새우', type: 'fish', category: '수산', season: ['봄', '여름', '가을', '겨울'], sellPrice: 30, method: 'trap', tags: ['고소한', '가벼운'] },
    crab: { name: '민물게', type: 'fish', category: '수산', season: ['가을', '겨울'], sellPrice: 65, method: 'trap', tags: ['따뜻한', '기운나는'] },

    // 시장 전용 기본 식재료
    flour: { name: '밀가루', type: 'ingredient', category: '가공', price: 25, tags: ['고소한'] },
    milk: { name: '우유', type: 'ingredient', category: '가공', price: 35, tags: ['마시는', '달콤한'] },
    honey: { name: '꿀', type: 'ingredient', category: '가공', price: 50, tags: ['달콤한', '기운나는'] },
    spice: { name: '향신료', type: 'ingredient', category: '가공', price: 40, tags: ['따뜻한', '기운나는'] },

    // 조리도구 및 설비 (시장 구매)
    tool_pan: { name: '프라이팬', type: 'tool', cookType: '구이', price: 0 },
    tool_board: { name: '도마', type: 'tool', cookType: '비가열', price: 0 },
    tool_pot: { name: '냄비', type: 'tool', cookType: '스프', price: 200 },
    tool_juicer: { name: '즙 짜는 기계', type: 'tool', cookType: '음료', price: 250 },
    tool_fryer: { name: '튀김기', type: 'tool', cookType: '튀김', price: 300 },
    kit_mushroom: { name: '버섯 재배 키트', type: 'facility', price: 180 },
    item_chicken: { name: '병아리(닭 추가)', type: 'facility', price: 150 },
    expand_farm: { name: '밭 확장권 (4x4)', type: 'facility', price: 400 }
  },

  // 조리법 매핑 (도구 -> 조리 방식)
  tools: {
    tool_pan: { name: '프라이팬', mode: '구이' },
    tool_board: { name: '도마', mode: '비가열' },
    tool_pot: { name: '냄비', mode: '스프' },
    tool_juicer: { name: '즙 짜는 기계', mode: '음료' },
    tool_fryer: { name: '튀김기', mode: '튀김' }
  },

  // 요리 레시피 목록 (도구 + 재료 배열 일치 시 성공)
  recipes: [
    {
      id: 'fried_egg',
      name: '달걀 프라이',
      tool: 'tool_pan',
      ingredients: ['egg'],
      price: 65,
      tags: ['따뜻한', '기운나는', '고소한']
    },
    {
      id: 'roast_chicken',
      name: '향신료 닭구이',
      tool: 'tool_pan',
      ingredients: ['chicken_meat', 'spice'],
      price: 160,
      tags: ['따뜻한', '기운나는']
    },
    {
      id: 'grilled_corn',
      name: '꿀버터 옥수수구이',
      tool: 'tool_pan',
      ingredients: ['corn', 'honey'],
      price: 145,
      tags: ['달콤한', '따뜻한', '기운나는']
    },
    {
      id: 'baked_sweetpotato',
      name: '군고구마',
      tool: 'tool_pan',
      ingredients: ['sweetpotato'],
      price: 95,
      tags: ['달콤한', '따뜻한']
    },
    {
      id: 'fresh_salad',
      name: '모둠 채소 샐러드',
      tool: 'tool_board',
      ingredients: ['tomato', 'cabbage'],
      price: 140,
      tags: ['시원한', '상큼한', '가벼운']
    },
    {
      id: 'turnip_pickles',
      name: '달콤 순무 피클',
      tool: 'tool_board',
      ingredients: ['turnip', 'honey'],
      price: 115,
      tags: ['달콤한', '시원한', '가벼운']
    },
    {
      id: 'strawberry_milk',
      name: '생딸기 우유',
      tool: 'tool_juicer',
      ingredients: ['strawberry', 'milk'],
      price: 140,
      tags: ['달콤한', '마시는', '시원한']
    },
    {
      id: 'tomato_juice',
      name: '토마토 주스',
      tool: 'tool_juicer',
      ingredients: ['tomato'],
      price: 90,
      tags: ['마시는', '시원한', '상큼한']
    },
    {
      id: 'pumpkin_soup',
      name: '단호박 크림 스프',
      tool: 'tool_pot',
      ingredients: ['pumpkin', 'milk'],
      price: 165,
      tags: ['달콤한', '따뜻한']
    },
    {
      id: 'mushroom_stew',
      name: '표고버섯 영양 전골',
      tool: 'tool_pot',
      ingredients: ['mushroom', 'radish'],
      price: 135,
      tags: ['따뜻한', '기운나는']
    },
    {
      id: 'fish_soup',
      name: '얼큰 붕어 매운탕',
      tool: 'tool_pot',
      ingredients: ['crucian', 'spice'],
      price: 130,
      tags: ['따뜻한', '기운나는']
    },
    {
      id: 'crab_soup',
      name: '민물게 맑은 탕',
      tool: 'tool_pot',
      ingredients: ['crab', 'radish'],
      price: 160,
      tags: ['따뜻한', '시원한']
    },
    {
      id: 'fried_shrimp',
      name: '바삭 새우 튀김',
      tool: 'tool_fryer',
      ingredients: ['shrimp', 'flour'],
      price: 105,
      tags: ['고소한', '기운나는']
    },
    {
      id: 'fried_smelt',
      name: '빙어 튀김',
      tool: 'tool_fryer',
      ingredients: ['smelt', 'flour'],
      price: 120,
      tags: ['고소한', '가벼운']
    },
    {
      id: 'fried_chicken',
      name: '황금 닭튀김',
      tool: 'tool_fryer',
      ingredients: ['chicken_meat', 'flour', 'spice'],
      price: 210,
      tags: ['기운나는', '고소한', '따뜻한']
    }
  ],

  // 손님이 머리 위에 띄우는 요구 키워드 목록
  customerRequests: ['달콤한', '따뜻한', '기운나는', '마시는', '시원한', '고소한', '가벼운']
};
