// Dados das imagens
const images = [
	{
		id: 8,
		src: '../assets/images/botox_in/botox_in-1.webp',
		title: 'Botox in',
		link: '#',
		destino: 'destino8',
	},
	{
		id: 7,
		src: '../assets/images/juice/juice-1.webp',
		title: 'Juice',
		link: '#',
		destino: 'destino7',
	},
	{
		id: 6,
		src: '../assets/images/glace_gourmet/glace_gourmet-6.webp',
		title: 'Glace Gourmet',
		link: '#',
		destino: 'destino6',
	},
	{
		id: 5,
		src: '../assets/images/Animalia/animalia-1.webp',
		title: 'Animalia',
		link: '#',
		destino: 'destino',
	},
	{
		id: 4,
		src: '../assets/images/bah_burguer/bah_burguer-1.webp',
		title: 'Bah Burguer',
		link: '#',
		destino: '',
	},
	{
		id: 3,
		src: '../assets/images/focus_school/focus_school-8.webp',
		title: 'Focus School',
		link: '#',
		destino: '',
	},
	{
		id: 2,
		src: '../assets/images/Mamma_Mia/mamma_mia-1.webp',
		title: 'Mamma Mia',
		link: '#',
		destino: '',
	},
	{
		id: 1,
		src: '../assets/images/movimento_bem_estar/academia-4.webp',
		title: 'Movimento Bem Estar',
		link: '#',
		destino: '',
	},
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

	// Criar nova div
	const novaDiv = document.createElement('div');

	// Criar elemento de texto "Ver mais >>"
	const verMais = document.createElement('h4');
	verMais.textContent = 'Ver mais >>';

	// Adicionar classe personalizada para o texto "Ver mais >>"
	verMais.classList.add('ver-mais');
	novaDiv.classList.add('ver-mais');

	// Adicionar o elemento h3 à nova div
	novaDiv.appendChild(verMais);

	verMais.classList.add('ver-mais'); // Classe personalizada para o texto "Ver mais >>"

	// Criar elemento de link
	const link = document.createElement('a');

	// Configurar o link de destino com base na propriedade 'destino' da imagem
	switch (imageData.destino) {
		case 'destino1':
			link.href = '/destino1.html?id=' + imageData.id; // Link para o destino1.html
			break;
		case 'destino6':
			link.href = '/destino6.html?id=' + imageData.id; // Link para o destino3.html
			break;
		case 'destino7':
			link.href = '/destino7.html?id=' + imageData.id; // Link para o destino3.html
			break;
		case 'destino8':
			link.href = '/destino8.html?id=' + imageData.id; // Link para o destino3.html
			break;
		// ... adicionar mais casos para outros destinos ...
		default:
			link.href = '/destino.html?id=' + imageData.id; // Link padrão se não houver destino definido
			break;
	}

	link.classList.add('btn'); // Adicionar classe ao link
	link.addEventListener('click', () => {
		// Função para buscar informações do JSON com base no ID da imagem clicada
		fetch('./imagens.json')
			.then((response) => response.json())
			.then((data) => {
				const imageInfo = data.find((item) => item.id === imageData.id);
				if (imageInfo) {
					// Redirecionar para a página de destino com as informações da imagem
					window.location.href = `destino.html?id=${
						imageInfo.id
					}&title=${imageInfo.title}&texto1=${
						imageInfo.texto1
					}&texto2=${imageInfo.texto2}&imagens=${encodeURIComponent(
						JSON.stringify(imageInfo.imagens)
					)}`;
				}
			})
			.catch((error) => console.error(error));
	});

	link.appendChild(novaDiv); // Adicionar o texto "Ver mais >>" como filho do link
	link.appendChild(img); // Adicionar imagem como filho do link

	// Criar container para imagem, título e link
	const container = document.createElement('div');
	container.classList.add('cards-trabalhos', 'col-lg-5', 'mt-5'); // Adicionar classes ao container
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
	const scrollTop =
		document.documentElement.scrollTop || document.body.scrollTop;
	const windowHeight =
		window.innerHeight || document.documentElement.clientHeight;
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
	const scrollTop =
		document.documentElement.scrollTop || document.body.scrollTop;
	const windowHeight =
		window.innerHeight || document.documentElement.clientHeight;
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
