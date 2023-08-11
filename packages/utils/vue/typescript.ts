// 从 'vue' 模块中导入 AppContext 和 Plugin 类型。
import type { AppContext, Plugin } from 'vue'

// 定义了一个叫SFCWithInstall的TS类型，它是由两个类型 T 和 Plugin 进行交叉混和
export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

// 定义了一个泛型类型 `SFCInstallWithContext<T>`，它是由 `SFCWithInstall<T>` 类型和 `{ _context: AppContext | null }` 对象类型合并而成的。

// - `SFCWithInstall<T>` 是一个带有安装函数的单文件组件（Single File Component）。
// - `_context` 是一个可选属性，它的类型为 `AppContext | null`。该属性用来存储应用程序上下文信息。

// 通过将这两个类型进行合并，我们创建了一个新的泛型类型 `SFCInstallWithContext<T>`。使用此类型时，我们既可以获得带有安装函数的单文件组件特性，又可以访问 `_context` 属性来获取或设置应用程序上下文信息。
