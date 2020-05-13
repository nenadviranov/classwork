const getComments = () => {
  return fetch('/api/comments').then(response => response.json());
};
const getCommentById = _id => {
  return Promise.resolve(data.comments.find(({ id }) => _id === id));
};

const getCommentsByArticleId = articleId => {
  return Promise.resolve(
    data.comments.filter(comment => {
      return comment.articleId === articleId;
    })
  );
};
