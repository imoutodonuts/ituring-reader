import { FocusZone, getRTL, Icon, List, SearchBox } from '@fluentui/react'
import { useState } from 'react'
import Styles from './styles'

const BookmarkList = ({ bookmarks, onDismiss }) => {
  const [searchResult, setSearchResult] = useState(bookmarks)

  const onRenderCell = ({ chapter, description, coordinate }) => (
    <div
      className={Styles.listItem.cell}
      onClick={() => {
        onDismiss()
        window.scrollTo({ left: 0, top: coordinate, behavior: 'smooth' })
      }}
    >
      <div className={Styles.listItem.content}>
        <div className={Styles.listItem.title}>{chapter}</div>
        <div className={Styles.listItem.text}>{description}</div>
      </div>
      <Icon
        className={Styles.listItem.chevron}
        iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'}
      />
    </div>
  )

  const onFilterChanged = (e, input) => {
    setSearchResult(
      bookmarks.filter((item) => {
        const text = item.chapter + item.description
        const query = input.trim().split(/\s/)
        for (let i = query.length; i > 0; --i) {
          if (text.toLowerCase().indexOf(query[i - 1]) === -1) {
            return false
          }
        }
        return true
      })
    )
  }

  return (
    <FocusZone>
      <SearchBox
        placeholder="Search"
        styles={Styles.searchBox}
        onChange={onFilterChanged}
      />
      <List items={searchResult} onRenderCell={onRenderCell} />
    </FocusZone>
  )
}

export default BookmarkList
