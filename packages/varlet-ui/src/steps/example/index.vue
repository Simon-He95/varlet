<script setup>
import { Themes } from '@varlet/ui'
import { AppType, watchLang, watchDarkMode } from '@varlet/cli/client'
import { ref } from 'vue'
import { pack, use } from './locale'

const active = ref(0)

function next() {
  active.value = (active.value + 1) % 4
}

watchLang(use)
watchDarkMode(Themes.dark)
</script>

<template>
  <app-type>{{ pack.basicUsage }}</app-type>
  <var-steps :active="active">
    <var-step>{{ pack.first }}</var-step>
    <var-step>{{ pack.second }}</var-step>
    <var-step>{{ pack.third }}</var-step>
    <var-step>{{ pack.fourth }}</var-step>
  </var-steps>

  <app-type>{{ pack.customStyle }}</app-type>
  <var-steps :active="active" active-color="#f44336" inactive-color="#e99eb4">
    <var-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">{{ pack.first }}</var-step>
    <var-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">{{ pack.second }}</var-step>
    <var-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">{{ pack.third }}</var-step>
    <var-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">{{ pack.fourth }}</var-step>
  </var-steps>

  <app-type>{{ pack.vertical }}</app-type>
  <var-steps direction="vertical" :active="active">
    <var-step>{{ pack.first }}</var-step>
    <var-step>{{ pack.second }}</var-step>
    <var-step>{{ pack.third }}</var-step>
    <var-step>{{ pack.fourth }}</var-step>
  </var-steps>

  <var-button type="primary" block @click="next">{{ pack.next }}</var-button>
</template>
