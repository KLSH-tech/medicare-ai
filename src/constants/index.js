import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  sclogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Details",
    url: "#details",
  },
  {
    id: "3",
    title: "Resource Map",
    url: "/resource-map",
  },
  {
    id: "5",
    title: "Talk with Medicare",
    url: "/chat",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [sclogo, sclogo, sclogo, sclogo, sclogo];

export const brainwaveServices = [
  "Symptom Analysis & Assessment",
  "Clinical Decision Support",
  "Patient Risk Prediction",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
"With advanced automation and robust security, it’s the ideal solution for healthcare teams striving for smarter patient care and streamlined workflows.";

export const collabContent = [
  {
    id: "0",
    title: "Effortless Patient Management",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Medical Automation",
  },
  {
    id: "2",
    title: "Enhanced Data Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI-powered chatbot for basic health inquiries and general medical advice",
    price: "9.99",
    features: [
      "100 text generations",
      "50 image generations",
      "Standard support",
      "Access to basic medical models",
    ],
  },
  {
    id: "1",
    title: "Pro",
    description: "Advanced AI chatbot for in-depth medical advice and priority support",
    price: "29.99",
    features: [
      "500 text generations",
      "200 image generations",
      "Access to advanced medical models",
      "Faster response time",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot with personalized health recommendations and advanced analytics",
    price: "59.99",
    features: [
      "AI chatbot capable of understanding complex medical queries",
      "Tailored medical recommendations based on user health data",
      "Full access to all app features and health tools",
    ],
  },
];


export const benefits = [
  {
    id: "0",
    title: "Ask anything",
    text: "Discover personalized answers to your health-related questions instantly. Get accurate, AI-driven insights to guide your well-being.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: "https://cdn.who.int/media/images/default-source/cover-images/publications/publications-hero-image.jpg?sfvrsn=cc9235b3_15",
  },
  {
    id: "1",
    title: "Track Your Medicare Benefits",
    text: "Stay informed about your Medicare coverage and benefits. Understand your plan better with just a few taps.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: "https://cdn.who.int/media/images/default-source/who_homepage/nurse-with-covid-vaccine-vial.tmb-lg.jpg?sfvrsn=f3c5d966_13",
    light: true,
  },
  {
    id: "2",
    title: "Manage Your Appointments with Ease",
    text: "Schedule, reschedule, or cancel appointments quickly. Stay on top of your medical visits and ensure no appointment is missed.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: "https://cdn.who.int/media/images/default-source/topics/medicines-medical-devices-and-medical-care/nursing-and-midwifery/afghanistan-midwives-in-a-hospital.tmb-479v.jpg?sfvrsn=7a17f7dd_6",
  },
  {
    id: "3",
    title: "Access Your Test Results in Real-Time",
    text: "View your medical test results as soon as they’re available. Get quick access to important health data whenever you need it.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: "https://cdn.who.int/media/images/default-source/topics/health-and-well-being/mental-health-and-brain-health/community-mental-health-teams.tmb-xl.jpg?sfvrsn=9bedd74b_14",
    light: true,
  },
  {
    id: "4",
    title: "Get Medication Reminders",
    text: "Never forget to take your medication again. Receive timely alerts to ensure you stay on track with your prescriptions.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: "https://cdn.who.int/media/images/default-source/topics/diseases-and-conditions/cancer/breast-cancer.tmb-xl.jpg?sfvrsn=26e6e615_4",
  },
  {
    id: "5",
    title: "Personalized Health Tips Just for You",
    text: "Receive health tips tailored to your lifestyle and needs. Improve your well-being with advice customized for your health goals.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: "https://cdn.who.int/media/images/default-source/headquarters/campaigns/international-lead-poisoning-prevention-week-of-action/2025/52091-screen-use-(1920-px).jpg?sfvrsn=14018d75_3",
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
