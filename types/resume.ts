export interface ResumeTemplate {
  id: string
  name: string
  description: string
  category: string
  techStack: string[]
  previewImage: string
  features: string[]
  targetRole: string
  downloadLink?: string
}

export interface TemplateCategory {
  id: string
  name: string
  description: string
}

export interface ResumeSection {
  type: 'header' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications'
  title: string
  content: any
}

export interface ResumeData {
  header: ResumeHeader
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: SkillCategory[]
  projects?: Project[]
  certifications?: Certification[]
  links?: SocialLink[]
}

export interface ResumeHeader {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | 'Present'
  description: string
  achievements?: string[]
  techStack?: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  major: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string[]
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  link?: string
  achievements?: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon?: string
}
