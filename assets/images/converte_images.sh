#!/bin/bash

# Função para exibir o menu de seleção
display_menu() {
  echo "Selecione o formato de saída:"
  echo "1) PNG"
  echo "2) JPG"
  echo "3) JPEG"
  echo "4) WebP"
  echo "5) Sair"
}

# Verifica se o ImageMagick está instalado
if ! command -v convert > /dev/null 2>&1; then
  echo "Erro: ImageMagick não está instalado. Instale o ImageMagick para usar este script."
  exit 1
fi

# Loop para exibir o menu e processar a seleção do usuário
while true; do
  display_menu
  read -p "Digite o número da opção desejada: " choice
  case $choice in
    1)
      output_extension="png"
      break
      ;;
    2)
      output_extension="jpg"
      break
      ;;
    3)
      output_extension="jpeg"
      break
      ;;
    4)
      output_extension="webp"
      break
      ;;
    5)
      echo "Saindo..."
      exit 0
      ;;
    *)
      echo "Opção inválida. Tente novamente."
      ;;
  esac
done

# Função para obter o caminho de entrada (diretório do arquivo de script)
get_input_folder() {
  while true; do
    read -p "Digite o caminho da pasta de entrada (caminho relativo, caminho absoluto ou pasta onde o script se encontra): " input_folder
    if [ ! -d "$input_folder" ]; then
      echo "Pasta de entrada inválida. Tente novamente."
    else
      break
    fi
  done
}

# Obtém o caminho da pasta de entrada
get_input_folder

# Loop através de todos os arquivos na pasta de entrada
for file in "$input_folder"/*; do
  # Verifica se o arquivo é um arquivo regular
  if [ -f "$file" ]; then
    # Extrai a extensão do arquivo
    extension="${file##*.}"
    # Converte a extensão para letras minúsculas
    extension_lower="${extension,,}"
    # Verifica se a extensão está entre as extensões suportadas
    if [[ "$extension_lower" == @(png|jpg|jpeg) ]]; then
      # Obtém o nome do arquivo sem a extensão
      filename="${file%.*}"
      # Define o nome do arquivo de saída com a extensão .webp
      output_file="$filename.webp"
      # Executa o comando de conversão para webp, usando a extensão de saída selecionada pelo usuário
      convert "$file" "-format" "$output_extension" "$output_file"
      echo "Arquivo convertido: $output_file"
    fi
  fi
done

echo "Conversão concluída."
