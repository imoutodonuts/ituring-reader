import { mergeStyleSets } from '@fluentui/react'

const Styles = {
  searchBox: { root: { marginBottom: 10 } },

  listItem: mergeStyleSets({
    cell: {
      display: 'flex',
      padding: 10,
      '&:hover': { background: '#f9f9f9' },
    },
    content: {
      flexGrow: 1,
    },
    title: {
      overflow: 'hidden',
      fontWeight: '500',
      whiteSpace: 'nowrap',
    },
    text: {
      maxHeight: 'calc(4em + 1px)',
      overflowY: 'auto',
    },
    chevron: {
      alignSelf: 'center',
    },
  }),
}

export default Styles
