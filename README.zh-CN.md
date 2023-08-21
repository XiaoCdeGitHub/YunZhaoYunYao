### 开发

只需要执行以下命令就可以在 http://localhost:3333 中看到

```bash
pnpm dev
```

### 构建

构建该应用只需要执行以下命令

```bash
pnpm build
```

然后你会看到用于发布的 `dist` 文件夹被生成。

### In Docker
```bash
docker build -t yeez-web .
docker run -dit -p 8080:8080 --name test-yeez yeez-web
docker exec -it id /bin/sh
```
