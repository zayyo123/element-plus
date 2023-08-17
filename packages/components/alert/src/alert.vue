<template>
  <transition :name="ns.b('fade')">
    <div
      v-show="visible"
      :class="[ns.b(), ns.m(type), ns.is('center', center), ns.is(effect)]"
      role="alert"
    >
      <el-icon v-if="showIcon && iconComponent" :class="iconClass">
        <component :is="iconComponent" />
      </el-icon>

      <div :class="ns.e('content')">
        <span
          v-if="title || $slots.title"
          :class="[ns.e('title'), isBoldTitle]"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="$slots.default || description" :class="ns.e('description')">
          <slot>
            {{ description }}
          </slot>
        </p>
        <template v-if="closable">
          <div
            v-if="closeText"
            :class="[ns.e('close-btn'), ns.is('customed')]"
            @click="close"
          >
            {{ closeText }}
          </div>
          <el-icon v-else :class="ns.e('close-btn')" @click="close">
            <Close />
          </el-icon>
        </template>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'
import { ElIcon } from '@element-plus/components/icon'
import { TypeComponents, TypeComponentsMap } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { alertEmits, alertProps } from './alert'

defineOptions({
  name: 'ElAlert',
})

// 定义props变量
const { Close } = TypeComponents

defineOptions({
  name: 'ElAlert',
// 定义emits变量
defineEmits(alertEmits)
// 定义slots变量
const slots = useSlots()

// 定义ns变量
const ns = useNamespace('alert')

// 定义visible变量
const visible = ref(true)

// 定义iconComponent变量
const iconComponent = computed(() => TypeComponentsMap[props.type])

// 定义iconClass变量
const iconClass = computed(() => [
  ns.e('icon'),
  { [ns.is('big')]:!!props.description ||!!slots.default },
])

// 定义isBoldTitle变量
const isBoldTitle = computed(() => {
  return { [ns.is('bold')]: props.description || slots.default }
})

const props = defineProps(alertProps)
const emit = defineEmits(alertEmits)
const slots = useSlots()

const ns = useNamespace('alert')

const visible = ref(true)

const iconComponent = computed(() => TypeComponentsMap[props.type])

const iconClass = computed(() => [
  ns.e('icon'),
  { [ns.is('big')]: !!props.description || !!slots.default },
])

const isBoldTitle = computed(() => {
  return { [ns.is('bold')]: props.description || slots.default }
})

// 定义close函数
const close = (evt: MouseEvent) => {
  // 设置visible变量为false
  visible.value = false
  // 触发close事件
  emit('close', evt)
}
</script> -->
<template>
  <div class="el-alert">
    <div class="el-alert__wrapper">
      <div class="el-alert__title">
        <slot name="title">
          <span v-if="iconComponent">
            <el-icon :component="iconComponent" />
          </span>
          <span v-else>
            {{ title }}
          </span>
        </slot>
      </div>
      <div class="el-alert__description" v-if="$slots.default">
        <slot />
      </div>
      <div class="el-alert__description" v-else>
        <span v-if="isBoldTitle.value">
          <strong>{{ title }}</strong>
        </span>
        <span v-else>{{ title }}</span>
      </div>
      <div class="el-alert__closebtn" v-if="showClose">
        <el-button type="text" @click="close">
          <Close />
        </el-button>
      </div>
    </div>
    <div class="el-alert__content">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
.el-alert {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 4px;
    background-color: #f2f2f2;
    & > * {
      margin-left: 10px;
    }
  }
  &__title {
    font-size: 16px;
    line-height: 1.5;
    color: #303133;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > * {
      margin-left: 10px;
    }
  }
  &__description {
    font-size: 14px;
    line-height: 1.5;
    color: #606266;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > * {
      margin-left: 10px;
    }
  }
  &__closebtn {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #c0c4cc;
    & > * {
      margin-left: 10px;
    }
  }
  &__content {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 15px;
    border-radius: 4px;
    background-color: #f2f2f2;
    & > * {
      margin-left: 10px;
    }
  }
}
</style>
<i18n>
{
  "en": {
    "close": "Close",
    "title": "Alert"
  },
  "zh": {
    "close": "关闭",
    "title": "提示"
  }
}
</i18n>
</script>{ [ns.is('bold')]: props.description || slots.default }
})

// 定义close函数
const close = (evt: MouseEvent) => {
  visible.value = false
  emit('close', evt)
}
</script> -->
<!-- 解释以上代码 -->
<template>
  <div class="el-alert">
    <div class="el-alert__wrapper">
      <div class="el-alert__title">
        <slot name="title">
          <span v-if="iconComponent">
            <el-icon class="el-alert__icon" :class="iconClass.value" />
          </span>
          <span v-else>{{ title }}</span>
        </slot>
      </div>
      <div class="el-alert__content">
        <slot></slot>
        <span v-if="description" class="el-alert__description">{{ description }}</span>
        <span v-if="slots.default" class="el-alert__description">
          <slot name="default"></slot>
        </span>
      </div>
      <div class="el-alert__closebtn" v-if="showClose" @click="close">
        <el-icon class="el-alert__closebtn" :class="iconClass.value" name="close" />
      </div>
      <div class="el-alert__icon" v-if="iconComponent">
        <el-icon class="el-alert__icon" :class="iconClass.value" />
      </div>
    </div>
    <div class="el-alert__fade-enter-active" v-if="visible">
      <div class="el-alert__fade-enter">
        <div class="el-alert__fade-leave-active"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineOptions, defineProps, defineEmits, useSlots } from 'vue'
import { ElIcon } from '@element-plus/components/icon'
import { TypeComponents, TypeComponentsMap } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { alertEmits, alertProps } from './alert'

// 定义props变量
defineOptions({
  name: 'ElAlert',
})

// 定义props变量
const props = defineProps(alertProps)
const emit = defineEmits(alertEmits)
// 定义emits变量
defineEmits(alertEmits)
// 定义slots变量
const slots = useSlots()

// 定义ns变量
const ns = useNamespace('alert')

// 定义visible变量
const visible = ref(true)

// 定义iconComponent变量
const iconComponent = computed(() => TypeComponentsMap[props.type])

// 定义iconClass变量
const iconClass = computed(() => [
  ns.e('icon'),
  { [ns.is('big')]: !!props.description || !!slots.default },
])

// 定义isBoldTitle变量
const isBoldTitle = computed(() => {
  return { [ns.is('bold')]: props.description || slots.default }
})

// 定义close函数
const close = (evt: MouseEvent) => {
  visible.value = false
  emit('close', evt)
}
</script>
