export type BookConsultationForm = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  textReminders: boolean;
  stateOfResidence: string;
  is18OrOlder: boolean;
  goals: string[];
  additionalNotes: string;
  date: string;
  time: string;
  endTime: string;
  agreeTerms: boolean;
  telehealthConsent: boolean;
  privacyPractices: boolean;
};
