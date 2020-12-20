const getAuthors = (article) => {
  const authors = []
  article
    .querySelectorAll('footer span')
    .forEach((element) => authors.push(element.textContent))
  return authors
}

export default getAuthors
