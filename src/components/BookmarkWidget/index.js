import { IconButton, Label, Stack, TextField } from '@fluentui/react'
import Styles from './styles'

const BookmarkWidget = ({
  offset,
  setOffset,
  bookmark,
  setBookmark,
  pushBookmark,
}) => (
  <Stack className={Styles.container(offset)}>
    <Label styles={Styles.label}>{bookmark.chapter}</Label>
    <TextField
      autoAdjustHeight
      borderless
      multiline
      resizable={false}
      spellCheck="false"
      value={bookmark.description}
      styles={Styles.textField}
      onChange={(e, value) => {
        const newBookmark = { ...bookmark }
        newBookmark.description = value
        setBookmark(newBookmark)
      }}
    />
    <Stack horizontal className={Styles.actions}>
      <IconButton
        iconProps={{ iconName: 'Accept' }}
        title="保存"
        onClick={pushBookmark}
      />
      <IconButton
        iconProps={{ iconName: 'Cancel' }}
        title="取消"
        onClick={() => setOffset(undefined)}
      />
    </Stack>
  </Stack>
)

export default BookmarkWidget
