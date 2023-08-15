import {
  buildProps,
  definePropType,
  isBoolean,
  isNumber,
} from '@element-plus/utils'
import { CHANGE_EVENT } from '@element-plus/constants'
import type { ExtractPropTypes } from 'vue'
import type { ZIndexProperty } from 'csstype'
import type Affix from './affix.vue'

// 定义affix组件的props
export const affixProps = buildProps({
  /**
   * @description affix元素的zIndex属性
   * */
  zIndex: {
    type: definePropType<ZIndexProperty>([Number, String]),
    default: 100,
  },
  /**
   * @description target container. (CSS selector)目标容器。 （CSS 选择器）
   */
  target: {
    type: String,
    default: '',
  },
  /**
   * @description offset distance偏移距离
   * */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * @description position of affix  affix的位置
   * */
  position: {
    type: String,
    values: ['top', 'bottom'],
    default: 'top',
  },
} as const)

export type AffixProps = ExtractPropTypes<typeof affixProps>

// 定义affix组件的emits
export const affixEmits = {
  // scroll事件
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean }) =>
    isNumber(scrollTop) && isBoolean(fixed),
  // change事件
  [CHANGE_EVENT]: (fixed: boolean) => isBoolean(fixed),
}
// 定义affix组件的emits类型
export type AffixEmits = typeof affixEmits

// 定义affix组件的实例
export type AffixInstance = InstanceType<typeof Affix>
