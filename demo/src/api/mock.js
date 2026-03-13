// Mock 数据 - 用于 GitHub Pages 演示

// 历史人物数据
export const mockCharacters = [
  { id: 1, name: '孔子', era: '春秋', country: '鲁国', avatar: null, description: '儒家学派创始人' },
  { id: 2, name: '秦始皇', era: '战国', country: '秦国', avatar: null, description: '统一六国' },
  { id: 3, name: '老子', era: '春秋', country: '楚国', avatar: null, description: '道家学派创始人' },
  { id: 4, name: '亚历山大', era: '战国', country: '马其顿', avatar: null, description: '亚历山大帝国' },
  { id: 5, name: '拿破仑', era: '近代', country: '法国', avatar: null, description: '法兰西帝国' },
  { id: 6, name: '凯撒', era: '共和', country: '罗马', avatar: null, description: '罗马独裁官' },
  { id: 7, name: '成吉思汗', era: '宋元', country: '蒙古', avatar: null, description: '蒙古帝国' },
  { id: 8, name: '康熙', era: '清', country: '清朝', avatar: null, description: '康乾盛世' },
  { id: 9, name: '林肯', era: '近代', country: '美国', avatar: null, description: '解放黑奴' },
  { id: 10, name: '丘吉尔', era: '现代', country: '英国', avatar: null, description: '二战领袖' }
]

// Mock 话题
export const mockTopicsZh = [
  { title: '油价大涨', source: 'Demo', category: 'economy' },
  { title: '中美贸易摩擦', source: 'Demo', category: 'politics' },
  { title: '全球气候变化', source: 'Demo', category: 'environment' },
  { title: '人工智能发展', source: 'Demo', category: 'technology' },
  { title: '粮食安全问题', source: 'Demo', category: 'society' },
  { title: '疫情后经济复苏', source: 'Demo', category: 'economy' },
  { title: '新能源产业发展', source: 'Demo', category: 'technology' },
  { title: '国际局势动荡', source: 'Demo', category: 'politics' }
]

export const mockTopicsEn = [
  { title: 'Oil Prices Surge', source: 'Demo', category: 'economy' },
  { title: 'US-China Trade Tensions', source: 'Demo', category: 'politics' },
  { title: 'Global Climate Change', source: 'Demo', category: 'environment' },
  { title: 'AI Development', source: 'Demo', category: 'technology' },
  { title: 'Food Security Issues', source: 'Demo', category: 'society' },
  { title: 'Post-Pandemic Recovery', source: 'Demo', category: 'economy' },
  { title: 'New Energy Growth', source: 'Demo', category: 'technology' },
  { title: 'International Instability', source: 'Demo', category: 'politics' }
]

// Mock 响应模板 - 中文
const mockResponsesZh = {
  孔子: [
    '「君子和而不同」，此事当以仁义为本，兼顾各方利益，方能长治久安。',
    '「己所不欲，勿施于人」。若油价上涨，当思百姓之苦施行仁政方可。',
    '「为政以德」，此事当以道德感化，不可轻用武力，当以德服人。'
  ],
  秦始皇: [
    '统一六国之势已成，此等经济之事，当以法治统一度量衡，方能天下太平！',
    '「书同文，车同轨」，当借此机会建立统一的经济秩序，此乃千秋伟业！',
    '此事当以铁腕治理，设立严格律法，统一货币制度，方能Control全局。'
  ],
  亚历山大: [
    '以我之雄才大略，当率军征服此地，建立更大的帝国版图！',
    '「世界之广大」，油价小事尔，待我征服更多领土，资源自然充裕！',
    '此事不足挂齿，当率马其顿大军所向披靡，一统天下！'
  ],
  拿破仑: [
    '以我之军事天才，当制定经济战略，让法兰西称霸欧洲！',
    '「不想当将军的士兵不是好士兵」，此事当以战略眼光统筹全局！',
    '滑铁卢之后更知经济之重要，当发展工业，振兴法兰西！'
  ],
  老子: [
    '「道法自然」，此事当顺其自然，不可强求，无为而治方为上策。',
    '「上善若水」，当以柔克刚，以静制动，此事急不得。',
    '「知足不辱，知止不殆」，油价涨跌自有天道，不可过度干预。'
  ],
  凯撒: [
    '「我来，我见，我征服」，此事当以罗马之法治理，统一货币流通！',
    '罗马之伟大在于法制与建设，当修桥铺路，促进通商，此乃罗马之道！',
    '此事当以罗马元老院之智慧决断，集思广益，方能成大事。'
  ],
  成吉思汗: [
    '「男子最大之乐事，在于压服乱众，战胜敌人」，此事当以铁骑踏平！',
    '蒙古铁骑所向披靡，当占领油田，掌控资源，此乃天赐之地！',
    '「长生天之命」，此事当顺天意而行，召集各部，共商大计！'
  ],
  康熙: [
    '「以民为本」，此事当体恤民情，减免赋税，让百姓休养生息。',
    '康乾盛世在于包容万象，当开放通商，促进经济，此乃盛世之道！',
    '此事当以儒家智慧治理，教化百姓，以德服人，方能长治久安。'
  ],
  林肯: [
    '「民有、民治、民享」，此事当以民主之方法解决，为全体人民谋福利。',
    '解放黑奴之经验告知，自由平等乃人心所向，经济政策当兼顾公平。',
    '「团结一致」，此事当凝聚全民之力，共同应对挑战，方能成功。'
  ],
  丘吉尔: [
    '「永不放弃」，此事当以坚韧不拔之意志应对，经济战亦是战争！',
    '「热血、辛劳、眼泪和汗水」，为保卫英国经济，当付出一切代价！',
    '二战之经验告知，联盟乃成功之关键，当联合各国共同应对经济危机！'
  ]
}

