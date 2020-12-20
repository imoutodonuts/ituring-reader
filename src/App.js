import { createTheme, initializeIcons, loadTheme } from '@fluentui/react'
import Reader from './components/Reader'

initializeIcons()
loadTheme(
  createTheme({
    defaultFontStyle: { fontFamily: 'inherit' },
  })
)

const App = () => (
  <div>
    <Reader />
  </div>
)

export default App
