# 表格合并（表头/单元格）与导出 PDF

## 1) 表格：合并表头与单元格（colspan / rowspan）

**结论**：Markdown 原生表格不支持合并单元格。MkDocs 里要做合并，请直接写 HTML `<table>`。

下面是可直接复制的示例：

<table>
  <thead>
    <tr>
      <th rowspan="2">模块</th>
      <th colspan="2">结果（合并表头）</th>
      <th rowspan="2">备注</th>
    </tr>
    <tr>
      <th>状态</th>
      <th>负责人</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">路由</td>
      <td><span class="cell-ok">OK</span></td>
      <td>张三</td>
      <td>主链路</td>
    </tr>
    <tr>
      <td><span class="cell-warn">WARN</span></td>
      <td>李四</td>
      <td>备用链路待确认</td>
    </tr>
    <tr>
      <td>防火墙</td>
      <td colspan="2"><span class="cell-bad">FAIL</span>（合并两列）</td>
      <td>规则冲突</td>
    </tr>
  </tbody>
</table>

提示：
- HTML 表格仍会套用你当前的表格样式（在 `docs/stylesheets/extra.css`）。
- 你也可以继续用 `<span class="cell-ok/cell-warn/cell-bad">` 做单元格状态色块。

## 2) 导出 PDF（下载）

在纯静态站点（GitHub Pages）里最稳定的做法是：

- 点击 **“下载 PDF”** → 触发浏览器打印 → 选择 **“另存为 PDF”**

优点：不依赖额外服务/重型 PDF 生成依赖，GitHub Pages 直接可用。

如果你希望构建时自动生成真正的 `.pdf` 文件并放到站点里，我也可以加（需要额外依赖/配置，建议后续再做）。

