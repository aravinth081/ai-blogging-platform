export const APP_NAME = "InkSphere";
export const APP_DESCRIPTION = "Where ideas take shape. The AI-powered blogging platform for modern teams.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const BRAND = {
  name: APP_NAME,
  tagline: "Where ideas take shape.",
  description: APP_DESCRIPTION,
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
] as const;

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Posts", href: "/dashboard/posts", icon: "FileText" },
  { label: "Categories", href: "/dashboard/categories", icon: "FolderOpen" },
  { label: "Comments", href: "/dashboard/comments", icon: "MessageSquare" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: "Users" },
  { label: "Newsletter", href: "/dashboard/newsletter", icon: "Mail" },
  { label: "SEO", href: "/dashboard/seo", icon: "Search" },
  { label: "AI Tools", href: "/dashboard/ai-tools", icon: "Sparkles" },
  { label: "Billing", href: "/dashboard/billing", icon: "CreditCard" },
  { label: "Integrations", href: "/dashboard/integrations", icon: "Puzzle" },
  { label: "Team", href: "/dashboard/team", icon: "UserPlus" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
  { label: "Audit Logs", href: "/dashboard/audit-logs", icon: "Shield" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
] as const;

export const PRICING_PLANS = [
  {
    name: "Starter",
    slug: "starter",
    description: "Perfect for individual bloggers getting started.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Up to 10 posts",
      "Basic analytics",
      "1 team member",
      "Community support",
      "Standard themes",
      "Basic SEO tools",
    ],
    limits: { posts: 10, members: 1, aiCredits: 50, storage: "500MB" },
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    slug: "pro",
    description: "For professional bloggers and small teams.",
    monthlyPrice: 19,
    yearlyPrice: 190,
    features: [
      "Unlimited posts",
      "Advanced analytics",
      "5 team members",
      "Priority support",
      "Custom domain",
      "AI writing tools",
      "Newsletter system",
      "SEO suite",
      "Custom themes",
      "API access",
    ],
    limits: { posts: -1, members: 5, aiCredits: 1000, storage: "10GB" },
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    description: "For organizations that need scale and security.",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO / SAML",
      "Audit logs",
      "SLA guarantee",
      "Dedicated support",
      "Custom integrations",
      "White-label",
      "Advanced security",
      "Priority AI access",
      "99.99% uptime",
      "SOC2 compliance",
    ],
    limits: { posts: -1, members: -1, aiCredits: -1, storage: "Unlimited" },
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Head of Content",
    company: "TechCorp",
    avatar: "/testimonials/sarah.jpg",
    content: "InkSphere transformed our content workflow. The AI tools alone saved us 20 hours a week. It's like having a senior editor on the team 24/7.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Founder",
    company: "DevBlog Pro",
    avatar: "/testimonials/marcus.jpg",
    content: "We migrated from WordPress and never looked back. The editor is buttery smooth, SEO is built-in, and the analytics are enterprise-grade.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "VP of Marketing",
    company: "ScaleUp Inc",
    avatar: "/testimonials/emily.jpg",
    content: "The multi-tenant architecture is exactly what we needed. Each brand gets its own workspace, and the team management is flawless.",
    rating: 5,
  },
  {
    name: "James Park",
    role: "Technical Writer",
    company: "CloudNative",
    avatar: "/testimonials/james.jpg",
    content: "Best code block support I've ever seen. Syntax highlighting, live previews, and the collaborative editing makes pair-writing a breeze.",
    rating: 5,
  },
] as const;

export const FEATURES = [
  {
    title: "AI-Powered Writing",
    description: "Generate, improve, and optimize content with state-of-the-art AI models including GPT-4, Claude, and Gemini.",
    icon: "Sparkles",
  },
  {
    title: "Notion-Style Editor",
    description: "A beautiful block-based editor with slash commands, drag & drop, embeds, and real-time collaboration.",
    icon: "PenTool",
  },
  {
    title: "Enterprise Analytics",
    description: "Track views, engagement, conversions, and revenue with real-time dashboards and cohort analysis.",
    icon: "BarChart3",
  },
  {
    title: "SEO Suite",
    description: "Automatic sitemaps, structured data, meta optimization, and AI-powered keyword suggestions.",
    icon: "Search",
  },
  {
    title: "Multi-Tenant SaaS",
    description: "Workspaces, RBAC, custom domains, team management, and complete tenant isolation.",
    icon: "Building2",
  },
  {
    title: "Newsletter System",
    description: "Built-in email campaigns, subscriber management, automation, and detailed delivery analytics.",
    icon: "Mail",
  },
  {
    title: "Monetization",
    description: "Premium content, subscriptions, memberships, and Stripe-powered billing out of the box.",
    icon: "CreditCard",
  },
  {
    title: "Blazing Performance",
    description: "Server components, edge rendering, CDN, image optimization, and sub-second page loads.",
    icon: "Zap",
  },
  {
    title: "Enterprise Security",
    description: "2FA, passkeys, audit logs, encryption, RBAC, and SOC2-ready infrastructure.",
    icon: "Shield",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How is InkSphere different from Medium or WordPress?",
    answer: "InkSphere is built from the ground up as a modern SaaS platform. Unlike Medium, you own your content and audience. Unlike WordPress, there's no plugin hell — everything from AI, SEO, analytics, and billing is built-in and works seamlessly.",
  },
  {
    question: "Can I use my own custom domain?",
    answer: "Absolutely. Pro and Enterprise plans include custom domain support. Simply add a CNAME record and we handle SSL certificates automatically.",
  },
  {
    question: "What AI models are supported?",
    answer: "We integrate with OpenAI (GPT-4), Anthropic (Claude), and Google (Gemini). You can choose your preferred model for each AI feature, and we handle the API management.",
  },
  {
    question: "Is there a free plan?",
    answer: "Yes! Our Starter plan is free forever with up to 10 posts, basic analytics, and 50 AI credits per month. No credit card required.",
  },
  {
    question: "How does multi-tenancy work?",
    answer: "Each organization gets isolated workspaces with their own content, team members, settings, and custom domains. Data is completely isolated between tenants with enterprise-grade security.",
  },
  {
    question: "Can I migrate from another platform?",
    answer: "Yes. We support one-click imports from WordPress, Medium, Ghost, Hashnode, and Dev.to. Your content, images, and metadata are preserved during migration.",
  },
  {
    question: "What about SEO?",
    answer: "InkSphere includes automatic sitemaps, robots.txt, structured data, Open Graph tags, Twitter Cards, and AI-powered SEO scoring. Your content is optimized for search engines by default.",
  },
  {
    question: "Do you offer an API?",
    answer: "Yes. Pro plans and above include full REST and GraphQL API access with API keys, rate limiting, and comprehensive documentation. Build custom integrations or headless setups.",
  },
] as const;

export const STATS = [
  { label: "Active Blogs", value: "50K+", description: "trusted by creators worldwide" },
  { label: "Posts Published", value: "2M+", description: "articles crafted with InkSphere" },
  { label: "Monthly Readers", value: "100M+", description: "engaged readers every month" },
  { label: "Uptime", value: "99.99%", description: "enterprise-grade reliability" },
] as const;
