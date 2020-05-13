const AUTHOR_RUN = async () => {
    const d = document;
    const authors = await getAuthors();
    const articles = await getArticles();
    const urlParams = new URLSearchParams(window.location.search);
    const author = await getAuthorById(urlParams.get('id'));

    const authorArticlesFilter = articles.filter(article => {
        return article.authorId === author.id;
    })
        .sort((a, b) => {
            return b.date > a.date ? 1 : -1;
        })

    d.querySelector('#authorRoot').innerHTML = Mustache.render(authorTpl, {
        author: author
    });

    d.querySelector('#root').innerHTML = Mustache.render(ARTICLE_CARD('../'), {
        articles: getArticleByAuthor(authorArticlesFilter, authors)
    });

    d.querySelector('#authorNumArticles').innerText = authorArticlesFilter.length +' Articles';
    d.querySelector('#tabTitle').innerText = author.name;
};
AUTHOR_RUN();