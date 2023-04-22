// Dados das imagens
const images = [
    { src: '../assets/images/point-pizzaria.webp', title: 'Point Pizzaria', link: '#' },
    { src: '../assets/images/pod-falar.webp', title: 'PodFalar', link: '#' },
    { src: '../assets/images/IMG-6444.webp', title: 'Booster Social', link: '#' },
    { src: '../assets/images/celeiro.webp', title: 'Celeiro', link: '#' },
    { src: '../assets/images/midia-social-pacote.webp', title: 'Lady Hair', link: '#' },
    { src: '../assets/images/IMG-2000.webp', title: 'Angels Fusion', link: '#' },
    // adicione mais objetos de imagem aqui, se necessário
  ];

  // Configuração do infinite scroll
  const imagesPerBatch = 4; // Quantidade de imagens por lote
  let currentBatch = 0; // Lote atual
  const imageContainer = document.getElementById('image-container');
  const loadingIndicator = document.getElementById('loading-indicator');
  
  
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
    link.href = imageData.link; // Usar o link do array de imagens
    link.classList.add('btn'); // Adicionar classe ao link
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
    }, 1000);
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

// Event listener para verificar o scroll da página
window.addEventListener('scroll', checkScrollEnd);

// Inicialização do carregamento das imagens
loadImagesBatch();