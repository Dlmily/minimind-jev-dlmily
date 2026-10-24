# MiniMind Jev 排序参考指数

简易中文网页，部署在 GitHub Pages。

- Pages URL：`https://dlmily.github.io/minimind-jev-dlmily/`
- 页面静态托管在此 GitHub 仓库。
- 评分由外部 MiniMind Jev 模型 API 完成；GitHub Pages 本身不运行模型后端。
- 页面将原始模型输出 `p` 单调映射为 `100 × 9p / (1 + 8p)`。指数 50 对应公开基准中 10% 的正例率参考点。
- 该指数不是概率。对于同一查询，数值越高表示模型越倾向于将该段落排在前面；公式只改变展示尺度，不提升模型本身的判别能力。

注意：当前模型 API 运行在 Manus Sandbox 中；如果该沙盒休眠或停止，页面仍能打开，但评分功能暂时不可用。
