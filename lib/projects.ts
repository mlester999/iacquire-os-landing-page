export type ProjectCategory = "AI Automation" | "AI Agents" | "SaaS" | "Shopify" | "Workflow";

export interface PortfolioProject {
  name: string;
  category: ProjectCategory;
  summary: string;
  tags: string[];
  details: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "HomeVeal Bathroom Remodeling",
    category: "AI Automation",
    summary: "AI lead-to-appointment system connecting capture, qualification, service-area validation, CRM records, and appointments.",
    tags: ["GoHighLevel", "n8n", "Vapi", "AI Voice", "AI Chatbot"],
    details: ["Captures incoming remodeling opportunities", "Collects and qualifies customer details", "Validates service areas", "Creates and updates CRM records", "Moves qualified opportunities toward booked appointments"],
  },
  {
    name: "AIvanza Academy",
    category: "SaaS",
    summary: "Learning platform and admin portal for payments, students, courses, lessons, and tier access.",
    tags: ["Supabase", "Auth", "Admin", "Payments"],
    details: ["Learning platform experience", "Authentication", "Course and lesson management", "Student administration", "Payment and access management"],
  },
  {
    name: "Tony AI",
    category: "AI Agents",
    summary: "Trainable AI conversation platform with chat, voice, teaching mode, memory, and personality controls.",
    tags: ["AI Agents", "Voice AI", "Memory", "RAG"],
    details: ["Chat and voice interaction", "Teaching and correction mode", "Long-term memory", "Character and personality configuration", "Reusable AI brain architecture"],
  },
  {
    name: "Aiyomi",
    category: "SaaS",
    summary: "AI daily growth companion for priorities, routines, focus, reflection, and progress.",
    tags: ["Supabase", "Mobile", "AI Product"],
    details: ["Mobile-first onboarding", "Daily planning", "Focus tracking", "Reflection and progress", "Admin-controlled AI foundation"],
  },
  {
    name: "Scout FX",
    category: "SaaS",
    summary: "AI market intelligence and trading research focused on structure, confluence, news, and signal freshness.",
    tags: ["AI Product", "Supabase", "Workers"],
    details: ["Market-structure research", "Confluence analysis", "News context", "Signal freshness", "Explainable research cards"],
  },
  {
    name: "Hanaply",
    category: "SaaS",
    summary: "AI job intelligence that explains opportunity fit against a user profile.",
    tags: ["Supabase", "Job Ingestion", "AI Product"],
    details: ["Job ingestion", "Profile matching", "Opportunity explanations", "Career-focused filtering"],
  },
  {
    name: "AI Series Masterclass",
    category: "SaaS",
    summary: "Learning management system for selling and delivering AI content creation courses.",
    tags: ["LMS", "Payments", "Dashboard"],
    details: ["Enrollment", "Course browsing", "Lessons and progress", "Student dashboard", "Community access"],
  },
  {
    name: "VTL Sleep Spray",
    category: "Shopify",
    summary: "Custom Shopify storefront with product presentation, bundles, trust details, and purchase paths.",
    tags: ["Shopify", "Liquid", "CRO"],
    details: ["Custom Liquid", "Bundle selector", "Sticky promotion", "Ingredient information", "Reviews and comparison"],
  },
  {
    name: "Avouria",
    category: "Shopify",
    summary: "Shopify membership, size quiz, and experimentation workflow for a VIP customer experience.",
    tags: ["Shopify", "Membership", "A/B Testing"],
    details: ["VIP membership", "Size quiz", "Checkout automation", "A/B testing concepts"],
  },
  {
    name: "Zorivelle Realty Chatbot",
    category: "AI Agents",
    summary: "Document-grounded real estate Q&A using indexed documents and a webhook-triggered AI agent.",
    tags: ["n8n", "Supabase", "RAG"],
    details: ["Document indexing", "Vector retrieval", "Webhook agent", "Grounded answers"],
  },
  {
    name: "AI Email Agent",
    category: "AI Automation",
    summary: "Inbound email classification and knowledge-grounded replies with human review for low-confidence cases.",
    tags: ["Zapier", "AI", "Knowledge Base"],
    details: ["Email classification", "Confidence routing", "Knowledge lookup", "Human escalation"],
  },
  {
    name: "4BR Guest Follow-Up",
    category: "Workflow",
    summary: "QR check-in and conditional follow-up sequences that stop when a guest replies.",
    tags: ["GoHighLevel", "Workflows", "QR"],
    details: ["QR check-in", "Conditional routing", "Follow-up sequences", "Reply-based stopping"],
  },
  {
    name: "AI LinkedIn Content Publishing",
    category: "AI Automation",
    summary: "AI content generation with Slack approval, Google Sheets tracking, and LinkedIn publishing.",
    tags: ["n8n", "Slack", "Sheets", "LinkedIn"],
    details: ["AI content creation", "Approval workflow", "Tracking", "Automated publishing"],
  },
  {
    name: "Mitchy Dental Lounge",
    category: "AI Agents",
    summary: "AI voice receptionist for appointment scheduling, availability, and confirmations connected to Google Calendar.",
    tags: ["n8n", "Voice AI", "Google Calendar"],
    details: ["Appointment scheduling", "Availability checks", "Confirmations", "Calendar integration"],
  },
];
