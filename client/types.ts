
export interface Speaker {
  id: string;
  name: string;
  title: string;
  speechTitle: string;
  bio: string;
  imageUrl: string;
  category: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  linkedin?: string;
  instagram?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  speakerId?: string;
}

export interface Partner {
  name: string;
  logoUrl: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Community' | 'Media' | 'Robotics';
}

export interface Organizer {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}
