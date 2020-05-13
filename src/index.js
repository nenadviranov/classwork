// const articles = require('./json/articles.json');
// const tags = require('./json/tags.json');
// const authors = require('./json/authors.json');
// const comments = require('./json/comments.json');
const moment = require('moment');
const fetch = require('node-fetch');

const getEndpoints = async endpoint => {
  let response = await fetch(
    `https://igorfullstack.herokuapp.com/api/${endpoint}`
  );
  let data = await response.json();
  return data;
};

const articlesAPI = getEndpoints('articles').then(data => data);
const authorsAPI = getEndpoints('authors').then(data => data);
const commentsAPI = getEndpoints('comments').then(data => data);
const tagsAPI = getEndpoints('tags').then(data => data);

const authorsHashMap = async () => {
  const authors = await authorsAPI;

  return authors.reduce((acc, author) => {
    acc[author.id] = author;
    return acc;
  }, {});
};

const extendedComments = async () => {
  const comments = await commentsAPI;

  return comments.map(comment => ({
    ...comments,
    date: moment(comment.date).startOf('day').fromNow(),
    sortableDate: moment(comment.date).format('YYYYMMDD'),
    ts: moment(comment.date).unix(),
    author: authorsHashMap[comment.userId]
  }));
};

const extendedArticles = async () => {
  const articles = await articlesAPI;

  return articles.map(article => ({
    ...article,
    comments: extendedComments
      .filter(({ articleId }) => articleId === article.id)
      .sort((a, b) => (a.ts > b.ts ? 1 : -1)),
    date: moment(article.date).format('Do MMMM YYYY'),

    author: authorsHashMap[article.authorId],
    tagsArr: article.tags,
    tags: article.tags.map(slug => ({
      slug,
      title: tags[slug]
    }))
  }));
};

const extendedAuthors = async () => {
  const authors = await authorsAPI;

  return authors.map(author => ({
    ...author,
    articles: extendedArticles.filter(({ authorId }) => authorId === author.id)
  }));
};

const extendedTags = async () => {
  const tags = await tagsAPI;

  return Object.keys(tags).map(slug => ({
    slug,
    title: tags[slug]
  }));
};

module.exports = {
  articles: extendedArticles,
  authors: extendedAuthors,
  tags: extendedTags
};
