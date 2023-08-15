<template>
  <div ref="root" :class="ns.b()" :style="rootStyle">
    <div :class="{ [ns.m('fixed')]: fixed }" :style="affixStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef, watch, watchEffect } from 'vue'
import {
  useElementBounding,
  useEventListener,
  useWindowSize,
} from '@vueuse/core'
import { addUnit, getScrollContainer, throwError } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { affixEmits, affixProps } from './affix'
import type { CSSProperties } from 'vue'

const COMPONENT_NAME = 'ElAffix'
defineOptions({
  name: COMPONENT_NAME,
})

// 定义props属性
const props = defineProps(affixProps)
// 定义emits属性
const emit = defineEmits(affixEmits)

// 定义一个名为ns的变量，用于记录组件的命名空间
const ns = useNamespace('affix')

// 定义一个变量target，用于存储组件的目标元素
const target = shallowRef<HTMLElement>()
// 定义一个变量root，用于存储组件的根元素
const root = shallowRef<HTMLDivElement>()
// 定义一个变量scrollContainer，用于存储组件的滚动容器
const scrollContainer = shallowRef<HTMLElement | Window>()
// 获取组件的窗口高度
const { height: windowHeight } = useWindowSize()
// 获取组件的根元素的高度和宽度
const {
  height: rootHeight,
  width: rootWidth,
  top: rootTop,
  bottom: rootBottom,
  update: updateRoot,
} = useElementBounding(root, { windowScroll: false })
// 获取组件的目标元素的位置
const targetRect = useElementBounding(target)

// 定义一个变量fixed，用于存储组件的固定状态
const fixed = ref(false)
// 定义一个变量scrollTop，用于存储组件的滚动位置
const scrollTop = ref(0)
// 定义一个变量transform，用于存储组件的transform值
const transform = ref(0)

// 计算组件的根元素的样式
const rootStyle = computed<CSSProperties>(() => {
  return {
    height: fixed.value ? `${rootHeight.value}px` : '',
    width: fixed.value ? `${rootWidth.value}px` : '',
  }
}) 定义一个变量scrollTop，用于存储scrollTop属性
const scrollTop = ref(0)
// 定义一个变量transform，用于存储transform属性
const transform = ref(0)

// 计算rootStyle
const rootStyle = computed<CSSProperties>(() => {
  return {
    height: fixed.value ? `${rootHeight.value}px` : '',
    width: fixed.value ? `${rootWidth.value}px` : '',
  }
}) 定义一个变量scrollTop，用于存储scrollTop属性
const scrollTop = ref(0)
// 定义一个变量transform，用于存储transform属性
const transform = ref(0)

// 计算rootStyle
const rootStyle = computed<CSSProperties>(() => {
  return {
    height: fixed.value ? `${rootHeight.value}px` : '',
    width: fixed.value ? `${rootWidth.value}px` : '',
  }
})

const affixStyle = computed<CSSProperties>(() => {
  // 如果fixed属性为false，则返回空对象
  if (!fixed.value) return {}

  // 计算offset
  const offset = props.offset ? addUnit(props.offset) : 0
  // 返回样式对象
  return {
    // 设置容器的高度
    height: `${rootHeight.value}px`,
    // 设置容器的宽度
    width: `${rootWidth.value}px`,
    // 设置容器的位置
    top: props.position === 'top' ? offset : '',
    bottom: props.position === 'bottom' ? offset : '',
    // 设置容器的transform
    transform: transform.value ? `translateY(${transform.value}px)` : '',
    // 设置z-index
    zIndex: props.zIndex,
  }
})

const update = () => {
  // 如果滚动容器为空，则返回
  if (!scrollContainer.value) return

  // 计算滚动距离
  scrollTop.value =
    scrollContainer.value instanceof Window
      ? document.documentElement.scrollTop
      : scrollContainer.value.scrollTop || 0

  // 如果容器的位置为top，则设置fixed为true，并计算offset
  if (props.position === 'top') {
    if (props.target) {
      // 计算targetRect的bottom值
      const difference =
        targetRect.bottom.value - props.offset - rootHeight.value
      // 如果targetRect的bottom值大于rootTop值，则fixed为true，并设置transform为difference
      fixed.value = props.offset > rootTop.value && targetRect.bottom.value > 0
      // 否则，fixed为false，transform为0
      transform.value = difference < 0 ? difference : 0
    } else {
      // 否则，fixed为true，并设置transform为0
      fixed.value = props.offset > rootTop.value
    }
    // 如果容器的位置为target，则设置fixed为true，并计算offset
  } else if (props.target) {
    // 计算windowHeight的值
    const difference =
      windowHeight.value -
      targetRect.top.value -
      props.offset -
const handleScroll = () => {
      // 更新根节点
      updateRoot()
      // 发射滚动事件
      emit('scroll', {
        scrollTop: scrollTop.value,
        fixed: fixed.value,
      })
    }

    // 监听fixed值变化
    watch(fixed, (val) => emit('change', val))

    // 当组件被挂载时
    onMounted(() => {
      // 如果props中有target属性，则获取target属性的元素，否则设置为document.documentElement
      if (props.target) {
        target.value =
          document.querySelector<HTMLElement>(props.target) ?? undefined
        if (!target.value)
          throwError(COMPONENT_NAME, `Target is not existed: ${props.target}`)
      } else {
        target.value = document.documentElement
      }
      // 获取滚动容器
      scrollContainer.value = getScrollContainer(root.value!, true)
      // 更新根节点
      updateRoot()
    })

    // 使用useEventListener函数监听滚动事件，并调用handleScroll函数
    useEventListener(scrollContainer, 'scroll', handleScroll)
    // 使用watchEffect函数监听fixed值变化，并调用update函数
    watchEffect(update)

    // 定义expose对象，用于暴露函数 
    defineExpose({
      /** @description update affix status */
      update,
      /** @description update rootRect info */
      updateRoot,
    })
      < /script>      document.querySelector<HTMLElement>(props.target) ?? undefined
    if (!target.value)
      throwError(COMPONENT_NAME, `Target is not existed: ${props.target}`)
  } else {
    target.value = document.documentElement
  }
  scrollContainer.value = getScrollContainer(root.value!, true)
  updateRoot()
})

  useEventListener(scrollContainer, 'scroll', handleScroll)
watchEffect(update)

defineExpose({
  /** @description update affix status */
  update,
  /** @description update rootRect info */
  updateRoot,
})
</script>
