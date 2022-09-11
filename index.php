<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Link static style sheet -->
    <link rel="stylesheet" href="./assets/styles/style.css" />

    <!-- Link custom style sheet -->
    <link rel="stylesheet" href="./assets/styles/custom.css" />

    <!-- Swioer Slides dependecie and scripts  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>

    <!-- Bootstrap script -->

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

    <!-- Font Awesome script -->

    <script src="https://kit.fontawesome.com/9efff873bb.js" crossorigin="anonymous"></script>



    <title>Home</title>
  </head>
  <body>
    <?php 

    include('./surfaces/header.html');
    include('./index/foto.html');
    include('./index/marca.html');
    include('./index/mensagem.html');
    include('./index/descricao.html');
    include('./index/mensagem.html');
    include('./index/leia.html');
    include('./index/pacotes.html');
    include('./index/banner.html');
    include('./surfaces/slide.html');
    include('./surfaces/footer.html');

?>
  </body>
</html>
