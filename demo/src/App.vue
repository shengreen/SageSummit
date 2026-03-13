<template>
  <div class="app">
    <header class="header">
      <h1>🏛️ {{ t('app.title') }}</h1>
      <p class="subtitle">{{ t('app.subtitle') }}</p>
      <div class="header-actions">
        <LocaleSwitcher />
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from './components/LocaleSwitcher.vue'

const { t } = useI18n()
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
}

.header h1 {
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 10px;
}

.subtitle {
  color: #aaa;
  font-size: 1.1rem;
}

.header-actions {
  position: absolute;
  top: 20px;
  right: 20px;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
