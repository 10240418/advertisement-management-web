# advertisement-management-web/Dockerfile
# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app

# 复制依赖文件并安装
COPY package.json yarn.lock ./
RUN yarn install

# 复制项目文件并构建
COPY . .
RUN yarn build:ci

