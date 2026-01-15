# 可视化编辑（所见即所得）方案

## 结论

- **MkDocs + GitHub Pages 本身不提供 GitBook 那种内置 WYSIWYG 编辑器**。
- 但可以通过 **Decap CMS（原 Netlify CMS）** 提供一个网页端编辑入口 `/admin/`：
  - 支持可视化表单 + Markdown 编辑 + 实时预览
  - 保存后直接提交到 GitHub 仓库（PR 或直接 commit，取决于你的配置）

## 本仓库已包含的内容

- `docs/zh/admin/index.html`：编辑入口页面（构建后路径为 `/admin/`）
- `docs/zh/admin/config.yml`：Decap CMS 配置模板（本仓库已按 **方案 A：Netlify** 配好）

## 你需要补的“鉴权/登录”

GitHub Pages 不能跑后端，所以 Decap CMS 的登录需要外部鉴权。我们选用：

### 方案 A（推荐）：Netlify（最省事）

- 用 Netlify 托管站点（推荐：站点也放 Netlify，`/admin/` 才能同源工作）
- 启用 Netlify Identity + Git Gateway
- Decap CMS backend 使用 `git-gateway`（本仓库已配置完成）

优点：配置最简单、维护成本最低。

## 建议的目录组织（更适合可视化编辑）

为了避免编辑器扫到不该编辑的文件，建议把可编辑文档集中到：

- `docs/zh/pages/**.md`

本仓库的 Decap collection 已指向 `docs/zh/pages`（可在 `/admin/` 里新建页面）。

## 访问入口

部署后访问：

- **展示站点（GitHub Pages）**：`https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO>/`
- **编辑入口（Netlify Admin）**：`https://<your-netlify-site>.netlify.app/admin/`

## 方案 A（Netlify）最短配置步骤

1. 在 Netlify 新建站点：选择 “Import from Git”，选你的 GitHub 仓库。
2. Build 设置：
   - Build command：已提供 `netlify.toml`，一般无需改
   - Publish directory：`site`
3. 进入 Netlify 后台：
   - **Site configuration → Identity**：Enable Identity
   - **Identity → Registration**：可先设为 Invite only（更安全）
   - **Identity → Services**：Enable **Git Gateway**
4. 邀请编辑者：
   - Identity → Invite users
5. 打开编辑器：
   - `https://<your-netlify-site>.netlify.app/admin/`

说明：
- **保存后会直接提交到 GitHub 的 `main`**（或你设定的分支）。

## 方案 2：展示用 GitHub Pages，编辑用 Netlify（推荐给你）

你选择的就是这一套：**访问者看 GitHub Pages**，**编辑者去 Netlify 的 `/admin/`**。

### 工作流长这样

- 编辑者在 Netlify `/admin/` 登录并保存
- Decap CMS 通过 Git Gateway **把改动 commit 到 GitHub 仓库**
- GitHub Actions（见 `.github/workflows/deploy-pages.yml`）自动构建并发布到 **GitHub Pages**

### 你需要做什么（最短清单）

1. **GitHub Pages 继续保持 GitHub Actions 发布源**（你之前已经配置过的话不用动）
2. Netlify 建站并启用 Identity/Git Gateway（见上文“最短配置步骤”）
3. 告诉编辑者只用这个入口编辑：
   - `https://<your-netlify-site>.netlify.app/admin/`

### 注意事项

- **Netlify 上同样会有一份站点**（因为我们用 `netlify.toml` 构建并发布 `site/`），但你可以把它当“编辑专用域名”，对外宣传只给 GitHub Pages。
- 如果你不希望 Netlify 站点被外部访问，可在 Netlify 后台加访问控制（比如密码/仅邀请用户），或后续我帮你加 `robots.txt` / header 限制。

## 需要你改的占位符/注意事项

- `docs/zh/admin/config.yml` 使用 `git-gateway` 时不需要填 `repo`，但你需要在 Netlify 后台把 Git Gateway 连接到你的 GitHub 仓库。
- MkDocs 的 `nav` 需要手动维护：编辑者在 CMS 新建页面后，你仍需在 `mkdocs.yml` 里把页面挂到导航（这是 MkDocs 的特性）。

