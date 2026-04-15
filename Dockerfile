# Используем стабильную версию Node.js
FROM node:24-slim

# Устанавливаем переменные окружения, чтобы apt не задавал вопросов
ENV DEBIAN_FRONTEND=noninteractive

# Устанавливаем Maven и Java (необходимы для сборки .jar файла темы)
RUN apt-get update && apt-get install -y \
    maven \
    default-jre \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей для кеширования (опционально, но ускоряет билд)
# Если вы планируете только монтировать папку, этот шаг можно пропустить,
# но для "честного" билда внутри образа это полезно:
# COPY package.json yarn.lock* ./
# RUN yarn install

# Команда по умолчанию
CMD ["sh"]