import type {
  Speaker,
  ScheduleItem,
  Partner,
  TeamMember,
  Organizer,
} from './types';

// Import speaker images
import speaker1 from './src/assets/images/10.jpg';
import speaker2 from './src/assets/images/8.jpg';
import speaker3 from './src/assets/images/7.jpg';
import speaker4 from './src/assets/images/6.jpg';
import speaker5 from './src/assets/images/3.jpg';
import speaker6 from './src/assets/images/1.jpg';
import speaker7 from './src/assets/images/11.jpg';
import speaker8 from './src/assets/images/4.jpg';
import speaker9 from './src/assets/images/2.jpg';
import speaker10 from './src/assets/images/9.jpg';

// Import team member images
import organizerImg from './src/assets/images/24.jpg';
import organizerImg2 from './src/assets/images/MOmari.png';
import team1 from './src/assets/images/25.jpg';
import team2 from './src/assets/images/13.jpg';
import team3 from './src/assets/images/12.jpg';
import team4 from './src/assets/images/19.jpg';
import team5 from './src/assets/images/20.jpg';
import team6 from './src/assets/images/21.jpg';
import team7 from './src/assets/images/22.jpg';
import team8 from './src/assets/images/23.jpg';
import team9 from './src/assets/images/17.jpg';
import team10 from './src/assets/images/15.jpg';
import team11 from './src/assets/images/18.jpg';
import team12 from './src/assets/images/16.jpg';
import team13 from './src/assets/images/29.jpg';
import team14 from './src/assets/images/28.jpg';
import team15 from './src/assets/images/27.jpg';

// Import partner logos
import partnerPlatinum1 from './src/assets/images/30.jpeg';
import partnerGold1 from './src/assets/images/31.png';
import partnerGold2 from './src/assets/images/32.png';
import partnerGold3 from './src/assets/images/33.png';
import partnerGold4 from './src/assets/images/34.jpeg';
import partnerGold5 from './src/assets/images/40.jpeg';
import partnerGold6 from './src/assets/images/41.jpeg';
import partnerGold7 from './src/assets/images/44.png';
import partnerSilver1 from './src/assets/images/35.jpeg';
import partnerSilver2 from './src/assets/images/36.jpeg';
import partnerSilver3 from './src/assets/images/42.jpeg';
import partnerSilver4 from './src/assets/images/43.jpeg';
import partnerSilver5 from './src/assets/images/46.png';
import partnerMedia1 from './src/assets/images/37.png';
import partnerMedia2 from './src/assets/images/38.jpeg';
import partnerRobotics1 from './src/assets/images/39.png';
import partnerCommunity1 from './src/assets/images/45.png';

