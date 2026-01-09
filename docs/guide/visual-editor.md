# 可视化编辑（所见即所得）方案

## 结论

- **MkDocs + GitHub Pages 本身不提供 GitBook 那种内置 WYSIWYG 编辑器**。
- 但可以通过 **Decap CMS（原 Netlify CMS）** 提供一个网页端编辑入口 `/admin/`：
  - 支持可视化表单 + Markdown 编辑 + 实时预览
  - 保存后直接提交到 GitHub 仓库（PR 或直接 commit，取决于你的配置）

## 本仓库已包含的内容

- `docs/admin/index.html`：编辑入口页面（构建后路径为 `/admin/`）
- `docs/admin/config.yml`：Decap CMS 配置模板

## 你需要补的“鉴权/登录”

GitHub Pages 不能跑后端，所以 Decap CMS 的登录需要外部 OAuth/鉴权代理，常见做法两种：

### 方案 A（推荐）：Netlify（最省事）

- 用 Netlify 托管一个“管理端/鉴权”（也可以顺便托管站点）
- 启用 Netlify Identity + Git Gateway
- Decap CMS backend 改为 `git-gateway`

优点：配置最简单、维护成本最低。

### 方案 B：Vercel/Cloudflare 部署 OAuth Provider

- 单独部署一个 `decap-cms-oauth-provider`（或等效实现）
- 在 `docs/admin/config.yml` 填：
  - `base_url`
  - `auth_endpoint`

优点：站点仍可继续用 GitHub Pages；缺点：需要你维护一个小服务。

## 建议的目录组织（更适合可视化编辑）

为了避免编辑器扫到不该编辑的文件，建议把可编辑文档集中到：

- `docs/pages/**.md`

然后在 `docs/admin/config.yml` 把 `folder: "docs"` 改为 `folder: "docs/pages"`。

## 访问入口

部署后访问：

- `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO>/admin/`

