# AI Chat - 智能对话平台

## 项目简介
这是一个面向女性用户的 AI 对话平台，以温暖贴心的方式提供智能对话服务。项目采用了简约优雅的设计风格，注重情感交互和用户体验。

## 技术栈
- Next.js 15.0
- TypeScript
- Tailwind CSS
- DeepSeek API

## 主要功能
1. 智能对话界面
   - 实时对话功能
   - 上下文理解
   - 情感化回复
   - 个性化头像显示

2. 用户界面特性
   - 响应式设计
   - 深色/浅色主题切换
   - 优雅的动画效果
   - 温暖的色彩系统

## 本地开发

1. 克隆项目
```
git clone git@github.com:sjtugjl/chatgirl.git
cd chatgirl
```

2. 安装依赖
```
npm install
```

3. 配置环境变量
创建 `.env.local` 文件并添加：
```
DEEPSEEK_API_KEY=your_api_key
```

4. 启动开发服务器
```
npm run dev
```

访问 http://localhost:3000 查看应用

## 设计理念
- 以女性用户为中心的交互设计
- 温暖柔和的视觉风格
- 注重情感价值和用户体验
- 简约而不简单的界面设计

## 项目结构
```
chatgirl/
├── app/                # Next.js 应用主目录
│   ├── api/           # API 路由
│   ├── chat/         # 聊天页面
│   └── page.tsx      # 首页
├── components/        # React 组件
│   ├── Chat.tsx     # 聊天组件
│   └── Navbar.tsx   # 导航栏组件
├── utils/             # 工具函数
│   └── api.ts       # API 调用函数
└── types/             # TypeScript 类型定义
```

## 功能特点
- 智能对话：基于 DeepSeek API 的智能对话系统
- 情感化交互：温暖贴心的对话风格
- 实时响应：流畅的对话体验
- 响应式设计：完美适配各种设备
- 深色模式：护眼的深色主题支持

## 后续规划
1. 用户系统
   - 用户注册和登录
   - 对话历史保存
   - 个性化设置

2. 功能增强
   - 语音输入支持
   - 图片识别功能
   - 更多个性化选项

3. 体验优化
   - 更丰富的动画效果
   - 更多主题配色
   - 性能优化

## 贡献
欢迎提交 Issue 和 Pull Request

## 许可证
MIT License