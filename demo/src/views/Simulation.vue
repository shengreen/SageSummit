<template>
  <div class="simulation">
    <div class="status-bar">
      <button class="btn-back" @click="goBack">← {{ t('result.back') }}</button>
      <div class="event-display">
        <strong>{{ t('home.topic_label') }}:</strong>{{ currentEvent }}
      </div>
      <div class="round-info">
        {{ currentRound }}/{{ totalRounds }} {{ t('home.rounds_label').toLowerCase() }}
      </div>
    </div>

    <div class="chat-container">
      <div class="chat-messages" ref="chatContainer">
        <div
          v-for="(msg, idx) in chatMessages"
          :key="idx"
          class="message"
          :class="{ 'message-right': idx % 2 === 1 }"
        >
<img v-if="msg.avatar" :src="msg.avatar" class="avatar-img" :alt="msg.agent" />
          <div v-else class="avatar" :style="{ backgroundColor: getAvatarColor(msg.agent) }">
            {{ msg.agent?.charAt(0) }}
          </div>
          <div class="message-content">
            <div class="message-header" v-if="idx % 2 === 0">
              <span class="sender-name">{{ msg.agent }}</span>
              <span class="sender-country">{{ msg.country }}</span>
            </div>
            <div class="message-bubble">
              {{ msg.content }}
            </div>
          </div>
        </div>

        <div v-if="isRunning" class="message" :class="{ 'message-right': currentSpeaker !== 'System' }">
          <img v-if="currentSpeaker !== 'System' && currentSpeakerAvatar" :src="currentSpeakerAvatar" class="avatar-img" :alt="currentSpeaker" />
          <div v-else class="avatar" :style="{ backgroundColor: currentSpeaker !== 'System' ? getAvatarColor(currentSpeaker) : '#999' }">
            {{ currentSpeaker !== 'System' ? currentSpeaker?.charAt(0) : '...' }}
          </div>
          <div class="message-content">
            <div class="message-header" v-if="currentSpeaker !== 'System'">
              <span class="sender-name">{{ currentSpeaker }}</span>
            </div>
            <div class="message-bubble loading-bubble">
              <span class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
              {{ currentSpeaker !== 'System' ? currentSpeaker + ' ' + t('simulation.thinking') : t('simulation.thinking') }}
            </div>
          </div>
        </div>
      </div>

      <div class="world-state-mini">
        <div class="world-countries">
          <span v-for="(data, name) in worldState.countries" :key="name" class="world-item">
            {{ name }} {{ data.military }}/{{ data.gdp }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getStatus, nextRound as apiNextRound, getWorldState } from '../api'

const router = useRouter()
const { t } = useI18n()

const currentEvent = ref('')
const currentRound = ref(0)
const totalRounds = ref(5)
const chatMessages = ref([])
const isRunning = ref(false)
const currentSpeaker = ref('System')  // 当前正在发言的人物
const currentSpeakerAvatar = ref('')  // 当前发言人物的头像
const worldState = ref({ countries: {} })
const chatContainer = ref(null)

const avatarColors = {
  '秦始皇': '#e74c3c',
  '孔子': '#3498db',
  '亚历山大': '#9b59b6',
  '拿破仑': '#e67e22',
  '老子': '#1abc9c',
  '凯撒': '#e74c3c',
  '丘吉尔': '#2ecc71',
  '林肯': '#34495e',
  '成吉思汗': '#f39c12',
  '康熙': '#d35400'
}

function getAvatarColor(name) {
  return avatarColors[name] || '#95a5a6'
}

function goBack() {
  router.push('/')
}

function getLang() {
  return localStorage.getItem('sage-locale') || 'zh-CN'
}

async function loadStatus() {
  try {
    const res = await getStatus()
    const data = res.data
    currentEvent.value = data.event || ''

    const lang = getLang()
    const resultRes = await fetch(`/api/simulation/result?lang=${lang}`)
    const result = await resultRes.json()
    currentRound.value = result.current_round || 0
    totalRounds.value = result.rounds_total || 5

    chatMessages.value = []
    if (result.history?.rounds) {
      result.history.rounds.forEach(r => {
        r.statements.forEach(s => {
          chatMessages.value.push({
            agent: s.agent,
            avatar: s.avatar,
            country: s.country,
            content: s.content,
            isSelf: false
          })
        })
      })
    }
  } catch (err) {
    console.error('加载状态失败', err)
  }
}

