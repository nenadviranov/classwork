const urlParams = new URLSearchParams(window.location.search);

const BLOG = async () => {
  const d = document;
  const tags = await getTags();
  const authors = await getAuthors();
  const baseUrl = './'
  const articles = await getArticles().then((articles) => {
    return articles.sort((a, b) => {
      return b.date > a.date ? 1 : -1;
    });
  });

  d.querySelector('#articlesNum').innerText = articles.length;

  const sortBtn = d.getElementById('sort-btn');
  sortBtn.addEventListener('click', () => {
    if (sortBtn.innerText === 'Sort by name') {
      const sortedByName = getArticleByAuthor(articles, authors);
      sortedByName.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });

      d.querySelector('#root').innerHTML = Mustache.render(ARTICLE_CARD(baseUrl), {
        articles: sortedByName,
      });
      sortBtn.innerText = 'Sort by date';
    } else {
      d.querySelector('#root').innerHTML = Mustache.render(ARTICLE_CARD(baseUrl), {
        articles: getArticleByAuthor(articles, authors),
      });
      sortBtn.innerText = 'Sort by name';
    }
  });


  let currentPage = 0;
  const articlesPerPage = 10;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  console.log(totalPages);
  const getPages = (currentPage) => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push({
        dataPage: i,
        label: i + 1,
        activeClass: currentPage === i ? 'active' : '',
      });
    }

    return pages;
  };
  const disabledPrevNext = (currentPage) => {
    let prevNextBtn = [
      {
        disabledPrev: currentPage === 0 ? 'disabled' : '',
        disabledNext: currentPage === totalPages - 1 ? 'disabled' : '',
      },
    ];
    return prevNextBtn;
  };
const artTpl = ARTICLE_CARD(baseUrl)
  d.querySelector('#root').innerHTML = Mustache.render(artTpl, {
    articles: getArticleByAuthor(articles, authors).slice(
      currentPage * articlesPerPage,
      articlesPerPage * (currentPage + 1)
    ),
    pages: getPages(currentPage),
    pagination: disabledPrevNext(currentPage),
  });

  const tagArrValue = Object.values(tags);
  d.querySelector('#selectRoot').innerHTML = Mustache.render(tagsBtnTpl('./'), {
    tagArrV: tagArrValue,
  });
  d.querySelector('#root').addEventListener('click', (e) => {
    if (e.target.matches('.page-numbers')) {

      currentPage = e.target.getAttribute('data-page') * 1;
      document.querySelector('#root').innerHTML = Mustache.render(ARTICLE_CARD(baseUrl), {
        articles: getArticleByAuthor(articles, authors).slice(
          currentPage * articlesPerPage,
          articlesPerPage * (currentPage + 1)
        ),
        pages: getPages(currentPage),
        pagination: disabledPrevNext(currentPage),
      });
    }

    if (e.target.matches('.prev-next')) {

      e.target.getAttribute('data-prevNext') === 'next' ? currentPage++ : currentPage--;
      document.querySelector('#root').innerHTML = Mustache.render(ARTICLE_CARD(baseUrl), {
        articles: getArticleByAuthor(articles, authors).slice(
          currentPage * articlesPerPage,
          articlesPerPage * (currentPage + 1)
        ),
        pages: getPages(currentPage),
        pagination: disabledPrevNext(currentPage),
      });
    }
  });
  const serachButton = d.getElementById('serach-btn');
  const serachBar = d.getElementById('search-bar');
  serachButton.addEventListener('click', () => {
    const results = articles.filter(article => {
      if (article.title.split(' ').includes(serachBar.value)) {
        return article;
      };
    });

    d.querySelector('#root').innerHTML = Mustache.render(ARTICLE_CARD(baseUrl), {
      articles: getArticleByAuthor(results, authors),
    });
    d.querySelector('#articlesNum').innerText = results.length;
    sortBtn.className = 'invisible';
  })
  
};
BLOG();
