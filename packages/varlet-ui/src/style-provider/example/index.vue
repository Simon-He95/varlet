<script setup>
import { Themes, StyleProvider } from '@varlet/ui'
import { AppType, getBrowserTheme, watchLang, getSiteStyleVars, watchTheme } from '@varlet/cli/client'
import { ref, reactive, onUnmounted } from 'vue'
import { use, pack } from './locale'

const VarStyleProvider = StyleProvider.Component

const state = reactive({
  score: 5,
  license: true,
})

const styleVars = ref(null)

let rootStyleVars = null

const successTheme = {
  '--rate-primary-color': 'var(--color-success)',
  '--button-primary-color': 'var(--color-success)',
  '--switch-handle-active-background': 'var(--color-success)',
  '--switch-track-active-background': 'var(--color-success)',
}

const darkTheme = {
  '--color-primary': '#3f51b5',
}

function toggleTheme() {
  styleVars.value = styleVars.value ? null : successTheme
}

function toggleRootTheme() {
  const siteTheme = getBrowserTheme()
  rootStyleVars = rootStyleVars ? null : darkTheme
  StyleProvider({ ...getSiteStyleVars(siteTheme), ...rootStyleVars })
}

watchLang(use)
watchTheme(() => {
  rootStyleVars = null
})

onUnmounted(() => {
  const siteTheme = getBrowserTheme()
  const styleVars = siteTheme === 'darkTheme' ? Themes.dark : null
  StyleProvider({ ...getSiteStyleVars(siteTheme), ...styleVars })
})
</script>

<template>
  <app-type>{{ pack.componentCall }}</app-type>
  <var-style-provider :style-vars="styleVars">
    <var-rate v-model="state.score" />
    <var-switch v-model="state.license" />
    <var-button style="margin-top: 10px" type="primary" block @click="toggleTheme">{{ pack.toggleTheme }}</var-button>
  </var-style-provider>

  <app-type>{{ pack.functionCall }}</app-type>
  <var-button type="primary" block @click="toggleRootTheme">{{ pack.toggleRootTheme }}</var-button>
</template>
