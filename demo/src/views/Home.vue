<template>
  <div class="home">
    <!-- 滚动热点横幅 -->
    <div class="hot-topics-marquee" v-if="allTopics.length > 0">
      <div class="marquee-content">
        <span
          v-for="(topic, idx) in allTopics"
          :key="idx"
          class="marquee-item"
          @click="selectTopic(topic)"
        >
          {{ getCategoryName(topic.category) }} · {{ topic.title }}
        </span>
      </div>
    </div>

    <div class="card">
      <h2>{{ t('home.title') }}</h2>

      <div class="form-group">
        <label>{{ t('home.topic_label') }}</label>
        <div class="topic-box">
          <textarea
            v-model="event"
            :placeholder="t('home.topic_placeholder')"
            rows="3"
          ></textarea>
          <div class="topic-actions">
            <button class="btn btn-outline" @click="refreshTopic" :disabled="loadingTopics">
              {{ loadingTopics ? '...' : t('topics.change') }}
            </button>
            <button class="btn btn-outline btn-refresh" @click="forceRefreshTopics" :disabled="loadingTopics" :title="t('topics.refresh')">
              {{ t('topics.refresh') }}
            </button>
            <span class="cache-info">{{ cacheInfo }}</span>
            <span v-if="currentTopicSource" class="topic-source">
              {{ t('topics.source') }}: {{ translateSource(currentTopicSource) }}
            </span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>{{ t('home.character_label') }} ({{ selectedCharacters.length }}/{{ maxCharacters }})</label>
        <div class="characters-grid">
          <div
            v-for="char in characters"
            :key="char.id"
            class="character-card"
            :class="{ selected: isSelected(char.id) }"
            @click="toggleCharacter(char.id)"
          >
            <img v-if="char.avatar" :src="char.avatar" class="char-avatar" :alt="char.name" />
            <div v-else class="char-avatar-placeholder">{{ char.name?.charAt(0) }}</div>
            <div class="char-name">{{ char.name }}</div>
            <div class="char-era">{{ char.era }}</div>
            <div class="char-country">{{ char.country }}</div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>{{ t('home.rounds_label') }}: {{ rounds }}</label>
        <input type="range" v-model="rounds" min="1" max="10" />
      </div>

      <div class="actions">
        <button class="btn btn-secondary" @click="selectRandom">{{ t('home.random_select') }}</button>
        <button
          class="btn btn-primary"
          :disabled="!canStart"
          @click="startSim"
        >
          {{ t('home.start_discussion') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getCharacters, startSimulation, getTopics, refreshTopics } from '../api'
import { translateSource } from '../utils/sourceMap'

const router = useRouter()
const { t, locale } = useI18n()

const characters = ref([])
const selectedCharacters = ref([])
const event = ref('')
const rounds = ref(5)
const maxCharacters = 6
const loading = ref(false)
const loadingTopics = ref(false)
const currentTopicSource = ref('')
const allTopics = ref([])
const cacheInfo = ref('')

// 监听语言变化，更新缓存信息和话题
watch(locale, async () => {
  updateCacheInfo()
  // 刷新话题列表以获取对应语言的内容
  await refreshTopic()
})

function updateCacheInfo() {
  cacheInfo.value = t('topics.auto_update', { hours: 1 })
}

const canStart = computed(() => {
  return event.value.trim() && selectedCharacters.value.length >= 2
})

function isSelected(id) {
  return selectedCharacters.value.includes(id)
}

function toggleCharacter(id) {
  const idx = selectedCharacters.value.indexOf(id)
  if (idx > -1) {
    selectedCharacters.value.splice(idx, 1)
  } else if (selectedCharacters.value.length < maxCharacters) {
    selectedCharacters.value.push(id)
  }
}

function selectRandom() {
  const allIds = characters.value.map(c => c.id)
  const shuffled = allIds.sort(() => Math.random() - 0.5)
  selectedCharacters.value = shuffled.slice(0, Math.min(5, allIds.length))
}

// 获取分类名称（根据当前语言）
function getCategoryName(category) {
  if (!category) return ''
  // 尝试从 i18n 获取翻译
  const key = `categories.${category.toLowerCase()}`
  const translated = t(key)
  // 如果找到翻译则使用，否则返回原值
  return translated !== key ? translated : category
}

async function refreshTopic() {
  loadingTopics.value = true
  try {
    const res = await getTopics()
    const topics = res.data.topics || []
    if (topics.length > 0) {
      // 随机选择一个话题
      const randomTopic = topics[Math.floor(Math.random() * topics.length)]
      event.value = randomTopic.title
      currentTopicSource.value = randomTopic.source
      // 更新滚动列表
      allTopics.value = topics
    }
  } catch (err) {
    console.error('获取话题失败', err)
  } finally {
    loadingTopics.value = false
  }
}

async function forceRefreshTopics() {
  loadingTopics.value = true
  try {
    const res = await refreshTopics()
    const topics = res.data.topics || []
    if (topics.length > 0) {
      // 随机选择一个话题
      const randomTopic = topics[Math.floor(Math.random() * topics.length)]
      event.value = randomTopic.title
      currentTopicSource.value = randomTopic.source
      allTopics.value = topics
      cacheInfo.value = t('topics.refreshed')
    }
  } catch (err) {
    console.error('刷新话题失败', err)
  } finally {
    loadingTopics.value = false
  }
}

function selectTopic(topic) {
  event.value = topic.title
  currentTopicSource.value = topic.source
}

async function startSim() {
  if (!canStart.value) return

  loading.value = true
  try {
    const res = await startSimulation(event.value, selectedCharacters.value, rounds.value)
    router.push('/simulation')
  } catch (err) {
    alert('启动失败: ' + (err.response?.data?.error || err.message))
  } finally {
    loading.value = false
  }
}

// 默认话题（无需等待加载）- 中英文
const defaultTopicsZh = [
  { title: "油价大涨", source: "默认", category: "economy" },
  { title: "中美贸易摩擦", source: "默认", category: "politics" },
  { title: "全球气候变化", source: "默认", category: "environment" },
  { title: "人工智能发展", source: "默认", category: "technology" },
  { title: "粮食安全问题", source: "默认", category: "society" },
  { title: "疫情后经济复苏", source: "默认", category: "economy" },
  { title: "新能源产业发展", source: "默认", category: "technology" },
  { title: "国际局势动荡", source: "默认", category: "politics" },
]

const defaultTopicsEn = [
  { title: "Oil Prices Surge", source: "Default", category: "economy" },
  { title: "US-China Trade Tensions", source: "Default", category: "politics" },
  { title: "Global Climate Change", source: "Default", category: "environment" },
  { title: "AI Development", source: "Default", category: "technology" },
  { title: "Food Security Issues", source: "Default", category: "society" },
  { title: "Post-Pandemic Economic Recovery", source: "Default", category: "economy" },
  { title: "New Energy Industry Growth", source: "Default", category: "technology" },
  { title: "International Instability", source: "Default", category: "politics" },
]

// 根据当前语言获取默认话题
function getDefaultTopics() {
  return locale.value === 'en-US' ? defaultTopicsEn : defaultTopicsZh
}

onMounted(async () => {
  // 先用默认话题快速显示
  const defaultTopics = getDefaultTopics()
  allTopics.value = [...defaultTopics]
  const randomTopic = defaultTopics[Math.floor(Math.random() * defaultTopics.length)]
  event.value = randomTopic.title
  currentTopicSource.value = randomTopic.source

  // 初始化缓存信息
  updateCacheInfo()

  try {
    // 并行加载人物（必须）和话题（后台）
    console.log('开始加载人物...')
    const charsRes = await getCharacters()
    console.log('人物数据:', charsRes)
    characters.value = charsRes.data.characters || []

    // 后台异步加载真实RSS话题
    getTopics().then(res => {
      const topics = res.data.topics || []
      if (topics.length > 0) {
        allTopics.value = [...topics, ...getDefaultTopics()]
        // 更新当前话题为真实话题
        const newTopic = topics[Math.floor(Math.random() * topics.length)]
        event.value = newTopic.title
        currentTopicSource.value = newTopic.source
      }
    }).catch(err => {
      console.warn('RSS加载失败，使用默认话题', err)
    })
  } catch (err) {
    console.error('加载失败', err)
  }
})
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
}

