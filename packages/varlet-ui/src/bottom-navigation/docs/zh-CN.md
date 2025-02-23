# 底部导航栏

### 介绍

在页面底部显示导航和关键操作。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <var-bottom-navigation v-model:active="active">
    <var-bottom-navigation-item label="标签" icon="home" />
    <var-bottom-navigation-item label="标签" icon="magnify" />
    <var-bottom-navigation-item label="标签" icon="heart" />
    <var-bottom-navigation-item label="标签" icon="account-circle" />
  </var-bottom-navigation>
</template>
```

### 通过名称匹配

```html
<script setup>
import { ref } from 'vue'

const active = ref('home')
</script>

<template>
  <var-bottom-navigation v-model:active="active">
    <var-bottom-navigation-item name="home" label="标签" icon="home" />
    <var-bottom-navigation-item name="search" label="标签" icon="magnify" />
    <var-bottom-navigation-item name="heart" label="标签" icon="heart" />
    <var-bottom-navigation-item name="user" label="标签" icon="account-circle" />
  </var-bottom-navigation>
</template>
```

### 徽标提示

```html
<script setup>
import { ref, reactive } from 'vue'

const active = ref(0)
const badgeProps = reactive({
  type: 'primary',
  value: '66'
})
</script>

<template>
  <var-bottom-navigation v-model:active="active">
    <var-bottom-navigation-item label="标签" icon="home" />
    <var-bottom-navigation-item label="标签" icon="magnify" badge />
    <var-bottom-navigation-item label="标签" icon="heart" :badge="badgeProps" />
    <var-bottom-navigation-item label="标签" icon="account-circle" />
  </var-bottom-navigation>
</template>
```

### 自定义颜色

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <var-bottom-navigation active-color="#ba68c8" v-model:active="active">
    <var-bottom-navigation-item label="标签" icon="home" />
    <var-bottom-navigation-item label="标签" icon="magnify" />
    <var-bottom-navigation-item label="标签" icon="heart" />
    <var-bottom-navigation-item label="标签" icon="account-circle" />
  </var-bottom-navigation>
</template>
```

### 监听切换事件

```html
<script setup>
import { ref } from 'vue'
import { Snackbar } from '@varlet/ui'

const active = ref(0)

function handleChange(active) {
  Snackbar.info(`changed to ${active}`)
}
</script>

<template>
  <var-bottom-navigation v-model:active="active" @change="handleChange">
    <var-bottom-navigation-item label="标签" icon="home" />
    <var-bottom-navigation-item label="标签" icon="magnify" />
    <var-bottom-navigation-item label="标签" icon="heart" />
    <var-bottom-navigation-item label="标签" icon="account-circle" />
  </var-bottom-navigation>
</template>
```

### 监听点击事件

```html
<script setup>
import { ref } from 'vue'
import { Snackbar } from '@varlet/ui'

const active = ref(0)

function handleClick(active) {
  Snackbar.success(`clicked ${active}`)
}
</script>

<template>
  <var-bottom-navigation v-model:active="active">
    <var-bottom-navigation-item label="标签" icon="home" @click="handleClick" />
    <var-bottom-navigation-item label="标签" icon="magnify" @click="handleClick" />
    <var-bottom-navigation-item label="标签" icon="heart" @click="handleClick" />
    <var-bottom-navigation-item label="标签" icon="account-circle" @click="handleClick" />
  </var-bottom-navigation>
</template>
```

### 悬浮按钮

Item 数量为偶数时，悬浮按钮在中间位置，为奇数时在最右侧。

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
const isEven = ref(true)
</script>

<template>
  <var-bottom-navigation 
    class="bottom-navigation-example"
    v-model:active="active"
    @fab-click="isEven = !isEven"
  >
    <var-bottom-navigation-item label="标签" icon="home" />
    <var-bottom-navigation-item label="标签" icon="magnify" />
    <var-bottom-navigation-item label="标签" icon="heart" />
    <var-bottom-navigation-item label="标签" icon="bell" />
    <var-bottom-navigation-item v-if="!isEven" label="标签" icon="account-circle" />

    <template #fab>
      <var-icon name="heart" />
    </template>
  </var-bottom-navigation>
</template>

<style>
.bottom-navigation-example {
  margin-top: 40px;
}
</style>
```

## API

### 属性

#### BottomNavigation Props

| 参数               | 说明              | 类型 | 默认值 |
|------------------|-----------------| ---- | ---- |
| `v-model:active` | 选中标签的名称或者索引值    | _number \| string_ | `0` |
| `fixed`          | 是否固定在底部         | _boolean_ | `false` |
| `border`         | 是否显示外边框         | _boolean_ | `false` |
| `safe-area`       | 是否开启底部安全区适配 | _boolean_ | `false` |
| `z-index`        | 元素 z-index      | _number \| string_ | `1` |
| `active-color`   | 选中标签的颜色         | _string_ | `-` |
| `inactive-color` | 未选中标签的颜色        | _string_ | `-` |
| `fab-props`      | 悬浮按钮属性          | _ButtonProps_ | `{type: "primary"}` |

#### BottomNavigationItem Props

|参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| `name` | 标签名称，作为匹配的标识符 | _string_ | `-` |
| `icon` | 图标名称，等同于 Icon 组件的 [name](#/zh-CN/icon) | _string_ | `-` |
| `label` | 标签文字内容 | _string_ | - |
| `namespace` | 图标的命名空间, 可扩展自定义图标库，等同于 Icon 组件的 [namespace](#/zh-CN/icon) | _string_ | `var-icon` |
| `badge` | 图标右上角徽标 | _boolean \| BadgeProps_ | `false` |

### 事件

#### BottomNavigation Events

|事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `before-change` | 切换标签前的回调函数，返回假值可阻止切换，支持返回 Promise | `active: number \| string` |
| `change` | 切换标签时触发 | `active: number \| string` |
| `fab-click` | 悬浮按钮点击时触发 | `-` |

#### BottomNavigationItem Events

|事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `click` | 点击时触发 | `active: number \| string` |

### 插槽

#### BottomNavigation Slots

| 名称 | 说明                    | 参数 |
| ---- |-----------------------| ----|
| `default` | 底部导航栏内容               |`-` |
| `fab` | 支持在组件中插入一个自定义的 fab 按钮 | `-` |

#### BottomNavigationItem Slots

| 名称 | 说明 | 参数 |
| ---- | ---- | ----|
| `default` | 自定义标签文字内容，会覆盖 `label` 的内容  | `-` |
| `icon` | 自定义图标 | `active: boolean` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### BottomNavigation Variables

| 变量名 | 默认值 |
| --- | --- |
| `--bottom-navigation-height` | `50px` |
| `--bottom-navigation-z-index` | `1` |
| `--bottom-navigation-background-color` | `#fff` |
| `--bottom-navigation-border-color` | `#bcc2cb` |
| `--bottom-navigation-fab-offset` | `4px` |

#### BottomNavigationItem Variables

| 变量名 | 默认值 |
| --- | --- |
| `--bottom-navigation-item-font-size` | `var(--font-size-sm)` |
| `--bottom-navigation-item-inactive-color` | `#646566` |
| `--bottom-navigation-item-active-color` | `var(--color-primary)` |
| `--bottom-navigation-item-active-background-color` | `#fff` |
| `--bottom-navigation-item-line-height` | `1` |
| `--bottom-navigation-item-icon-size` | `22px` |
| `--bottom-navigation-item-icon-margin-bottom` | `5px` |
