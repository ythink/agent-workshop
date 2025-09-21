FROM mcr.microsoft.com/devcontainers/javascript-node:20

# 追加のパッケージのインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# グローバルなnpmパッケージのインストール
RUN npm install -g npm@latest \
    nodemon \
    eslint \
    prettier

# 作業ディレクトリの設定
WORKDIR /workspaces/agent-workshop