const getCatalog = (article) => {
  const links = [{}]

  const pushLink = (element, links, index) => {
    const target = links[index]
    if (target.links === undefined) target.links = []
    target.links.push({
      key: element.id,
      name: element.textContent,
      url: `#${element.id}`,
    })
  }

  article
    .querySelectorAll('section h1')
    .forEach((element) => pushLink(element, links, 0))
  const section = article.querySelectorAll('section')
  for (let i = section.length - 1; i >= 0; --i) {
    const h3 = section[i].querySelectorAll('h3')
    let index = 0
    section[i].querySelectorAll('h2').forEach((element) => {
      pushLink(element, links[0].links, i)
      const subsection = element.id.split('-').slice(0, 2).join()
      while (
        h3[index] &&
        h3[index].id.split('-').slice(0, 2).join() === subsection
      ) {
        pushLink(
          h3[index],
          links[0].links[i].links,
          links[0].links[i].links.length - 1
        )
        ++index
      }
    })
  }
  return links
}

export default getCatalog
