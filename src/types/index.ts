export type UserRole = "super_admin" | "owner" | "editor" | "author" | "moderator" | "subscriber";

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  bio: string | null;
  role?: UserRole;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  customDomain: string | null;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: unknown;
  contentHtml: string | null;
  coverImage: string | null;
  readingTime: number | null;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  visibility: "PUBLIC" | "PRIVATE" | "MEMBERS_ONLY" | "PREMIUM";
  isPinned: boolean;
  isFeatured: boolean;
  publishedAt: string | null;
  scheduledAt: string | null;
  metaTitle: string | null;
  metaDesc: string | null;
  seoScore: number | null;
  authorId: string;
  author?: User;
  category?: Category;
  tags?: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  postCount?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  usageCount: number;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author?: User;
  parentId: string | null;
  isPinned: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SPAM";
  replies?: Comment[];
  reactions?: Reaction[];
  createdAt: string;
}

export interface Reaction {
  id: string;
  emoji: string;
  userId: string;
  count?: number;
}

export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  status: "ACTIVE" | "UNSUBSCRIBED" | "BOUNCED" | "COMPLAINED";
  source: string | null;
  subscribedAt: string;
}

export interface AnalyticsSummary {
  views: number;
  uniqueVisitors: number;
  avgReadTime: number;
  bounceRate: number;
  subscribers: number;
  revenue: number;
  growth: number;
}

export interface BillingPlan {
  name: string;
  slug: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limits: Record<string, number | string>;
  cta: string;
  highlighted: boolean;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  resource: string;
  resourceId: string | null;
  details: unknown;
  userId: string | null;
  user?: User;
  ipAddress: string | null;
  createdAt: string;
}
