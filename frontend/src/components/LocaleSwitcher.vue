<template>
  <div class="locale-switcher">
    <select v-model="currentLocale" @change="changeLocale">
      <option value="zh-CN">中文</option>
      <option value="en-US">English</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLocale = ref(locale.value)

function changeLocale() {
  locale.value = currentLocale.value
  localStorage.setItem('sage-locale', currentLocale.value)
}

// 监听 locale 变化，保持同步
watch(locale, (newVal) => {
  currentLocale.value = newVal
})
</script>

<style scoped>
.locale-switcher {
  display: inline-block;
}

.locale-switcher select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: #ffd700;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
}

.locale-switcher select:hover {
  border-color: #ffd700;
}

.locale-switcher select option {
  background: #1a1a2e;
  color: #ffd700;
}
</style>
