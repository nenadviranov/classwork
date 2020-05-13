const getArticles = () => {
  return fetch('/api/articles').then(response => response.json());
};
const getArticleById = _id => {
  return Promise.resolve(data.articles.find(({ id }) => _id === id));
};
