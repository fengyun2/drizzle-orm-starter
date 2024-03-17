# drizzle-orm-starter

### 安装依赖

```bash
bun install
```

### 本地运行

```bash
bun run start
```

### 生成迁移文件记录

```bash
bun run db:generate
```

### 执行迁移文件

```bash
bun run db:push
```

### 初始化db数据

```bash
bun run db:seed
```

### 已知问题

1. dyld: lazy symbol binding failed: Symbol not found: _pwritev$NOCANCEL

在MacOS 10.15.7 + bun@1.0.31 上出现该错误

解决方案，降级bun版本到1.0.1