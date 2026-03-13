// Demo 模式 API - 使用 Mock 数据
import * as mock from './mock'

// 获取人物列表
export function getCharacters() {
  return mock.getCharacters()
}

// 随机获取人物
export function getRandomCharacters(count = 5) {
  return mock.getRandomCharacters(count)
}

// 开始模拟
export function startSimulation(event, characterIds, rounds) {
  return mock.startSimulation(event, characterIds, rounds)
}

// 执行下一轮
export function nextRound(rounds = 1) {
  return mock.nextRound(rounds)
}

// 获取结果
export function getResult() {
  return mock.getResult()
}

// 获取状态
export function getStatus() {
  return mock.getStatus()
}

// 获取世界状态
export function getWorldState() {
  return mock.getWorldState()
}

// RAG 状态
export function getRagStatus() {
  return mock.getRagStatus()
}

// 话题 API
export function getTopics() {
  return mock.getTopics()
}

export function getRandomTopic() {
  return mock.getRandomTopic()
}

// 刷新话题
export function refreshTopics() {
  return mock.refreshTopics()
}
