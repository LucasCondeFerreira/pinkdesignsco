// Dados das imagens
const images = [
    { id: 1, src: '../assets/images/academia-12.png', title: 'Movimento Bem Estar', link: '#' },
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
  link.href = 'destino.html?id=' + imageData.id; // Link que envia o ID da imagem
  link.classList.add('btn'); // Adicionar classe ao link
  link.addEventListener('click', () => {
    // Função para buscar informações do JSON com base no ID da imagem clicada
    fetch('./imagens.json')
      .then(response => response.json())
      .then(data => {
        const imageInfo = data.find(item => item.id === imageData.id);
        if (imageInfo) {
          // Redirecionar para a página de destino com as informações da imagem
          window.location.href = `destino.html?id=${imageInfo.id}&title=${imageInfo.title}&texto1=${imageInfo.texto1}&texto2=${imageInfo.texto2}&imagens=${encodeURIComponent(JSON.stringify(imageInfo.imagens))}`;
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

