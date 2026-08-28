/// <reference types="vite/client" />
declare module 'esim_mini_app/App' {
  import type { ComponentType } from 'react'
  const App: ComponentType<{ merchantIdentifier?: string; vendorIdentifier?: string }>
  export default App
  export const MiniApp: ComponentType<{ merchantIdentifier?: string; vendorIdentifier?: string }>
}
