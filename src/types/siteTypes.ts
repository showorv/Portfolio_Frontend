export interface IEducation {
  year: string;
  title: string;
  institute: string;
  details: string[];
}

export interface ICertificate {
  title: string;
  org: string;
  year: string;
  link: string;
}

/** Everything on the landing page that can be edited from the admin panel. */
export interface ISite {
  hero: {
    name: string;
    roles: string[];
    badge: string;
    intro: string;
    image: string;
    experience: string;
    resumeUrl: string;
  };
  about: {
    subtitle: string;
    image: string;
    paragraphs: string[];
    traits: string[];
  };
  education: IEducation[];
  certificates: ICertificate[];
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
}
