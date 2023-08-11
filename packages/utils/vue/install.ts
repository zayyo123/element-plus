import { NOOP } from '@vue/shared'
// NOOP 常量是一个空函数，用于在需要一个默认或占位函数的情况下使用。

import type { App, Directive } from 'vue'
// Directive：这是一个 Vue 指令的类型
import type { SFCInstallWithContext, SFCWithInstall } from './typescript'

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  // 为主类和额外的组件添加install方法
  ;(main as SFCWithInstall<T>).install = (app): void => {
    // 遍历主类和额外的组件，将它们添加到app中
    for (const comp of [main,...Object.values(extra?? {})]) {
      app.component(comp.name, comp)
    }
  }

  // 如果额外的组件存在，则遍历它们，将它们添加到app中
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  // 返回主类和额外的组件
  return main as SFCWithInstall<T> & E
}

export const withInstallFunction = <T>(fn: T, name: string) => {
  // 为主类和名称添加install方法
  ;(fn as SFCWithInstall<T>).install = (app: App) => {
    // 将fn的_context设置为app的_context
    ;(fn as SFCInstallWithContext<T>)._context = app._context
    // 将fn添加到app中
    app.config.globalProperties[name] = fn
  }

  // 返回fn
  return fn as SFCInstallWithContext<T>
}

export const withInstallDirective = <T extends Directive>(
  directive: T,
  name: string
) => {
  // 为主类和名称添加install方法
  ;(directive as SFCWithInstall<T>).install = (app: App): void => {
    // 将directive添加到app中
    app.directive(name, directive)
  }

  // 返回directive
  return directive as SFCWithInstall<T>
}

export const withNoopInstall = <T>(component: T) => {
  // 为主类和名称添加install方法
  ;(component as SFCWithInstall<T>).install = NOOP

  // 返回component
  return component as SFCWithInstall<T>
}
