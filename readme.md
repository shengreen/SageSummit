# 🏛️ SageSummit - 历史人物会议室

让 AI 扮演古代智者，讨论现代大事。

[English](./README_EN.md) | [中文](./README.md)

---

## ✨ 演示地址

🔗 **Live Demo**: https://shengreen.github.io/SageSummit/#/

> 🌍 全球气候变暖？让 AI 问问孔子、老子和秦始皇怎么看

---

## 🌟 核心亮点

- **🤖 AI 多智能体** - 大语言模型 (LLM) 扮演历史人物，基于人物性格和知识发表观点
- **📚 典籍智慧** - AI 引用论语、道德经、史记，用古人智慧评论现代事件
- **💬 沉浸式对话** - 多轮讨论，模拟真实会议室的唇枪舌战
- **🌐 中英双语** - 支持中文/英文界面

---

## 👥 历史人物

| 人物 | 时代 | AI 风格 |
|------|------|---------|
| 孔子 | 春秋 | 儒家仁义，引经据典 |
| 秦始皇 | 战国 | 霸王之气，法家思想 |
| 老子 | 春秋 | 道法自然，无为而治 |
| 亚历山大 | 古希腊 | 征服四方，荣耀之战 |
| 拿破仑 | 近代 | 战略天才，欧洲霸权 |
| 凯撒 | 古罗马 | 罗马雄风，权谋智慧 |
| ... | ... | ... |

---

## 🛠️ 技术栈

- **前端**: Vue 3 + Vite
- **后端**: Flask (Python)
- **AI**: 大语言模型 (MiniMax M2)

---

## 🚀 本地运行

```bash
# 克隆项目
git clone https://github.com/shengreen/SageSummit.git
cd SageSummit

# 启动后端 (需要 MiniMax API Key)
cd backend
pip install -r requirements.txt
python -m flask --app app.main:create_app run

# 启动前端 (新终端)
cd frontend
npm install
npm run dev
```

---

## 💡 场景示例

> **议题**: 全球气候变暖

- **孔子**: "君子和而不同...当以仁义为本，兼顾各方利益..."
- **老子**: "道法自然...此事当顺其自然，不可强求..."
- **秦始皇**: "统一六国之势已成...当以法治统一度量衡..."

---

*让 AI 复活历史人物，用古人智慧洞察现代问题*