/* 滚动热点横幅 - 调慢速度 */
.hot-topics-marquee {
  background: linear-gradient(90deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
  border-radius: 8px;
  padding: 12px 0;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
}

.hot-topics-marquee::before,
.hot-topics-marquee::after {
  content: '';
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  z-index: 2;
}

.hot-topics-marquee::before {
  left: 0;
  background: linear-gradient(90deg, #1a1a2e 0%, transparent 100%);
}

.hot-topics-marquee::after {
  right: 0;
  background: linear-gradient(90deg, transparent 0%, #1a1a2e 100%);
}

.marquee-content {
  display: flex;
  animation: marquee 60s linear infinite;  /* 从30s改为60s */
  width: max-content;
}

.marquee-content:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-item {
  white-space: nowrap;
  padding: 8px 24px;
  color: #ffd700;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  border-radius: 20px;
  margin: 0 4px;
}

.marquee-item:hover {
  background: rgba(255, 215, 0, 0.15);
  transform: scale(1.05);
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 30px;
}

h2 {
  margin-bottom: 24px;
  color: #ffd700;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #aaa;
}

textarea, input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 1rem;
}

textarea:focus, input:focus {
  outline: none;
  border-color: #ffd700;
}

.topic-box {
  position: relative;
}

.topic-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.topic-source {
  font-size: 0.85rem;
  color: #666;
}

.cache-info {
  font-size: 0.75rem;
  color: #666;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
}

.btn-refresh {
  font-size: 0.8rem;
  padding: 4px 10px;
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #aaa;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-outline:hover:not(:disabled) {
  border-color: #ffd700;
  color: #ffd700;
}

.btn-outline:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="range"] {
  width: 100%;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.character-card {
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.char-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
  border: 2px solid rgba(255, 215, 0, 0.3);
}

.char-avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
  color: #1a1a2e;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
}

.character-card:hover {
  background: rgba(255, 255, 255, 0.1);
}

.character-card.selected {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
}

.char-name {
  font-weight: bold;
  color: #ffd700;
}

.char-era, .char-country {
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-primary {
  background: #ffd700;
  color: #1a1a2e;
  font-weight: bold;
}

.btn-primary:hover:not(:disabled) {
  background: #ffed4a;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
