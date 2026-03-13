import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

// 获取人物列表
export function getCharacters() {
  const lang = getLang()
  return api.get(`/characters/list?lang=${lang}`)
}

// 随机获取人物
export function getRandomCharacters(count = 5) {
  const lang = getLang()
  return api.get(`/characters/random?count=${count}&lang=${lang}`)
}

// 开始模拟
export function startSimulation(event, characterIds, rounds) {
  return api.post('/simulation/start', {
    event,
    character_ids: characterIds,
    rounds
  })
}

// 执行下一轮
export function nextRound(rounds = 1) {
  const lang = getLang()
  return api.post(`/simulation/next?lang=${lang}`, { rounds })
}

// 获取结果
export function getResult() {
  const lang = getLang()
  return api.get(`/simulation/result?lang=${lang}`)
}

// 获取状态
export function getStatus() {
  return api.get('/simulation/status')
}

// 获取世界状态
export function getWorldState() {
  return api.get('/world/state')
}

// RAG 状态
export function getRagStatus() {
  return api.get('/rag/status')
}

// 获取当前语言
function getLang() {
  return localStorage.getItem('sage-locale') || 'zh-CN'
}

// 话题 API
export function getTopics() {
  const lang = getLang()
  return api.get(`/topics?lang=${lang}`)
}

export function getRandomTopic() {
  const lang = getLang()
  return api.get(`/topics/random?lang=${lang}`)
}

// 刷新话题（清除缓存并重新获取）
export function refreshTopics() {
  const lang = getLang()
  return api.post(`/topics/refresh?lang=${lang}`)
}

export default api
