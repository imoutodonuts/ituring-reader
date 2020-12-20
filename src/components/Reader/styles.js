import { mergeStyles, mergeStyleSets } from '@fluentui/react'

const Styles = {
  actionMenu: {
    container: mergeStyleSets({
      top: { position: 'fixed', right: 0, top: '2em' },
      bottom: { position: 'fixed', right: 0, bottom: '2em' },
    }),
    IconButton: { root: { display: 'block' } },
  },

  bookInfo: mergeStyleSets({
    list: { margin: '0px 4px' },
    item: { fontSize: 'inherit' },
  }),

  nav: {
    root: {
      position: 'fixed',
      top: 0,
      left: -260,
      width: 270,
      height: '100vh',
      padding: 10,
      overflowY: 'hidden',
      backgroundColor: 'white',
      opacity: 0,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0, 1)',
      '&:hover': {
        left: 0,
        overflowY: 'auto',
        opacity: 1,
      },
    },
    groupContent: {
      margin: 0,
    },
    chevronButton: {
      color: 'inherit',
      backgroundColor: 'transparent',
      '&::after': {
        border: 'none',
      },
    },
    link: {
      paddingRight: 0,
      color: 'inherit',
      backgroundColor: 'transparent',
      '&::after': {
        border: 'none',
      },
      '&:hover': {
        color: 'inherit',
      },
    },
  },

  panel: { commands: { marginBottom: 18 } },

  fileInput: mergeStyles({ display: 'none' }),
}

export default Styles
