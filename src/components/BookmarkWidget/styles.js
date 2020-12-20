import { mergeStyles } from '@fluentui/react'

const Styles = {
  container: (offset) =>
    mergeStyles({
      position: 'absolute',
      top: offset.top,
      left: offset.left,
      padding: 20,
      background: 'white',
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
    }),
  label: { root: { padding: 0 } },
  textField: { field: { padding: 8, width: 200 } },
  actions: mergeStyles({ marginLeft: 'auto' }),
}

export default Styles