export const SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Randa Azar',
    title:
      'Founder and Training Consultant at Randa Azar Consultancy for Training & Development',
    speechTitle:
      'Your Leadership Voice: Building Influence Through Communication',
    bio: 'With over 30 years of international experience, she specializes in public speaking and leadership development, empowering leaders and teams to unlock their voices and build influential presence.',
    imageUrl: speaker1,
    category: 'Leadership',
    linkedin: 'https://www.linkedin.com/in/randaazar/',
  },
  {
    id: '2',
    name: 'Dr. Lama Harb',
    title: 'Psychologist, Behavioral Doctor, Social Worker, and ABA Specialist',
    speechTitle:
      'Growth Is Always Possible: Creating Change Through Supportive Environments',
    bio: 'She works with children, adolescents, and adults to develop behavioral, social, and emotional skills through evidence-based therapeutic approaches, believing that growth and change are possible at any age.',
    imageUrl: speaker2,
    category: 'Psychology',
    instagram: 'https://www.instagram.com/p/DSNJa5nDAE7/?igsh=N201dm8yMHN2a3Q4',
  },
  {
    id: '3',
    name: 'Odai Baqaeen',
    title:
      'Co-Founder and Managing Partner at 180 Degrees for Empowering People',
    speechTitle:
      '180 Degrees of Empowerment: Clarity, Confidence, and Lasting Impact',
    bio: 'With over 15 years of experience in leadership, sales, and people development. A certified trainer, coach, and motivational speaker passionate about helping individuals and organizations grow with clarity, confidence, and purpose.',
    imageUrl: speaker3,
    category: 'Empowerment',
    linkedin: 'https://www.linkedin.com/in/odaibaqaeen/',
  },
  {
    id: '4',
    name: 'Farah Ashour',
    title:
      'Fashion Designer, Content Creator, and Founder of Abaya by Farah and Lace Atelier JO',
    speechTitle: 'Identity in Style: How Fashion Becomes Self-Expression',
    bio: 'She blends fashion, identity, and lifestyle, using creativity to express individuality and build a distinctive personal and entrepreneurial brand.',
    imageUrl: speaker4,
    category: 'Fashion',
    instagram:
      'https://www.instagram.com/farahashour?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  },
  {
    id: '5',
    name: 'Chef Elyan',
    title: 'Culinary and Coffee Specialist',
    speechTitle: 'Taste Is More Than Food: How We Judge Experiences and People',
    bio: 'A culinary and coffee specialist with over 15 years of experience across diverse kitchens and cultures worldwide. He has served as a judge in local and international competitions, appeared as a culinary expert on television, and believes that taste and evaluation go beyond food to reflect how we perceive people and human value.',
    imageUrl: speaker5,
    category: 'Culinary',
    instagram:
      'https://www.instagram.com/chef_elyan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  },
  {
    id: '6',
    name: 'Seham Alomari',
    title:
      'Founder of Charitable Organization for Orphans and People with Disabilities',
    speechTitle: 'From the womb of pain, hope is born.',
    bio: 'Siham Al-Omari is a Jordanian woman who transformed a painful accident in her life into a great blessing for which she thanks God. After becoming disabled, she began collecting donations to support people with disabilities and founded a charitable organization for orphans, focusing on their sponsorship and skill development, enabling them to become active members of society and financially independent.',
    imageUrl: speaker10,
    category: 'Social Impact',
    facebook:
      'https://web.facebook.com/p/%D8%A8%D9%8A%D8%AA-%D8%A7%D9%84%D8%AE%D9%8A%D8%B1-%D9%84%D8%B1%D8%B9%D8%A7%D9%8A%D8%A9-%D8%A7%D9%84%D8%A7%D9%8A%D8%AA%D8%A7%D9%85-100064894622037/?_rdc=1&_rdr#',
  },
  {
    id: '7',
    name: 'Karim Al-Hammouri',
    title:
      'Entrepreneur, Industrial Engineer, Innovation & Design Thinking Consultant, Project Manager at Better Business, Founder of Masterminds Community, and TOT® Certified Trainer',
    speechTitle:
      'The Entrepreneurial Mindset: The Influence of Choosing to Be Different',
    bio: 'He promotes entrepreneurship as a mindset for creating impact, not merely for building businesses.',
    imageUrl: speaker6,
    category: 'Entrepreneurship',
    linkedin: 'https://www.linkedin.com/in/karim-al-hammouri/',
  },
  {
    id: '8',
    name: 'Saad Al-Khatib',
    title: 'Content Creator and Technology Specialist',
    speechTitle: 'Simplifying Life with Technology: How AI Serves Us Daily',
    bio: 'He simplifies everyday life through technology and artificial intelligence. He creates engaging content about smart apps and websites and collaborates with brands to enhance their digital presence.',
    imageUrl: speaker7,
    category: 'Technology',
  },
  {
    id: '9',
    name: 'Sima Najjar',
    title: 'Entrepreneur, Content Creator, and Mother of Three',
    speechTitle: 'Break the Cycle: How a Small Step Can Create a New Beginning',
    bio: 'She transforms life experiences into inspiring messages that encourage movement, change, and taking small steps that lead to meaningful personal transformation.',
    imageUrl: speaker8,
    category: 'Personal Development',
    instagram:
      'https://www.instagram.com/simanajjar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  },
  {
    id: '10',
    name: 'Hamza Asfour',
    title: 'Procurement Department Manager at the Near East Foundation',
    speechTitle:
      'Empowering Youth Through Volunteering: From Initiative to Skill Building',
    bio: "Holder of a Master's degree in Social Studies. Passionate about youth empowerment through training and volunteerism, with a focus on building skills and knowledge as tools for creating sustainable community impact.",
    imageUrl: speaker9,
    category: 'Youth Empowerment',
    linkedin: 'https://www.linkedin.com/in/hamza-asfour-83138b196/',
  },
];

export const ORGANIZER: Organizer = {
  name: 'Mohammad Alomari',
  role: 'Organizer',
  bio: 'Leading the vision and execution of TEDxJabal Tareq, bringing together passionate individuals to create an inspiring event.',
  imageUrl: organizerImg2,
};

export const PARTNERS: Partner[] = [
  // Platinum Tier
  {
    name: 'Hashemite Kingdom of Jordan & Ministry of Culture',
    logoUrl: partnerPlatinum1,
    tier: 'Platinum',
  },
  // Gold Tier
  {
    name: 'Petra Ride',
    logoUrl: partnerGold1,
    tier: 'Gold',
  },
  {
    name: 'Berry',
    logoUrl: partnerGold2,
    tier: 'Gold',
  },
  {
    name: 'BANO STUDIO',
    logoUrl: partnerGold3,
    tier: 'Gold',
  },
  {
    name: 'SKYFALL ENTERPRISES',
    logoUrl: partnerGold4,
    tier: 'Gold',
  },
  {
    name: 'SHAPE',
    logoUrl: partnerGold6,
    tier: 'Gold',
  },
  {
    name: 'Pioneers Academy',
    logoUrl: partnerGold7,
    tier: 'Gold',
  },
  // Silver Tier
  {
    name: 'Partner 1',
    logoUrl: partnerSilver1,
    tier: 'Silver',
  },
  {
    name: 'Partner 2',
    logoUrl: partnerSilver2,
    tier: 'Silver',
  },
  {
    name: 'KITCO',
    logoUrl: partnerSilver3,
    tier: 'Silver',
  },
  {
    name: 'DONUTTERY',
    logoUrl: partnerSilver4,
    tier: 'Silver',
  },
  {
    name: 'Auntie Annes',
    logoUrl: partnerSilver5,
    tier: 'Silver',
  },
  // Media Partners
  {
    name: 'شبابيك',
    logoUrl: partnerMedia1,
    tier: 'Media',
  },
  {
    name: 'رؤيا',
    logoUrl: partnerMedia2,
    tier: 'Media',
  },
  {
    name: 'Tech Arabi',
    logoUrl: partnerGold5,
    tier: 'Media',
  },
  // Robotics Partners
  {
    name: 'QUILL',
    logoUrl: partnerRobotics1,
    tier: 'Robotics',
  },
  // Community Partners
  {
    name: 'Community Partner',
    logoUrl: partnerCommunity1,
    tier: 'Community',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Mohammad Alomari',
    role: 'Organizer',
    imageUrl: organizerImg,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '2',
    name: "Lujain Abusada'a",
    role: 'Co-Organizer',
    imageUrl: team1,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '3',
    name: 'Sultan Hussam',
    role: 'Team Management',
    imageUrl: team2,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '4',
    name: 'Nour Alhuda Nizar',
    role: 'Team Management',
    imageUrl: team3,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '5',
    name: 'Eman Btoush',
    role: 'Event Management',
    imageUrl: team4,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '6',
    name: 'Fatima Mosleh',
    role: 'Event Management',
    imageUrl: team5,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '7',
    name: 'Rahma Aldous',
    role: 'PR',
    imageUrl: team6,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '8',
    name: 'Zaid Mattar',
    role: 'PR',
    imageUrl: team7,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '9',
    name: 'Duha Elyyan',
    role: 'PR',
    imageUrl: team8,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '10',
    name: "Hussam Ma'aita",
    role: 'Marketing',
    imageUrl: team9,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '11',
    name: 'Abeer Nizar',
    role: 'Marketing',
    imageUrl: team10,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '12',
    name: 'Tariq Abu Taleb',
    role: 'Marketing',
    imageUrl: team11,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '13',
    name: 'Sara Hammad',
    role: 'Marketing',
    imageUrl: team12,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '14',
    name: 'Sujoud Altubasi',
    role: 'Graphic',
    imageUrl: team13,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '15',
    name: 'AbdAlrahamn Altahel',
    role: 'Graphic',
    imageUrl: team14,
    linkedin: '#',
    instagram: '#',
  },
  {
    id: '16',
    name: 'Farah Zeghan',
    role: 'Graphic',
    imageUrl: team15,
    linkedin: '#',
    instagram: '#',
  },
];

export const SCHEDULE: ScheduleItem[] = [
  {
    time: '11:00 AM',
    title: 'Opening Ceremony',
    description:
      'Welcome, Introduction of the MC, Introduction of the Organizer & Co-Organizer, Opening of the Sessions',
  },
  {
    time: '11:10 AM',
    title: 'Session 1',
    description: 'Violin & Live Drawing Performance (20 minutes)',
  },
  {
    time: '11:30 AM',
    title: 'Randa Azar',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '1',
  },
  {
    time: '11:40 AM',
    title: 'Dr. Lama Harb',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '2',
  },
  {
    time: '12:50 PM',
    title: 'Coffee Break',
    description: 'Networking and refreshments (30 minutes)',
  },
  {
    time: '1:00 PM',
    title: 'Odai Baqaeen',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '3',
  },
  {
    time: '1:10 PM',
    title: 'Farah Ashour',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '4',
  },
  {
    time: '1:20 PM',
    title: 'Chef Elyan',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '5',
  },
  {
    time: '1:30 PM',
    title: 'Seham Alomari',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '6',
  },
  {
    time: '2:55 PM',
    title: 'Food Break',
    description: 'Lunch break (45 minutes)',
  },
  {
    time: '3:10 PM',
    title: 'Karim Al-Hammouri',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '7',
  },
  {
    time: '3:20 PM',
    title: 'Saad Al-Khatib',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '8',
  },
  {
    time: '3:30 PM',
    title: 'Sima Najjar',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '9',
  },
  {
    time: '3:40 PM',
    title: 'Hamza Asfour',
    description: 'Speaker presentation (10 minutes)',
    speakerId: '10',
  },
  {
    time: '4:25 PM',
    title: 'Coffee Break',
    description: 'Networking and refreshments (15 minutes)',
  },
  {
    time: '4:35 PM',
    title: 'Closing Ceremony',
    description:
      'Closing Video, MC Closing Remarks, Speaker Appreciation, Sponsor Acknowledgment, Volunteer Recognition, Special Honor Mention for Ushers',
  },
  {
    time: '6:30 PM',
    title: 'Event Conclusion',
    description: 'Thank you for joining us!',
  },
];
