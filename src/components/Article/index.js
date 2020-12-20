import './index.scss'

const Article = ({ container, content, popupWidget }) => (
  <div
    ref={container}
    onClick={(e) => {
      if (!e.altKey) return
      popupWidget(e)
    }}
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  />
)

export default Article
