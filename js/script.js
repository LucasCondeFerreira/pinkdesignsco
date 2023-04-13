// Dados das imagens
const images = [
    { id: 1, src: '../assets/images/point-pizzaria.JPG', title: 'Point Pizzaria', link: '#' },
    { id: 2, src: '../assets/images/pod-falar.JPG', title: 'PodFalar', link: '#' },
    { id: 3, src: '../assets/images/IMG-6444.JPG', title: 'Booster Social', link: '#' },
    { id: 4, src: '../assets/images/celeiro.JPG', title: 'Celeiro', link: '#' },
    { id: 5, src: '../assets/images/midia-social-pacote.JPEG', title: 'Lady Hair', link: '#' },
    { id: 6, src: '../assets/images/IMG-2000.JPEG', title: 'Angels Fusion', link: '#' }
    // adicione mais objetos de imagem aqui, se necessário
  ];
  
// Configuração do infinite scroll
const imagesPerBatch = 4; // Quantidade de imagens por lote
let currentBatch = 0; // Lote atual
const imageContainer = document.getElementById('image-container');
const loadingIndicator = document.getElementById('loading-indicator');
const imageContainerHeight = imageContainer.offsetHeight; // Altura do container de imagens
let loading = false; // Variável para verificar se está carregando

// Função para criar o elemento de imagem com título e link
function createImageElement(imageData) {
  // Criar elemento de imagem
  const img = document.createElement('img');
  img.src = imageData.src;
  img.alt = imageData.title;

  // Adicionar classe à imagem
  img.classList.add('principal'); // Classe personalizada para a imagem

  // Criar elemento de título
  const title = document.createElement('h2');
  title.textContent = imageData.title;

  // Adicionar classe ao título
  title.classList.add('principal'); // Classe personalizada para o título

  // Criar elemento de link
  const link = document.createElement('a');
  link.href = '#'; // Alterar o link para a página desejada
  link.classList.add('btn'); // Adicionar classe ao link
  link.addEventListener('click', () => {
    // Função para buscar informações do JSON com base no ID da imagem clicada
    fetch('./imagens.json')
      .then(response => response.json())
      .then(data => {
        const imageInfo = data.find(item => item.id === imageData.id);
        if (imageInfo) {
          // Aqui você pode acessar as informações do JSON e fazer o que desejar
          console.log('Título:', imageInfo.title);
          console.log('Texto 1:', imageInfo.texto1);
          console.log('Texto 2:', imageInfo.texto2);
          console.log('Imagens:', imageInfo.imagens);
        }
      })
      .catch(error => console.error(error));
  });
  link.appendChild(img); // Adicionar imagem como filho do link
  link.appendChild(title); // Adicionar título como filho do link

  // Criar container para imagem, título e link
  const container = document.createElement('div');
  container.classList.add('cards-trabalhos', 'col-lg-5'); // Adicionar classes ao container
  container.appendChild(link); // Adicionar link como filho do container

  // Adicionar container à galeria
  imageContainer.appendChild(container);

  // Adicionar evento de clique para as imagens
  img.addEventListener('click', function() {
    const imageId = imageData.id; // Corrigir a obtenção do ID da imagem
    const imageInfo = getImageInfo(imageId); // Obter informações da imagem com base no ID
    if (imageInfo) {
      showImageDetails(imageInfo); // Exibir detalhes da imagem em um modal ou pop-up
    }
  });
}

// Função para obter informações da imagem com base no ID
function getImageInfo(imageId) {
  for (let i = 0; i < images.length; i++) {
    if (images[i].id === imageId) {
      return images[i]; // Retornar informações da imagem
    }
  }
  return null; // Retornar null caso não seja encontrada nenhuma imagem com o ID fornecido
}
  
  // Função para exibir os detalhes da imagem em uma nova página
  function showImageDetails(imageData) {
    const title = imageData.title;
    const texto1 = imageData.texto1;
    const texto2 = imageData.texto2;
    const imagens = imageData.imagens;
  
    // Criar uma nova janela do navegador
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
        <p>${texto1}</p>
        <p>${texto2}</p>
      <h2>Imagens:</h2>
      <ul>
        ${imagens.map(imagem => `<li><img src="${imagem.src}" alt="${imagem.alt}"></li>`).join('')}
      </ul>
    </body>
    </html>
  `);
  newWindow.document.close();
}


  // Função para carregar lote de imagens
  function loadImagesBatch() {
    showLoadingIndicator();
  
    // Simulação de requisição assíncrona
    setTimeout(() => {
      const batch = images.slice(currentBatch, currentBatch + imagesPerBatch);
      batch.forEach((imageData) => {
        createImageElement(imageData);
      });
  
      currentBatch += imagesPerBatch;
  
      hideLoadingIndicator();
    }, 2000);
  }
  
  // Função para verificar se o scroll chegou ao fim da página
  function checkScrollEnd() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    if (scrollTop + windowHeight >= documentHeight - 100) {
      // Próximo lote de imagens
      loadImagesBatch();
    }
  }
  
  // Função para exibir o indicador de carregamento
  function showLoadingIndicator() {
    loadingIndicator.style.display = 'block';
  }
 // Função para ocultar o indicador de carregamento
 function hideLoadingIndicator() {
    loadingIndicator.style.display = 'none';
  }

  // Função para verificar se o scroll chegou ao fim do container de imagens
  function checkScrollEnd() {
    const containerHeight = imageContainer.offsetHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (scrollTop + windowHeight >= containerHeight) {
      // Próximo lote de imagens
      loadImagesBatch();
    }
  }

  // Adicionar evento de scroll ao container de imagens
  imageContainer.addEventListener('scroll', () => {
    checkScrollEnd();
  });


// Event listener para verificar o scroll da página
window.addEventListener('scroll', checkScrollEnd);

// Inicialização do carregamento das imagens
loadImagesBatch();

