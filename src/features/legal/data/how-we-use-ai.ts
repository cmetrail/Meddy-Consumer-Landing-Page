import type { LegalDoc } from "../types";

export const howWeUseAI: LegalDoc = {
  title: "How We Use AI",
  org: "Meddy Health LLC",
  effectiveDate: "October 17, 2026",
  sections: [
    {
      title: "About this policy",
      paragraphs: [
        "Meddy uses artificial intelligence (AI) to make care faster and easier to reach. Your physician always stays in charge of your care.",
        "Medical services through Meddy are provided by Sameer Aggarwal Medical PLLC (“the Medical Practice”) and its licensed physicians. Meddy Health LLC (“Meddy”) provides the technology, including the AI tools described here, on the Medical Practice’s behalf.",
      ],
    },
    {
      title: "Where we use AI",
      bullets: [
        {
          lead: "Our phone line.",
          text: "Calls to 516-925-3997 are answered 24 hours a day by an automated assistant. At the start of each call it tells you that it is automated and that the call is recorded and transcribed. It can help you navigate questions in relation to our services and provide messages to your physician. It does not give medical advice. If you have an emergency, hang up and call 911.",
        },
        {
          lead: "Helping your physician find information in your record.",
          text: "Your physician may use an AI tool to search your medical record in plain language. It returns text summaries of what it finds, with references to the original entries, so your physician can check them.",
        },
        {
          lead: "Helping your physician look up medical research.",
          text: "Your physician may use an AI tool to look up evidence-based medical information from a curated library of clinical sources. It shows the source for each answer so your physician can review the original guideline or study.",
        },
      ],
      trailing:
        "These tools are used only by your care team, and only for patients under their care.",
    },
    {
      title: "What AI never does",
      paragraphs: [
        "AI never diagnoses you, chooses your treatment, or prescribes medication. Those decisions are made only by licensed physicians at the Medical Practice. Your physician reviews anything AI helps find or prepare before relying on it, adding it to your record, or sending it to you.",
      ],
    },
    {
      title: "How your information is protected",
      bullets: [
        "Our AI provider, OpenAI, has signed a Business Associate Agreement and must protect your health information as HIPAA requires.",
        "OpenAI may not use your health information to train its AI models.",
        "Your information is encrypted in transit and at rest and kept only as long as needed to provide the service.",
        "Access to the AI tools is limited to your care team, and every search of your record is logged.",
        "Meddy may use de-identified information, which cannot be used to identify you under HIPAA’s standards, to improve its services and develop its own AI tools.",
      ],
    },
    {
      title: "Your rights",
      bulletIntro:
        "You have the same rights over information processed by AI as over the rest of your health information. These include the right to:",
      bullets: [
        "see and get copies of your medical records;",
        "ask us to correct information you believe is wrong;",
        "get a list of certain disclosures of your health information; and",
        "file a complaint if you believe your privacy rights were violated.",
      ],
      trailing: [
        "You can also ask your physician how AI was used in your care. If you prefer not to use the automated phone assistant, you can send your question to your physician through secure messaging in the Meddy app.",
        "The Medical Practice’s Notice of Privacy Practices explains these rights and how to use them. Meddy’s Privacy Policy explains how Meddy handles information that is not part of your medical care.",
      ],
    },
    {
      title: "Questions",
      paragraphs: [
        "Contact support@getmeddyhealth.com or call 516-925-3997.",
        "Meddy Health LLC · 2248 Broadway #1071, New York, NY 10024",
      ],
    },
  ],
};
