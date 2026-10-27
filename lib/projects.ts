export type ProjectCategory = "AI Automation" | "AI Agents" | "SaaS" | "Shopify" | "Workflow";

export interface PortfolioProject {
  id: number;
  name: string;
  category: ProjectCategory;
  sourceCategories: string[];
  summary: string;
  description: string;
  tags: string[];
  result: string;
  status: string;
  caseStudyUrl: string;
}

// Project summaries, results, statuses, and case-study URLs come from the linked portfolio.
export const portfolioProjects: PortfolioProject[] = [
  {
    "id": 32,
    "name": "HomeVeal Bathroom Remodeling: AI Lead-to-Appointment System",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "AI Agents"
    ],
    "summary": "A connected growth and booking system that helps a remodeling company capture leads, collect complete customer information, qualify service requests, validate service areas, manage contacts in GoHighLevel, and guide eligible leads toward appointments.",
    "description": "Built an integrated lead and appointment system for a remodeling company. The system combines a conversion-focused landing page, GoHighLevel CRM and pipeline management, n8n workflow orchestration, Vapi voice AI, AI-assisted qualification, service-area validation, appointment scheduling, reminders, and follow-up automation.",
    "tags": [
      "GoHighLevel",
      "n8n",
      "Vapi",
      "AI Voice",
      "AI Chatbot"
    ],
    "result": "End-to-end lead intake, qualification, CRM, booking, and follow-up system",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/homeveal-bathroom-remodeling-ai-lead-to-appointment-system"
  },
  {
    "id": 33,
    "name": "AIvanza Academy: AI Learning Platform and Admin Portal",
    "category": "SaaS",
    "sourceCategories": [
      "SaaS",
      "Full-Stack",
      "Admin Portal",
      "Education Platform"
    ],
    "summary": "A premium learning platform for practical AI, automation, websites, and business systems, supported by a secure admin portal for payments, students, courses, lessons, and tier-based access.",
    "description": "Built an AI education platform that presents practical AI and automation training while giving administrators control over manual payments, student access, courses, modules, lessons, pricing tiers, and enrollment workflows.",
    "tags": [
      "Supabase",
      "Authentication",
      "Database",
      "Admin Dashboard",
      "Payment Management",
      "Course Management"
    ],
    "result": "A structured academy platform with a public landing page and centralized administration system",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/aivanza-academy-ai-learning-platform-admin-portal"
  },
  {
    "id": 34,
    "name": "Tony AI: Trainable AI Negotiation and Conversation Platform",
    "category": "AI Agents",
    "sourceCategories": [
      "AI Agents",
      "Voice AI",
      "AI Training",
      "Conversational AI",
      "Full-Stack"
    ],
    "summary": "A conversational AI platform with chat, voice, teaching mode, corrections, long-term memory, and a consistent character personality for realistic negotiation and business conversations.",
    "description": "Built a character-based AI system that supports chat and voice conversations, remembers important context, stores user corrections, retrieves relevant knowledge, and responds in character during realistic negotiation scenarios.",
    "tags": [
      "AI Agents",
      "Chat AI",
      "Voice AI",
      "Memory",
      "Knowledge Retrieval",
      "Supabase"
    ],
    "result": "A reusable trainable AI brain that improves through stored corrections, memories, and business knowledge.",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/tony-ai-trainable-negotiation-conversation-platform"
  },
  {
    "id": 35,
    "name": "Aiyomi: AI Daily Growth Companion",
    "category": "SaaS",
    "sourceCategories": [
      "SaaS",
      "AI Product",
      "Mobile App",
      "Product Design",
      "Supabase",
      "Admin Portal"
    ],
    "summary": "A personalized AI companion that helps users organize their days, choose meaningful priorities, build routines, focus with intention, and understand their progress.",
    "description": "Designed and built the foundation for an AI daily growth companion that helps users plan tasks, choose better times for activities, focus, reflect, track progress, and build sustainable routines with personalized AI guidance.",
    "tags": [
      "SaaS",
      "AI Product",
      "Supabase",
      "Mobile App",
      "Admin Portal"
    ],
    "result": "A mobile-first AI companion product with personalized onboarding, daily planning, focus tracking, reflection, and an admin-controlled AI foundation.",
    "status": "In development",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/aiyomi-ai-daily-growth-companion"
  },
  {
    "id": 1,
    "name": "Hoop Shorts: AI Video Clipping and Shorts Automation",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "n8n"
    ],
    "summary": "Built an AI-powered automated content system that generates optimized titles and descriptions, discovers long-form NBA videos with no existing Shorts, intelligently identifies and extracts high-impact moments, transforms them into engaging short-form videos, and automatically publishes across YouTube Shorts, Facebook Reels, and Instagram Reels.",
    "description": "Built an AI-powered automated content system that generates optimized titles and descriptions, discovers long-form NBA videos with no existing Shorts, intelligently identifies and extracts high-impact moments, transforms them into engaging short-form videos, and automatically publishes across YouTube Shorts, Facebook Reels, and Instagram Reels.",
    "tags": [
      "n8n",
      "OpenAI",
      "Klap AI",
      "Meta",
      "YouTube"
    ],
    "result": "Fully automated clip discovery, editing, and multi-platform publishing",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/hoop-shorts-ai-powered-nba-video-clipping-shorts-automation"
  },
  {
    "id": 2,
    "name": "Motivation Timepiece: AI Quote Image Generation Workflow",
    "category": "Workflow",
    "sourceCategories": [
      "Workflow",
      "n8n"
    ],
    "summary": "AI-powered automated workflow that creates and publishes motivational content to Facebook without manual effort. Uses AI to generate quotes, produce matching speaker visuals, add text overlays, and auto-upload to a Facebook page.",
    "description": "AI-powered automated workflow that creates and publishes motivational content to Facebook without manual effort. Uses AI to generate quotes, produce matching speaker visuals, add text overlays, and auto-upload to a Facebook page.",
    "tags": [
      "Midjourney",
      "Airtable",
      "n8n",
      "Facebook",
      "Meta"
    ],
    "result": "Scheduled generation and publishing with no manual content steps",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/motivation-timepiece-ai-automation-for-motivational-quote-image-generation"
  },
  {
    "id": 3,
    "name": "Automated Accounting Workflow: Xero to Google Sheets and Asana",
    "category": "Workflow",
    "sourceCategories": [
      "Workflow",
      "Make.com"
    ],
    "summary": "Automated accounting workflow using Make.com that extracts transactions from Xero, processes through an iterator, and routes to Google Sheets and Asana, eliminating manual data entry.",
    "description": "Automated accounting workflow using Make.com that extracts transactions from Xero, processes through an iterator, and routes to Google Sheets and Asana, eliminating manual data entry.",
    "tags": [
      "Make",
      "Xero",
      "Google Sheets",
      "Asana"
    ],
    "result": "Automated transaction routing replaces the daily export-and-paste routine",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/automated-accounting-workflow-xero-to-google-sheets-asana"
  },
  {
    "id": 4,
    "name": "Scarlet Eve AI: Conversational Anime Image Assistant",
    "category": "AI Agents",
    "sourceCategories": [
      "AI Agents",
      "n8n"
    ],
    "summary": "A Christmas-themed anime AI agent on Telegram for natural conversational AI image creation, full customization of expressions, poses, outfits, and companions.",
    "description": "A Christmas-themed anime AI agent on Telegram for natural conversational AI image creation, full customization of expressions, poses, outfits, and companions.",
    "tags": [
      "n8n",
      "Telegram",
      "Midjourney",
      "X",
      "OpenAI"
    ],
    "result": "Instant image variations, consistent anime-style results",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/scarlet-eve-ai-christmas-anime-companion"
  },
  {
    "id": 5,
    "name": "AI Expense Tracking and Budgeting Workflow",
    "category": "Workflow",
    "sourceCategories": [
      "Workflow",
      "n8n"
    ],
    "summary": "Automated expense tracking from Telegram into Notion in real time. Eliminates manual logging, reduces tracking errors, and provides a centralized live finance view.",
    "description": "Automated expense tracking from Telegram into Notion in real time. Eliminates manual logging, reduces tracking errors, and provides a centralized live finance view.",
    "tags": [
      "Notion",
      "n8n",
      "Telegram",
      "Gmail",
      "OpenAI"
    ],
    "result": "Zero missed entries, real-time expense tracking",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/ai-expense-tracking-budgeting-workflow"
  },
  {
    "id": 6,
    "name": "Cavinti Suite: AI Support Agent Chatbot",
    "category": "AI Agents",
    "sourceCategories": [
      "AI Agents",
      "Integration",
      "n8n"
    ],
    "summary": "Intelligent automated chatbot for an Airbnb property handling guest inquiries, booking questions, scheduling, property info, and check-in/check-out assistance, 24/7.",
    "description": "Intelligent automated chatbot for an Airbnb property handling guest inquiries, booking questions, scheduling, property info, and check-in/check-out assistance, 24/7.",
    "tags": [
      "Meta",
      "n8n",
      "Google",
      "Stripe"
    ],
    "result": "24/7 automated guest support and booking assistance",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/cavinti-suite-ai-support-agent-chatbot"
  },
  {
    "id": 7,
    "name": "Zapp Tech: AI Tech Content Repurposing System",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "n8n"
    ],
    "summary": "AI-powered system that transforms long-form tech videos into engaging, social-ready shorts. Auto-formats clips for YouTube Shorts, Facebook, and Instagram.",
    "description": "AI-powered system that transforms long-form tech videos into engaging, social-ready shorts. Auto-formats clips for YouTube Shorts, Facebook, and Instagram.",
    "tags": [
      "OpenAI",
      "Klap AI",
      "n8n",
      "OneDrive",
      "Meta",
      "YouTube"
    ],
    "result": "AI-selected viral moments, multi-platform auto posting",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/zapp-tech-ai-automation-for-tech-content-repurposing"
  },
  {
    "id": 8,
    "name": "Mitchy Dental Lounge: AI Voice Receptionist",
    "category": "AI Agents",
    "sourceCategories": [
      "AI Agents",
      "n8n"
    ],
    "summary": "AI-powered voice receptionist that handles appointment scheduling, slot availability checks, booking confirmations, and updates through natural voice, integrated with Google Calendar.",
    "description": "AI-powered voice receptionist that handles appointment scheduling, slot availability checks, booking confirmations, and updates through natural voice, integrated with Google Calendar.",
    "tags": [
      "n8n",
      "ElevenLabs",
      "Google Calendar",
      "OpenAI",
      "Airtable"
    ],
    "result": "24/7 automated scheduling, zero missed bookings",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/mitchy-dental-lounge-ai-voice-receptionist"
  },
  {
    "id": 9,
    "name": "Marko Bar Deal Automation: Sales Pipeline with PandaDoc and Slack",
    "category": "Workflow",
    "sourceCategories": [
      "Workflow",
      "Zapier"
    ],
    "summary": "Zapier deal workflow triggered by Airtable 'Closed Won' status, auto-generates PandaDoc contracts, notifies Slack, formats dates, and creates onboarding tasks.",
    "description": "Zapier deal workflow triggered by Airtable 'Closed Won' status, auto-generates PandaDoc contracts, notifies Slack, formats dates, and creates onboarding tasks.",
    "tags": [
      "Zapier",
      "Airtable",
      "PandaDoc",
      "Slack"
    ],
    "result": "Instant contract generation, real-time team notifications",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/marko-bar-deal-automation-sales-pipeline-with-pandadoc-slack"
  },
  {
    "id": 10,
    "name": "AI Content Repurposing: Multi-Platform Social Media Automation",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "Zapier"
    ],
    "summary": "Zapier automation that monitors Google Drive for new videos, extracts content with AI, and distributes to Facebook Pages and LinkedIn via conditional paths.",
    "description": "Zapier automation that monitors Google Drive for new videos, extracts content with AI, and distributes to Facebook Pages and LinkedIn via conditional paths.",
    "tags": [
      "Zapier",
      "Google Drive",
      "Facebook",
      "LinkedIn",
      "OpenAI"
    ],
    "result": "Zero-touch content distribution, multi-platform publishing",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/ai-content-repurposing-multi-platform-social-media"
  },
  {
    "id": 11,
    "name": "AI Email Agent: Classification, Knowledge Reply, and Human Review",
    "category": "AI Agents",
    "sourceCategories": [
      "AI Agents",
      "Zapier"
    ],
    "summary": "Zapier email agent that classifies inbound emails by AI confidence, auto-replies via knowledge-base lookup, and flags low-confidence cases to Slack.",
    "description": "Zapier email agent that classifies inbound emails by AI confidence, auto-replies via knowledge-base lookup, and flags low-confidence cases to Slack.",
    "tags": [
      "Zapier",
      "OpenAI",
      "Google Sheets",
      "Gmail",
      "Slack"
    ],
    "result": "Automated replies for high-confidence queries, instant Slack alerts for edge cases",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/ai-email-agent-classification-kb-reply-human-in-the-loop"
  },
  {
    "id": 12,
    "name": "Zorivelle Realty Chatbot: RAG-Powered Document Q&A",
    "category": "AI Agents",
    "sourceCategories": [
      "AI Agents",
      "n8n"
    ],
    "summary": "RAG-based chatbot that indexes real estate documents into a Supabase vector store and serves AI answers via webhook-triggered agent.",
    "description": "RAG-based chatbot that indexes real estate documents into a Supabase vector store and serves AI answers via webhook-triggered agent.",
    "tags": [
      "n8n",
      "Supabase",
      "Google Gemini",
      "Google Drive",
      "OpenAI"
    ],
    "result": "Instant document-grounded answers, zero manual searching",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/zorivelle-realty-chatbot-rag-powered-document-q-a"
  },
  {
    "id": 13,
    "name": "Zorivelle Realty: React Interface with GoHighLevel Forms and Calendars",
    "category": "Workflow",
    "sourceCategories": [
      "Integration",
      "GoHighLevel"
    ],
    "summary": "Modern real estate funnel built with React, integrated with GoHighLevel forms and calendars for lead capture, AI chat, and tour scheduling.",
    "description": "Modern real estate funnel built with React, integrated with GoHighLevel forms and calendars for lead capture, AI chat, and tour scheduling.",
    "tags": [
      "React",
      "GoHighLevel",
      "Google Calendar"
    ],
    "result": "Streamlined lead capture, automated tour scheduling",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/zorivelle-realty-react-ui-ghl-forms-calendars"
  },
  {
    "id": 14,
    "name": "VERDÉ: Sales Funnel and Automation",
    "category": "Workflow",
    "sourceCategories": [
      "GoHighLevel"
    ],
    "summary": "High-converting GHL sales funnel for VERDÉ Sparkling Pistachio with urgency copy, embedded video, social proof, and automated nurture sequences.",
    "description": "High-converting GHL sales funnel for VERDÉ Sparkling Pistachio with urgency copy, embedded video, social proof, and automated nurture sequences.",
    "tags": [
      "GoHighLevel"
    ],
    "result": "Automated funnel, checkout, and nurture sequence in one system",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/verde-sales-funnel-automation"
  },
  {
    "id": 15,
    "name": "BrightSmile Dental: Appointment Booking Funnel",
    "category": "Workflow",
    "sourceCategories": [
      "GoHighLevel"
    ],
    "summary": "Professional appointment booking funnel for BrightSmile Dental Clinic on GHL with urgency headlines, free-consult CTA, and automated reminder workflows.",
    "description": "Professional appointment booking funnel for BrightSmile Dental Clinic on GHL with urgency headlines, free-consult CTA, and automated reminder workflows.",
    "tags": [
      "GoHighLevel"
    ],
    "result": "Automated booking, confirmation, and reminder workflow",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/brightsmile-dental-appointment-booking-funnel"
  },
  {
    "id": 16,
    "name": "Apex Rejuvenation: Telehealth Funnel and Appointment Automation",
    "category": "Workflow",
    "sourceCategories": [
      "GoHighLevel"
    ],
    "summary": "Concierge telehealth funnel and booking system on GHL with consultation confirmation, no-show re-engagement, and a streamlined calendar.",
    "description": "Concierge telehealth funnel and booking system on GHL with consultation confirmation, no-show re-engagement, and a streamlined calendar.",
    "tags": [
      "GoHighLevel"
    ],
    "result": "Automated booking, confirmation & no-show follow-up sequences",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/apex-rejuvenation-telehealth-funnel-appointment-automation"
  },
  {
    "id": 17,
    "name": "AI Property Visualization: Listing and Image Generation Workflow",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "n8n",
      "Workflow"
    ],
    "summary": "n8n workflow from Typeform intake to AI-generated MLS-style images via DALL-E plus a high-converting listing copy delivered through Gmail.",
    "description": "n8n workflow from Typeform intake to AI-generated MLS-style images via DALL-E plus a high-converting listing copy delivered through Gmail.",
    "tags": [
      "n8n"
    ],
    "result": "Fully automated listing generation, AI MLS-style images, zero manual effort",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/ai-property-visualization-listing-image-generation-workflow"
  },
  {
    "id": 18,
    "name": "Money Reset: Lead Magnet and Sales Funnel",
    "category": "Workflow",
    "sourceCategories": [
      "GoHighLevel"
    ],
    "summary": "High-converting GHL lead magnet and sales funnel for the Money Reset ebook, landing page, social proof, courses, and automated capture.",
    "description": "High-converting GHL lead magnet and sales funnel for the Money Reset ebook, landing page, social proof, courses, and automated capture.",
    "tags": [
      "GoHighLevel"
    ],
    "result": "Complete lead-magnet and sales funnel with optimized capture",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/money-reset-lead-magnet-sales-funnel"
  },
  {
    "id": 19,
    "name": "BOF Growth Guide: Bottom-of-Funnel Content Automation",
    "category": "Workflow",
    "sourceCategories": [
      "Workflow",
      "Make.com"
    ],
    "summary": "Complex Make.com scenario for Vigilant Safety processing BOF content through routers and iterators, distributing across ClickUp and Google Sheets.",
    "description": "Complex Make.com scenario for Vigilant Safety processing BOF content through routers and iterators, distributing across ClickUp and Google Sheets.",
    "tags": [
      "Make",
      "ClickUp",
      "Google Sheets"
    ],
    "result": "Fully automated multi-branch content distribution",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/bof-growth-guide-bottom-of-funnel-content-automation"
  },
  {
    "id": 20,
    "name": "Vigilant Safety Growth Guide: Automated Task and Data Workflow",
    "category": "Workflow",
    "sourceCategories": [
      "Workflow",
      "Make.com"
    ],
    "summary": "Make.com workflow that pulls Sheets data, syncs ClickUp users, and auto-creates tasks across multiple workspaces, eliminating manual assignment.",
    "description": "Make.com workflow that pulls Sheets data, syncs ClickUp users, and auto-creates tasks across multiple workspaces, eliminating manual assignment.",
    "tags": [
      "Make",
      "Google Sheets",
      "ClickUp"
    ],
    "result": "Automated task routing and creation, real-time team sync",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/vigilant-safety-growth-guide-automated-task-data-workflow"
  },
  {
    "id": 21,
    "name": "Mitchay Hauls: UGC Lead Generation Funnel and Review Nurture",
    "category": "Workflow",
    "sourceCategories": [
      "Workflow",
      "GoHighLevel"
    ],
    "summary": "GHL funnel for a viral TikTok-driven e-commerce brand, captures leads through trending product showcases and nurtures with review-driven email/SMS.",
    "description": "GHL funnel for a viral TikTok-driven e-commerce brand, captures leads through trending product showcases and nurtures with review-driven email/SMS.",
    "tags": [
      "GoHighLevel",
      "TikTok",
      "Shopify"
    ],
    "result": "Streamlined lead capture, automated nurture sequence",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/mitchay-hauls-ugc-lead-gen-funnel-review-driven-nurture"
  },
  {
    "id": 22,
    "name": "AI LinkedIn Content Publishing: Slack Approval and Automated Posting",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "n8n"
    ],
    "summary": "n8n automation that turns AI-generated content into reviewed LinkedIn posts via Slack approval buttons, tracked in Google Sheets, and auto-published with multi-image carousels.",
    "description": "n8n automation that turns AI-generated content into reviewed LinkedIn posts via Slack approval buttons, tracked in Google Sheets, and auto-published with multi-image carousels.",
    "tags": [
      "n8n",
      "Slack",
      "Google Sheets",
      "LinkedIn",
      "OpenAI"
    ],
    "result": "Zero-touch publishing after approval, full audit trail",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/ai-linkedin-content-publishing-approval-posting-via-slack"
  },
  {
    "id": 23,
    "name": "OnlineJobs PH Scraper: Job Discovery and AI Cover Letter Generator",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "n8n"
    ],
    "summary": "n8n workflow that scrapes OnlineJobs.ph, filters opportunities, and generates 3 tailored cover letter variations per post, delivered to Slack instantly.",
    "description": "n8n workflow that scrapes OnlineJobs.ph, filters opportunities, and generates 3 tailored cover letter variations per post, delivered to Slack instantly.",
    "tags": [
      "n8n",
      "Slack",
      "Google Gemini",
      "Google Sheets",
      "Google Drive"
    ],
    "result": "Automated discovery with three tailored cover letter drafts per listing",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/onlinejobs-ph-scraper-job-discovery-ai-cover-letter-generator"
  },
  {
    "id": 24,
    "name": "YouTube Hook Research: AI Video Analysis and Hook Generation",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "n8n"
    ],
    "summary": "n8n workflow that ingests YouTube URLs via Typeform, enriches metrics, and uses Gemini to analyze hooks and generate three ad hook variations into Sheets.",
    "description": "n8n workflow that ingests YouTube URLs via Typeform, enriches metrics, and uses Gemini to analyze hooks and generate three ad hook variations into Sheets.",
    "tags": [
      "n8n",
      "Google Gemini",
      "Typeform",
      "Google Sheets",
      "Gmail"
    ],
    "result": "Automated hook research, AI ad variations, zero manual entry",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/youtube-hook-research-ai-viral-video-analysis-hook-generation"
  },
  {
    "id": 25,
    "name": "NBA Betting Odds Workflow: AI Injury and Odds Analysis",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Automation",
      "n8n"
    ],
    "summary": "n8n workflow that fetches injury reports and odds, then feeds Gemini for AI-powered analysis with picks and unit recommendations to Slack. (Educational only.)",
    "description": "n8n workflow that fetches injury reports and odds, then feeds Gemini for AI-powered analysis with picks and unit recommendations to Slack. (Educational only.)",
    "tags": [
      "n8n",
      "Google Gemini",
      "Slack"
    ],
    "result": "Automated injury-aware analysis, instant Slack alerts",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/nba-betting-odds-workflow-ai-injury-odds-analysis-via-slack"
  },
  {
    "id": 26,
    "name": "Slack AI Image Analyzer: Image Analysis and Generation",
    "category": "AI Automation",
    "sourceCategories": [
      "AI Agents",
      "AI Automation",
      "n8n"
    ],
    "summary": "n8n automation that brings AI image analysis (/analyze with Gemini) and image generation (/imagine with Nano Banana 2) directly into a dedicated Slack channel.",
    "description": "n8n automation that brings AI image analysis (/analyze with Gemini) and image generation (/imagine with Nano Banana 2) directly into a dedicated Slack channel.",
    "tags": [
      "n8n",
      "Google Gemini",
      "Nano Banana 2",
      "Slack"
    ],
    "result": "Instant AI image analysis & generation, zero context-switching",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/slack-ai-image-analyzer-image-analysis-generation-via-slack"
  },
  {
    "id": 27,
    "name": "4BR Guest Follow-Up: QR Check-In and Conditional Sequences",
    "category": "Workflow",
    "sourceCategories": [
      "Workflow",
      "GoHighLevel"
    ],
    "summary": "Complete GHL system: QR check-in tags attendance, then a router workflow drives the right follow-up sequence, preventing dual entry and stopping on reply.",
    "description": "Complete GHL system: QR check-in tags attendance, then a router workflow drives the right follow-up sequence, preventing dual entry and stopping on reply.",
    "tags": [
      "GoHighLevel"
    ],
    "result": "Fully automated follow-up, zero missed guests, tag-based tracking",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/4br-guest-follow-up-qr-check-in-conditional-sequences"
  },
  {
    "id": 28,
    "name": "Money Reset AI Voice Agent: Retell-Powered Appointment Automation",
    "category": "AI Agents",
    "sourceCategories": [
      "AI Agents",
      "n8n"
    ],
    "summary": "n8n automation powered by Retell AI as an autonomous voice receptionist, checks calendar, books, updates, and cancels appointments with Zoom integration.",
    "description": "n8n automation powered by Retell AI as an autonomous voice receptionist, checks calendar, books, updates, and cancels appointments with Zoom integration.",
    "tags": [
      "n8n",
      "Retell AI",
      "Google Calendar",
      "Zoom"
    ],
    "result": "24/7 autonomous scheduling, zero missed bookings",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/money-reset-ai-voice-agent-retell-powered-appointment-automation"
  },
  {
    "id": 29,
    "name": "Avouria: Shopify Membership, Size Quiz, and A/B Testing",
    "category": "Shopify",
    "sourceCategories": [
      "Shopify",
      "Integration"
    ],
    "summary": "Built a custom Shopify storefront for Avouria featuring a VIP Comfort Club membership (free first month, then $19.99/month recurring) auto-added at checkout, plus an in-house Find My Size quiz (weight, height, body type, etc.) that recommends the best tier and exact size, replacing a costly Octane AI subscription. Also set up A/B testing across the funnel to optimize conversions.",
    "description": "Built a custom Shopify storefront for Avouria featuring a VIP Comfort Club membership (free first month, then $19.99/month recurring) auto-added at checkout, plus an in-house Find My Size quiz (weight, height, body type, etc.) that recommends the best tier and exact size, replacing a costly Octane AI subscription. Also set up A/B testing across the funnel to optimize conversions.",
    "tags": [
      "Shopify",
      "Shopify Functions",
      "Liquid",
      "Recharge",
      "A/B Testing"
    ],
    "result": "Recurring membership at checkout, in-house size quiz, and structured funnel A/B testing",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/avouria-vip-membership-custom-find-my-size-quiz-a-b-testing"
  },
  {
    "id": 30,
    "name": "VTL Sleep Spray: Custom Shopify Liquid Storefront",
    "category": "Shopify",
    "sourceCategories": [
      "Shopify",
      "Integration"
    ],
    "summary": "Built the entire VTL Sleep Spray storefront from scratch in Shopify using custom Liquid, sections, and snippets. Includes a conversion-focused PDP with bundle-and-save selector, sticky promo bar, ingredient science section, real-customer review carousel, comparison table, benefits accordion, and a 30-night risk-free guarantee block.",
    "description": "Built the entire VTL Sleep Spray storefront from scratch in Shopify using custom Liquid, sections, and snippets. Includes a conversion-focused PDP with bundle-and-save selector, sticky promo bar, ingredient science section, real-customer review carousel, comparison table, benefits accordion, and a 30-night risk-free guarantee block.",
    "tags": [
      "Shopify",
      "Liquid",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "result": "Fully custom theme, high-converting PDP, polished editorial brand feel end-to-end",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/vtl-sleep-spray-custom-shopify-liquid-storefront"
  },
  {
    "id": 31,
    "name": "AI Series Masterclass: Learning Management System for Viral Stories PH",
    "category": "SaaS",
    "sourceCategories": [
      "SaaS",
      "Integration"
    ],
    "summary": "Premium learning management system built for Viral Stories Ph' (315K+ Facebook followers) to sell and deliver AI content creation courses. Modern dark-themed landing page with urgency-driven design, GCash enrollment flow, and a full student dashboard with course browsing, lesson viewing, progress tracking, and community access.",
    "description": "Premium learning management system built for Viral Stories Ph' (315K+ Facebook followers) to sell and deliver AI content creation courses. Modern dark-themed landing page with urgency-driven design, GCash enrollment flow, and a full student dashboard with course browsing, lesson viewing, progress tracking, and community access.",
    "tags": [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Router",
      "TanStack Query",
      "Supabase",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel"
    ],
    "result": "Complete LMS with auth, payments, course delivery, and progress tracking shipped end-to-end",
    "status": "Built",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/ai-series-masterclass-learning-management-system-for-viral-stories-ph"
  },
  {
    "id": 36,
    "name": "Scout FX: AI Market Intelligence and Trading Research Platform",
    "category": "SaaS",
    "sourceCategories": [
      "SaaS",
      "AI Product",
      "Admin Portal"
    ],
    "summary": "An AI research platform that organizes market structure, confluence, news context, and signal freshness into explainable research cards instead of unexplained trade calls.",
    "description": "Designed and built the foundation for an AI market intelligence platform that monitors assets and timeframes, scores data freshness, and turns technical and macro context into structured research records.",
    "tags": [
      "SaaS",
      "AI Product",
      "Supabase",
      "Background Workers",
      "Admin Portal"
    ],
    "result": "MVP and initial platform foundation for organized, explainable market research. Continuing development.",
    "status": "In development",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/scout-fx-ai-market-intelligence-research-platform"
  },
  {
    "id": 37,
    "name": "Hanaply: AI Job Intelligence and Career Radar",
    "category": "SaaS",
    "sourceCategories": [
      "SaaS",
      "AI Product"
    ],
    "summary": "A career platform that ingests job listings, explains fit against a user profile, and helps job seekers focus on worthwhile opportunities instead of checking every posting by hand.",
    "description": "Built locally as an AI job intelligence and career radar with profile matching, fit explanations, resume and cover letter support, filtering, alerts, and a career dashboard. Hosted deployment and launch items remain.",
    "tags": [
      "SaaS",
      "AI Product",
      "Supabase",
      "Job Ingestion"
    ],
    "result": "Local product foundation for job matching, fit explanations, and career workflow. Not a fully launched public platform.",
    "status": "Built locally",
    "caseStudyUrl": "https://www.automatewithmarky.com/projects/hanaply-ai-job-intelligence-career-radar"
  }
];
