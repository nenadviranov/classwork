const router = require('express').Router();

router.get('/author', (req, res) => {
  console.log(req.query);
  res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title id="tabTitle">Collaborative Frontend Project</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
</head>

<body class="bg-warning">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand position-absolute position-fixed m-0 p-0" href="../" style="z-index: 1;">
            <img class="m-0 p-0" src="../assets/team-b.png" width="64" class="d-inline-block align-top" alt="team b" />
        </a>
        <div class="navbar-collapse collapse">
            <ul class="navbar-nav m-auto">

                <li class="nav-item ml-3 ml-sm-1 my-auto">
                    <a class="nav-link btn btn-lg btn-outline-primary p-sm-1 p-md-4" href="../">Articles</a>
                </li>

                <li class="nav-item m-1 my-auto">
                    <a class="nav-link btn btn-lg btn-outline-primary p-sm-1 p-md-4" href="../authors/">Authors</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container-fluid bg-dark text-light text-center">
        <div class="row">
            <div class="col-12">
                <div id="authorRoot">

                </div>
                <hr class="w-100 mb-3 p-1 rounded-pill bg-warning" />
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div id="root" class="row"></div>
    </div>

    <script src="https://unpkg.com/mustache@latest"></script>
    <script src="../data/data.js"></script>
    <script src="../data/tags.js"></script>
    <script src="../data/articles.js"></script>
    <script src="../data/authors.js"></script>
    <script src="../data/comments.js"></script>
    <script src="../templates/cardTpl.js"></script>
    <script src="../templates/authorTpl.js"></script>
    <script src="../data/mainFunction.js"></script>
    <script src="../author/script.js"></script>

</body>

</html>`);
});

module.exports = router;
