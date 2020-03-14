export interface IEducation {
  id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from?: Date;
  to?: Date;
  current: string;
  description: string;
}

export interface IEducationErrors {
  school?: string;
  degree?: string;
  fieldofstudy?: string;
  from?: string;
}
