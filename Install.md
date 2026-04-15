
1. На linux машине

```bash
docker run -it --rm -v ~/keycloakify-starter:/app -w /app node:24-slim sh -c "apt-get update && apt-get install -y maven default-jre && npm install -g yarn && exec sh"
```

2. убедиться, что версия в папке актуальная и затем:

```bash
yarn install 

yarn build-keycloak-theme
```



C Dockerfile

```bash
docker build -t keycloakify-builder .

docker run -it --rm -v ~/keycloakify-starter:/app keycloakify-builder

# yarn install && yarn build-keycloak-theme
```