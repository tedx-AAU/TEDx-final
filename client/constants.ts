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
import partnerGold1 from './src/assets/images/31.png';
import partnerGold5 from './src/assets/images/Cpartner.png';
import partnerGold2 from './src/assets/images/32.png';
import partnerGold3 from './src/assets/images/33.png';
import partnerGold4 from './src/assets/images/34.jpeg';
import partnerSilver1 from './src/assets/images/35.jpeg';
import partnerSilver2 from './src/assets/images/36.jpeg';
import partnerSilver3 from './src/assets/images/42.jpeg';
import partnerMedia2 from './src/assets/images/38.jpeg';


export const SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Haneen Tamimi',
   title:
      '',
    speechTitle:
      '',
    bio: '',
    imageUrl: speaker1,
    category: '',
  },
  {
    id: '2',
    name: 'Farah Owais',
    title: '',
    speechTitle:
      '',
    bio: '',
    imageUrl: speaker2,
    category: '',
  },
  {
    id: '3',
    name: 'Mohammad Nabhan',
    title:
      '',
    speechTitle:
      '',
    bio: '',
    imageUrl: speaker3,
    category: '',
   
  },
  {
    id: '4',
    name: 'Wesam Alkaresheh',
    title:
      '',
    speechTitle: '',
    bio: '',
    imageUrl: speaker4,
    category: '',
  },
  /*
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
  */
];

export const ORGANIZER: Organizer = {
  name: 'Abdulrahman Alnajlat',
  role: 'Deputy Event Lead & Co-Leader Organizer',
  bio: `Every story starts with an idea,
        and that idea might be different. 
        But being different isn't a weakness, it's a strength. 
        And from there, we turn every unique idea into a force that creates real impact.`,
  imageUrl: organizerImg2,
};

export const PARTNERS: Partner[] = [
  // Platinum Tier
  {
    name: 'SKYFALL ENTERPRISES',
    logoUrl: partnerGold1,
    tier: 'Platinum',
  },
{
    name: 'Correct',
    logoUrl: partnerGold5,
    tier: 'Platinum',
  },


 //Gold
  {
    name: 'Solvenear',
    logoUrl: partnerGold2,
    tier: 'Gold',
  },
  {
    name: 'Quantum energy pendant',
    logoUrl: partnerGold3,
    tier: 'Gold',
  },
  {
    name: 'Annubala',
    logoUrl: partnerGold4,
    tier: 'Gold',
  },
 
  {
    name: 'Partner 1',
    logoUrl: partnerSilver1,
    tier: 'Gold',
  },
  {
    name: 'Partner 2',
    logoUrl: partnerSilver2,
    tier: 'Gold',
  },
  {
    name: 'شينالكو',
    logoUrl: partnerSilver3,
    tier: 'Gold',
  },

 {
    name: 'شبابيك',
    logoUrl: partnerMedia2,
    tier: 'Gold',
  },
 
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr.Samer Ayasrah',
    role: 'Licensee & Lead Organizer',
    imageUrl: organizerImg,
    linkedin: 'https://www.linkedin.com/in/samer-ayasrah-b576615b?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: '2',
    name: "Abdulrahman Alnajlat",
    role: 'Deputy Event Lead & Co-Leader Organizer',
    imageUrl: team1,
    linkedin: 'https://www.linkedin.com/in/aboodalnajlat03?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: '3',
    name: 'Hala Ali',
    role: 'Event lead secretary',
    imageUrl: team2,
    linkedin: 'https://www.linkedin.com/in/hala-ali-670940342?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: '4',
    name: 'Sora Alzetawi',
    role: 'Media Team Leader',
    imageUrl: team3,
    linkedin: 'https://www.linkedin.com/in/sora-alzetawi?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: '5',
    name: 'Hedaya Yasin',
    role: 'Media Team Co-Leader',
    imageUrl: team4,
    linkedin: 'https://jo.linkedin.com/in/hedaya-yasin-615b322b1',
  },
  {
    id: '6',
    name: 'Rama Mustafa',
    role: 'Program Team Leader',
    imageUrl: team5,
    linkedin: 'https://www.linkedin.com/in/rama-mustafa-b03b2731b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  },
  {
    id: '7',
    name: 'Hesham Yehya',
    role: 'Program Team Co-Leader',
    imageUrl: team6,
    linkedin: 'https://www.linkedin.com/in/hesham-yehya-61a961356?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    
  },
  {
    id: '8',
    name: 'Hala Alkiswani',
    role: 'Sponsorship Team Leader',
    imageUrl: team7,
    linkedin: 'https://www.linkedin.com/in/hala-alkiswani-b9b4b9366?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
   
  },
  {
    id: '9',
    name: 'Ali Shahen',
    role: 'Sponsorship Team Co-Leader',
    imageUrl: team8,
    linkedin: 'https://www.linkedin.com/in/ali-shaheen-3b0462297?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: '10',
    name: "Leen Nofal",
    role: 'Curation Team Leader',
    imageUrl: team9,
    linkedin: 'https://www.linkedin.com/in/leen-nofal-1766452b3?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: '11',
    name: 'Aesma Fuaad',
    role: 'Curation Team Co-Leader',
    imageUrl: team10,
    linkedin: 'https://www.linkedin.com/in/asmafuaad?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: '12',
    name: 'Yousef Yasin',
    role: 'Web Master Team Leader',
    imageUrl: team11,
    linkedin: 'https://www.linkedin.com/in/yousef-yasin-79b615318?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: '13',
    name: 'Ruaa Hussein',
    role: 'Web Master Team Co-Leader',
    imageUrl: team12,
    linkedin: 'https://www.linkedin.com/in/ruaa-hussin-858bb1352?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
   
  },
  {
    id: '14',
    name: 'Sameera Dweik',
    role: 'Presenters Coordinator',
    imageUrl: team13,
    linkedin: 'https://www.linkedin.com/in/sameera-dweik-0a24a8295?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
];

export const SCHEDULE: ScheduleItem[] = [
  {
    time: '8:45 – 9:45 AM',
    title: 'Registration and guest reception',
    description:''
  },
  {
    time: '9:50 – 10:15 AM',
    title: 'Event Opening',
    description: '',
  },
  {
    time: '10:15 – 11:10 AM',
    title: 'Session 1',
    description: '  Speakers & Activities (Part 1)',
  },
  {
    time: '11:10 – 11:40 AM',
    title: 'Break',
    description: '',
    speakerId: '',
  },
  {
    time: '11:40 – 12:25 PM',
    title: 'Session 1 ',
    description: 'Speakers & Activities (Part 2)',
  },
  {
    time: '12:25 – 13:25 PM',
    title: 'Break',
    description: '',
  },
  {
    time: '13:25 – 14:20 PM',
    title: 'Session 2 – Speakers',
    description: ''
  },
  {
    time: '14:20 – 14:40 PM',
    title: 'Short Break',
    description: ''
  },
  {
    time: '14:40 – 16:00 PM',
    title: 'Closing & Awards Ceremony',
    description: '',
  }, 
  /*
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
  */
];