// Mock 响应模板 - 英文
const mockResponsesEn = {
  'Confucius': [
    '"The gentleman seeks harmony but not uniformity." This matter should be governed by benevolence and righteousness, balancing all interests for lasting stability.',
    '"Do not do to others what you do not want done to yourself." If oil prices rise, we must consider the hardships of the common people and implement benevolent policies.',
    '"Govern with virtue." This matter should be handled through moral influence, not force. One must win through virtue.'
  ],
  'Qin Shi Huang': [
    'The unified Qin empire is already established. Regarding this economic matter, we must unify weights and measures through law to achieve world peace!',
    '"Same script, same tracks." We must take this opportunity to establish a unified economic order—this is a great achievement for eternity!',
    'This matter requires iron-fisted governance, strict laws, and a unified currency system to control the situation entirely.'
  ],
  'Alexander': [
    'With my great talent, I shall lead my army to conquer this land and build an even greater empire!',
    '"The world is vast." Oil prices are a minor matter—once I conquer more territories, resources will naturally be abundant!',
    'This is beneath my notice. I shall lead the Macedonian army to sweep all before me and unify the world!'
  ],
  'Napoleon': [
    'With my military genius, I shall formulate economic strategies to make France dominate Europe!',
    '"A soldier who does not want to be a general is not a good soldier." This matter must be approached with strategic vision!',
    'After Waterloo, I understand the importance of economics. We must develop industry and revitalize France!'
  ],
  'Lao Tzu': [
    '"The Tao follows nature." This matter should follow its natural course without coercion—non-action is the best approach.',
    '"The highest good is like water." We should overcome the rigid with the flexible, act through stillness—this cannot be rushed.',
    '"Contentment brings no shame, knowing when to stop brings no trouble." Oil price fluctuations follow the natural order—do not overinterfere.'
  ],
  'Caesar': [
    '"I came, I saw, I conquered." This matter should be governed by Roman law, unifying currency circulation!',
    'Rome\'s greatness lies in law and construction. We must build roads and bridges, promote trade—this is the Roman way!',
    'This matter should be decided by the wisdom of the Roman Senate, gathering collective wisdom to achieve great things.'
  ],
  'Genghis Khan': [
    '"The greatest joy for a man is to crush his enemies." This matter shall be flattened by our iron cavalry!',
    'The Mongol iron cavalry is unstoppable. We shall seize the oil fields and control the resources—this is heaven-sent land!',
    '"The mandate of Tengri." This matter follows heaven\'s will—we must gather all tribes for council!'
  ],
  'Kangxi': [
    '"The people are the foundation." This matter requires sympathy for the people\'s conditions, reducing taxes for rest and recovery.',
    'The Kangxi-Qianlong era embraces all things. We must open trade and promote economy—this is the way of a prosperous age!',
    'This matter should be governed by Confucian wisdom, educate the people, win through virtue—achieving lasting stability.'
  ],
  'Lincoln': [
    '"Of the people, by the people, for the people." This matter should be solved through democratic methods, benefiting all people.',
    'The experience of liberating slaves tells us that freedom and equality are what people desire—economic policies must ensure fairness.',
    '"United we stand." This matter must unite the efforts of all citizens to face challenges together to succeed.'
  ],
  'Churchill': [
    '"Never give up." This matter must be faced with unwavering determination—economic war is also war!',
    '"Blood, toil, tears and sweat." To defend the British economy, we must give everything!',
    'The experience of WWII tells us that alliances are the key to success—we must unite all nations to face the economic crisis!'
  ]
}

