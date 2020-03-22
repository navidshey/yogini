export interface IExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  from?: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface IExperienceErrors {
  title?: string;
  company?: string;
  from?: string;
}
