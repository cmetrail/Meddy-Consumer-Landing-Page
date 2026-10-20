export type Bullet = string | { lead?: string; text: string };

export type LegalSection = {
  number?: number;
  title: string;
  paragraphs?: string[];
  subsections?: { heading?: string; body: string; bullets?: Bullet[] }[];
  bullets?: Bullet[];
  bulletIntro?: string;
  trailing?: string | string[];
  table?: { headers: string[]; rows: string[][] };
};

export type LegalDoc = {
  title: string;
  org: string;
  effectiveDate: string;
  notice?: string;
  sections: LegalSection[];
};
