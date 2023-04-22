// Função para substituir as imagens nos elementos <img> existentes
function replaceImagesWithJsonData(data) {
  for (var i = 0; i < data.length; i++) {
    var img = document.getElementById('img' + data[i].id);
    if (img) {
      img.src = data[i].src;
      img.alt = data[i].alt;
      img.setAttribute("data-src", data[i].src); // Adicionar o atributo "data-src"
    }
  }
}

// Função para obter parâmetros da URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Função para exibir os detalhes da imagem
function showImageDetails() {
  const id = Number(getParameterByName('id')); // Converter o parâmetro 'id' em um número

  // Carregar o arquivo JSON
  fetch('./js/imagens.json')
    .then((response) => response.json())
    .then((data) => {
      // Procurar as informações correspondentes ao ID fornecido
      const image = data.find((image) => image.id === id);
      if (!image) {
        console.error('ID de imagem inválido');
        return;
      }

      // Atualizar os elementos HTML com os detalhes da imagem
      document.getElementById('texto1').textContent = image.texto1;
      document.getElementById('texto2').textContent = image.texto2;

      // Substituir as imagens nos elementos <img> existentes
      replaceImagesWithJsonData(image.imagens);
    })
    .catch((error) =>
      console.error('Erro ao carregar o arquivo JSON:', error)
    );
}

// Chamar a função para exibir os detalhes da imagem ao carregar a página
window.onload = showImageDetails;

// Seleciona todas as imagens
var images = document.querySelectorAll("img");

// Loop para percorrer todas as imagens
for (var i = 0; i < images.length; i++) {
  var image = images[i];

  // Verifica se a imagem não tem um atributo "src" ou se o "src" está vazio ou com espaço em branco
  if (!image.hasAttribute("src") || image.getAttribute("src") === "" || image.getAttribute("src").trim() === "#") {
    // Verifica se o atributo "src" foi adicionado dinamicamente e se a imagem não possui o atributo "data-src"
    if (!image.getAttribute("data-src")) {
      // Remove a imagem após 6 segundos
      setTimeout(function(imageToRemove) {
        if (!imageToRemove.hasAttribute("data-src")) { // Verifica novamente se o atributo "data-src" não foi adicionado dinamicamente
          imageToRemove.parentNode.removeChild(imageToRemove);
        }
      }, 3000, image);
    }
  }
}