async function loadWorldState() {
  try {
    const res = await getWorldState()
    worldState.value = res.data || { countries: {} }
  } catch (err) {
    console.error('加载世界状态失败', err)
  }
}

async function doNextRound() {
  if (currentRound.value >= totalRounds.value) return

  isRunning.value = true
  currentSpeaker.value = 'System'
  try {
    const res = await apiNextRound(1)
    const data = res.data

    const statements = data.statements
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i]

      // 设置当前发言者，显示思考状态
      currentSpeaker.value = stmt.agent || 'System'
      currentSpeakerAvatar.value = stmt.avatar || ''
      isRunning.value = true
      await nextTick()
      scrollToBottom()

      // 模拟思考间隔
      await new Promise(r => setTimeout(r, 800))

      // 隐藏"正在输入"，添加消息
      isRunning.value = false
      await nextTick()
      scrollToBottom()

      chatMessages.value.push({
        agent: stmt.agent,
        avatar: stmt.avatar,
        country: stmt.country,
        content: stmt.content,
        isSelf: false
      })
      await nextTick()
      scrollToBottom()

      // 如果还有下一条消息，继续循环
    }

    // 所有消息显示完后，重置状态
    currentSpeaker.value = 'System'
    currentSpeakerAvatar.value = ''
    isRunning.value = false

    currentRound.value = data.round
    worldState.value = data.world_state || { countries: {} }

    if (currentRound.value < totalRounds.value) {
      setTimeout(() => {
        doNextRound()
      }, 800)
    }
  } catch (err) {
    alert('执行失败: ' + (err.response?.data?.error || err.message))
    isRunning.value = false
  }
}

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

onMounted(async () => {
  await loadStatus()
  await loadWorldState()
  if (currentRound.value === 0 && totalRounds.value > 0) {
    doNextRound()
  }
})
</script>

<style scoped>
.simulation {
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #2d2d2d;
  border-bottom: 1px solid #3a3a3a;
  flex-shrink: 0;
}

.btn-back {
  background: none;
  border: none;
  color: #07c160;
  cursor: pointer;
  font-size: 16px;
}

.event-display {
  flex: 1;
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.round-info {
  color: #666;
  font-size: 12px;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  scroll-behavior: smooth;
}

.message {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-start;
  animation: messageSlideIn 0.3s ease-out;
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar {
  animation: avatarPopIn 0.3s ease-out;
}

@keyframes avatarPopIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.message-right {
  flex-direction: row-reverse;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
  font-size: 16px;
}

.avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 8px;
}

.message-right .avatar {
  margin-left: 8px;
  margin-right: 0;
}

.message-right .avatar-img {
  margin-left: 8px;
  margin-right: 0;
}

.message-content {
  margin-left: 8px;
  max-width: 75%;
}

.message-right .message-content {
  margin-left: 0;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-header {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.sender-name {
  font-weight: bold;
  color: #ffd700;
  font-size: 12px;
}

.sender-country {
  color: #555;
  font-size: 11px;
}

.message-bubble {
  background: #fff;
  color: #000;
  padding: 8px 10px;
  border-radius: 4px;
  line-height: 1.4;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
  animation: bubblePopIn 0.25s ease-out;
}

@keyframes bubblePopIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.message-right .message-bubble {
  background: #07c160;
  color: #fff;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 4px;
}

.message:not(.message-right) .message-bubble {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 4px;
}

.loading-bubble {
  background: #f0f0f0;
  color: #888;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.loading-dots {
  display: inline-flex;
  gap: 3px;
}

.loading-dots span {
  width: 4px;
  height: 4px;
  background: #888;
  border-radius: 50%;
  animation: typingBounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typingBounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.message-right .loading-bubble {
  background: #06ad56;
  color: #fff;
}

.message-right .loading-dots span {
  background: #fff;
}

.world-state-mini {
  padding: 8px 12px;
  background: #2d2d2d;
  border-top: 1px solid #3a3a3a;
  flex-shrink: 0;
}

.world-countries {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.world-item {
  font-size: 10px;
  color: #666;
  background: #3a3a3a;
  padding: 2px 6px;
  border-radius: 3px;
}
</style>
