<script setup>
import { Themes, LoadingBar } from '@varlet/ui'
import { ref } from 'vue'
import { watchLang, AppType, watchDarkMode } from '@varlet/cli/client'
import { use, pack } from './locale'

const hasCustomStyle = ref(false)

function setStyle() {
  if (hasCustomStyle.value) {
    LoadingBar.resetDefaultOptions()
  } else {
    LoadingBar.setDefaultOptions({
      errorColor: '#ff8800',
      color: '#10afef',
      height: '5px',
    })
  }

  hasCustomStyle.value = !hasCustomStyle.value
}

watchDarkMode(Themes.dark)
watchLang(use)

LoadingBar.setDefaultOptions({
  top: '14.5vmin',
})
</script>

<template>
  <app-type>{{ pack.basicUsage }}</app-type>
  <var-space direction="column" :size="['3vmin', '4vmin']">
    <var-button type="primary" block @click="LoadingBar.start()">{{ pack.start }}</var-button>
    <var-button type="primary" block @click="LoadingBar.finish()">{{ pack.finish }}</var-button>
    <var-button type="primary" block @click="LoadingBar.error()">{{ pack.error }}</var-button>
    <var-button type="primary" block @click="setStyle">{{ hasCustomStyle ? pack.clear : pack.custom }}</var-button>
  </var-space>
</template>
