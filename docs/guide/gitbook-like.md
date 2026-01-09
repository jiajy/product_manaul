# GitBook 同款能力（MkDocs + Material）

## 1) Step / 步骤（类似 GitBook Steps）

推荐用一个 wrapper（稳定，不受表格/列表解析影响）：

<div class="steps" markdown="1">

1. 准备环境：安装 Python 3.10+ / 3.11+（推荐）

    - 如果你用的是 Windows，建议用 `python -m mkdocs serve`
    - 如果你要固定端口：`python -m mkdocs serve -a 127.0.0.1:8000`

2. 安装依赖：`pip install -r requirements.txt`

    你也可以创建虚拟环境（推荐）：

    ```bash
    python -m venv .venv
    .venv\\Scripts\\activate
    pip install -r requirements.txt
    ```

3. 本地预览：`mkdocs serve`

4. 发布到 Pages：push 到 `main` 分支（见下文 workflow）

</div>

**注意**：如果你希望“同一个步骤”里有多行（段落/子列表/代码块），这些行必须相对 `1.` **再缩进至少 4 个空格**，否则会被解析成“新的步骤项”，看起来就像每个 step 只有一行。

## 2) 提示块（GitBook Callouts）

Material 支持 GitBook 常见的提示块：

!!! note "说明"
    这是 note 提示块（适合补充信息）。

!!! tip "建议"
    这是 tip（建议/最佳实践）。

!!! warning "注意"
    这是 warning（风险提示）。

!!! danger "危险"
    这是 danger（强风险/不可逆操作）。

也支持可折叠：

???+ info "可折叠内容"
    默认展开的折叠块（`???+`）。

## 3) 表格颜色 / 斑马纹 / 单元格高亮

### 3.1 默认表格自动美化（含斑马纹）

| 项目 | 状态 | 备注 |
|---|---|---|
| 路由检查 | <span class="cell-ok">OK</span> | 已通过 |
| 防火墙 | <span class="cell-warn">WARN</span> | 需要复核规则 |
| 端口 80 | <span class="cell-bad">FAIL</span> | 被占用 |

### 3.2 表格主题（表头颜色）

给表格加“主题”推荐用 wrapper（稳定）：

<div class="table-primary" markdown="1">

| 模块 | 负责人 | 风险 |
|---|---|---|
| A | 张三 | 低 |
| B | 李四 | 高 |

</div>

<div class="table-danger" markdown="1">

| 模块 | 负责人 | 风险 |
|---|---|---|
| C | 王五 | 高 |
| D | 赵六 | 极高 |

</div>

更紧凑的表格：

<div class="table-compact" markdown="1">

| Key | Value |
|---|---|
| a | 1 |
| b | 2 |

</div>

## 4) 代码块增强（复制按钮/高亮/行号锚点）

```bash
pip install -r requirements.txt
mkdocs serve
```

## 5) 文本高亮（类似 GitBook Highlight）

使用 `==高亮==`（已启用 `pymdownx.mark`）：

==这段文字会高亮显示==