// 世界状态
export const mockWorldState = {
  countries: {
    '鲁国': { military: 30, gdp: 25 },
    '秦国': { military: 90, gdp: 60 },
    '楚国': { military: 50, gdp: 40 },
    '马其顿': { military: 80, gdp: 35 },
    '法国': { military: 70, gdp: 75 },
    '罗马': { military: 85, gdp: 80 },
    '蒙古': { military: 95, gdp: 30 },
    '清朝': { military: 60, gdp: 70 },
    '美国': { military: 90, gdp: 95 },
    '英国': { military: 75, gdp: 85 }
  }
}

// 模拟 API 延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 当前模拟状态
let simulationState = {
  running: false,
  event: '',
  round: 0,
  totalRounds: 5,
  characters: [],
  history: []
}

// Mock API 函数
export async function getCharacters() {
  await delay(300)
  return { data: { characters: mockCharacters } }
}

export async function getRandomCharacters(count = 5) {
  await delay(200)
  const shuffled = [...mockCharacters].sort(() => Math.random() - 0.5)
  return { data: { characters: shuffled.slice(0, count) } }
}

export async function startSimulation(event, characterIds, rounds) {
  await delay(500)
  const selectedChars = mockCharacters.filter(c => characterIds.includes(c.id))
  simulationState = {
    running: true,
    event,
    round: 0,
    totalRounds: rounds,
    characters: selectedChars,
    history: []
  }
  return { data: { success: true, event, rounds } }
}

export async function nextRound(rounds = 1) {
  await delay(1500) // 模拟思考时间
  simulationState.round += rounds

  // 根据语言选择响应
  const lang = localStorage.getItem('sage-locale') || 'zh-CN'
  const responses = lang === 'en-US' ? mockResponsesEn : mockResponsesZh
  const isEnglish = lang === 'en-US'

  const statements = simulationState.characters.map(char => {
    // 英文模式下使用英文名（部分人物有不同翻译）
    const nameMap = {
      '孔子': 'Confucius', '秦始皇': 'Qin Shi Huang', '老子': 'Lao Tzu',
      '亚历山大': 'Alexander', '拿破仑': 'Napoleon', '凯撒': 'Caesar',
      '成吉思汗': 'Genghis Khan', '康熙': 'Kangxi', '林肯': 'Lincoln', '丘吉尔': 'Churchill'
    }
    const key = isEnglish ? (nameMap[char.name] || char.name) : char.name
    const charResponses = responses[key] || responses[char.name] || ['（沉默）']
    const randomResponse = charResponses[Math.floor(Math.random() * charResponses.length)]
    return {
      agent: char.name,
      country: char.country,
      avatar: null,
      content: randomResponse
    }
  })

  // 更新世界状态（随机变化）
  const newWorldState = { ...mockWorldState }
  Object.keys(newWorldState.countries).forEach(country => {
    newWorldState.countries[country].military = Math.max(10, Math.min(100,
      newWorldState.countries[country].military + Math.floor(Math.random() * 10) - 5))
    newWorldState.countries[country].gdp = Math.max(10, Math.min(100,
      newWorldState.countries[country].gdp + Math.floor(Math.random() * 10) - 5))
  })

  return {
    data: {
      round: simulationState.round,
      statements,
      world_state: newWorldState
    }
  }
}

export async function getResult() {
  await delay(200)
  return {
    data: {
      event: simulationState.event,
      current_round: simulationState.round,
      rounds_total: simulationState.totalRounds,
      history: { rounds: simulationState.history }
    }
  }
}

export async function getStatus() {
  await delay(100)
  return {
    data: {
      running: simulationState.running,
      event: simulationState.event,
      round: simulationState.round
    }
  }
}

export async function getWorldState() {
  await delay(100)
  return { data: mockWorldState }
}

export async function getRagStatus() {
  await delay(100)
  return { data: { status: 'demo', message: 'Demo模式 - 无需RAG' } }
}

export async function getTopics() {
  await delay(200)
  const lang = localStorage.getItem('sage-locale') || 'zh-CN'
  const topics = lang === 'en-US' ? mockTopicsEn : mockTopicsZh
  return { data: { topics } }
}

export async function getRandomTopic() {
  await delay(100)
  const lang = localStorage.getItem('sage-locale') || 'zh-CN'
  const topics = lang === 'en-US' ? mockTopicsEn : mockTopicsZh
  const random = topics[Math.floor(Math.random() * topics.length)]
  return { data: { topic: random } }
}

export async function refreshTopics() {
  await delay(300)
  const lang = localStorage.getItem('sage-locale') || 'zh-CN'
  const topics = lang === 'en-US' ? mockTopicsEn : mockTopicsZh
  return { data: { topics } }
}
