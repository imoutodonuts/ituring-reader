import {
  IconButton,
  List,
  Nav,
  Panel,
  Text,
  TooltipHost,
} from '@fluentui/react'
import { useBoolean } from '@uifabric/react-hooks'
import DOMPurify from 'dompurify'
import { useRef, useState } from 'react'
import { getAuthors, getCatalog } from '../../utils'
import Article from '../Article'
import BookmarkList from '../BookmarkList'
import BookmarkWidget from '../BookmarkWidget'
import Styles from './styles'

const Reader = () => {
  const [content, setContent] = useState('')
  const [catalog, setCatalog] = useState([])
  const [bookInfo, setBookInfo] = useState()
  const [bookmark, setBookmark] = useState({})
  const [bookmarks, setBookmarks] = useState([])
  const [widgetOffset, setWidgetOffset] = useState()
  const container = useRef()
  const fileInput = useRef()
  const [
    isPanelOpen,
    { setTrue: openPanel, setFalse: dismissPanel },
  ] = useBoolean(false)

  const readBook = (e) => {
    const fileReader = new FileReader()
    const file = e.target.files[0]
    if (file) {
      fileReader.readAsText(file)
      fileReader.onload = () => {
        window.scrollTo(0, 0)
        setContent(DOMPurify.sanitize(fileReader.result))
        const title = container.current.querySelector('header a').textContent
        document.title = title
        setBookInfo([title, ...getAuthors(container.current)])
        setCatalog(getCatalog(container.current))
      }
    }
  }

  const popupWidget = (e) => {
    const article = container.current.firstElementChild
    if (
      article.contains(e.target) &&
      e.target !== article &&
      e.target.tagName !== 'SECTION' &&
      !article.firstElementChild.contains(e.target) &&
      !article.lastElementChild.contains(e.target)
    ) {
      let target = e.target
      while (
        target.parentElement &&
        target.parentElement.tagName !== 'SECTION'
      ) {
        target = target.parentElement
      }
      let floors = 0
      while (target.previousElementSibling && !target.id) {
        target = target.previousElementSibling
        ++floors
      }
      setBookmark({
        chapter: target.textContent,
        description: `Paragraph ${floors}`,
        coordinate: e.pageY,
      })
      setWidgetOffset({
        top: e.pageY + 10,
        left: e.pageX + 10,
      })
    } else e.preventDefault()
  }

  const pushBookmark = () => {
    setBookmarks([...bookmarks, bookmark])
    setWidgetOffset(undefined)
    setBookmark({})
  }

  const onRenderBookInfo = () => (
    <List
      className={Styles.bookInfo.list}
      items={bookInfo}
      onRenderCell={(item) => (
        <Text block variant="small">
          {item}
        </Text>
      )}
    />
  )

  return (
    <div>
      <div className={Styles.actionMenu.container.top}>
        <IconButton
          iconProps={{ iconName: 'Add' }}
          title="打开书籍"
          styles={Styles.actionMenu.IconButton}
          onClick={() => fileInput.current.click()}
        />
        {bookInfo && (
          <TooltipHost tooltipProps={{ onRenderContent: onRenderBookInfo }}>
            <IconButton
              iconProps={{ iconName: 'Info' }}
              styles={Styles.actionMenu.IconButton}
            />
          </TooltipHost>
        )}
      </div>
      <Nav groups={catalog} styles={Styles.nav} />
      <Article
        container={container}
        content={content}
        popupWidget={popupWidget}
      />
      {widgetOffset && (
        <BookmarkWidget
          offset={widgetOffset}
          setOffset={setWidgetOffset}
          bookmark={bookmark}
          setBookmark={setBookmark}
          pushBookmark={pushBookmark}
        />
      )}
      <Panel
        headerText="Bookmarks"
        isLightDismiss={true}
        isOpen={isPanelOpen}
        styles={Styles.panel}
        onDismiss={dismissPanel}
      >
        <BookmarkList bookmarks={bookmarks} onDismiss={dismissPanel} />
      </Panel>
      <div className={Styles.actionMenu.container.bottom}>
        <IconButton
          iconProps={{ iconName: 'ChevronUp' }}
          title="回到顶部"
          styles={Styles.actionMenu.IconButton}
          onClick={() => {
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
          }}
        />
        <IconButton
          iconProps={{ iconName: 'SingleBookmark' }}
          title="查看书签"
          styles={Styles.actionMenu.IconButton}
          onClick={openPanel}
        />
      </div>
      <input
        ref={fileInput}
        type="file"
        className={Styles.fileInput}
        onChange={readBook}
      />
    </div>
  )
}

export default Reader
