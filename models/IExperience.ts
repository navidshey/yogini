export interface IExperience {
  id: string;
  title: String;
  company: String;
  location: String;
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
