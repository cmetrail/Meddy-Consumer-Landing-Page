import type { LegalDoc } from "../types";

export const noticeOfPrivacyPractices: LegalDoc = {
  title: "Notice of Privacy Practices",
  org: "Sameer Aggarwal Medical PLLC",
  effectiveDate: "October 17, 2026",
  notice:
    "THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.",
  sections: [
    {
      title: "Who this notice covers",
      paragraphs: [
        "This notice applies to Sameer Aggarwal Medical PLLC (“the Practice,” “we,” “us”), which provides your medical care. The Practice offers its services through the Meddy website and app, which are owned and operated by Meddy Health LLC (“Meddy”), a company also owned by Dr. Aggarwal. Meddy is the Practice’s business associate: it handles your health information only on the Practice’s behalf, as described in this notice.",
        "This notice covers your protected health information held by or for the Practice, starting from the moment you request a free consultation. That includes the health goals, concerns, or measurements you share when you book. General website data and account details unrelated to your care are covered by Meddy Health LLC’s Privacy Policy.",
      ],
    },
    {
      title: "Our responsibilities",
      bulletIntro: "The Practice is required by law to:",
      bullets: [
        "Maintain the privacy and security of your protected health information.",
        "Give you this notice of our legal duties and privacy practices.",
        "Follow the terms of the notice currently in effect.",
        "Notify you promptly if a breach occurs that may have compromised the privacy or security of your information.",
      ],
      trailing: [
        "We can change the terms of this notice, and the changes will apply to all information we have about you. The new notice will be available upon request, on the Meddy website, and in the patient app.",
        "We will not use or share your information other than as described here unless you tell us we can in writing. If you give us permission, you may change your mind at any time by telling us in writing.",
      ],
    },
    {
      title: "How we typically use and share your information",
      subsections: [
        {
          heading: "Treatment.",
          body: "Our clinicians use your information to provide your care, and we share it with other professionals treating you. Example: We send your prescription to your pharmacy, order lab tests from a laboratory, or share information with a specialist we refer you to.",
        },
        {
          heading: "Information you share through the app.",
          body: "Health data you log or share from your own devices (such as weight, sleep, or heart rate) is protected under this notice. Data your clinicians review or rely on for your care becomes part of your medical record. Other device data is stored securely but is not part of your medical record. The device maker’s own privacy policy governs data held by that company.",
        },
        {
          heading: "Payment.",
          body: "We use and share your information to bill and get paid. Example: If you choose to use insurance, we send your health plan, through a claims clearinghouse, the information needed to process a claim. We do not share your information with your health plan for services you pay for in full yourself if you ask us not to (see “Your rights”).",
        },
        {
          heading: "Health care operations.",
          body: "We use your information to run the Practice and improve your care. Example: We review records to evaluate care quality. We may use software, including artificial intelligence tools, to help with tasks such as transcribing calls, summarizing messages, or drafting notes. Our clinicians review this work before relying on it for your care. These tools are used only under Business Associate Agreements, and our vendors may not use your information to train their artificial intelligence models. Meddy may use information that has been de-identified, so that it can no longer identify you, to improve its services, including to develop artificial intelligence models, as HIPAA permits.",
        },
        {
          heading: "Business associates.",
          body: "We share your information with companies that perform services for us, called business associates. Each must sign a Business Associate Agreement that requires it to protect your information and use it only for the services it provides to us. Our business associates include:",
          bullets: [
            "Meddy Health LLC, which provides the patient app, patient portal, electronic health record, and website, and handles administrative services for the Practice, including scheduling, appointment reminders, patient communications, and the Practice’s phone line, text messages, and support email. Meddy staff and Meddy’s automated assistant may read your messages to answer non-clinical questions and send clinical questions to a Practice clinician. Meddy also connects the Practice to a claims clearinghouse for insurance billing. Neither Meddy staff nor the automated assistant provides medical care or advice.",
            "Other vendors that support our services, such as providers of cloud hosting, electronic prescribing, video visits, phone and text messaging, artificial intelligence processing, and insurance claims processing.",
          ],
        },
        {
          heading: "Appointment reminders and health information.",
          body: "We, or Meddy on our behalf, may contact you about appointments, results availability, and treatment options related to your care.",
        },
        {
          heading: "Calls, texts, and email.",
          body: "Calls to our phone line may be answered by an automated assistant that uses artificial intelligence. It will tell you at the start of the call that you are speaking with an automated assistant and that the call is recorded and transcribed. It handles scheduling and other administrative questions only, does not give medical advice, and sends clinical questions to a Practice clinician. Call recordings, transcripts, and voicemails are kept with your records.",
        },
        {
          body: "Text messages and email may not be encrypted, so we use them only for appointment, account, and other non-clinical information, and only if you have agreed to receive them. Detailed health information is shared only through the secure patient app. If you have a medical emergency, call 911.",
        },
      ],
    },
    {
      title: "Other ways we may use or share your information",
      paragraphs: [
        "We are allowed or required to share your information in other ways, usually for the public good, after meeting conditions set by law:",
      ],
      bullets: [
        {
          lead: "Public health and safety:",
          text: "reporting certain diseases, adverse reactions to medications, suspected abuse, neglect, or domestic violence, and preventing a serious threat to someone’s health or safety.",
        },
        {
          lead: "As required by law:",
          text: "including to the U.S. Department of Health and Human Services to show we comply with privacy law.",
        },
        {
          lead: "Health oversight:",
          text: "to agencies for audits, investigations, and licensing.",
        },
        {
          lead: "Lawsuits and legal actions:",
          text: "in response to a court or administrative order, or a subpoena.",
        },
        {
          lead: "Law enforcement:",
          text: "for certain law enforcement purposes, such as identifying a suspect or reporting a crime.",
        },
        {
          lead: "Workers’ compensation and government functions:",
          text: "for workers’ compensation claims and special government functions such as military and national security.",
        },
        {
          lead: "Coroners, medical examiners, funeral directors, and organ donation.",
          text: "",
        },
        {
          lead: "Research:",
          text: "in limited cases approved by a review board.",
        },
        {
          lead: "Family and friends:",
          text: "with someone involved in your care or payment, if you agree or do not object, or in an emergency if we believe it is in your best interest.",
        },
      ],
      trailing:
        "Where a state or federal law gives your information more protection (see below), we follow the more protective law.",
    },
    {
      title: "Uses that require your written permission",
      bulletIntro: "We will never do the following without your written authorization:",
      bullets: [
        "Use or share your information for marketing purposes. This includes any use by Meddy Health LLC to promote its own products or services.",
        "Sell your information.",
        "Share psychotherapy notes, in most cases.",
      ],
      trailing:
        "Any other use or disclosure not described in this notice will be made only with your written authorization. You may revoke an authorization in writing at any time, except to the extent we have already acted on it.",
    },
    {
      title: "Additional protections for sensitive information",
      paragraphs: [
        "Some state and federal laws give certain information more protection than HIPAA. When they apply, we follow them.",
      ],
      bullets: [
        {
          lead: "HIV-related information",
          text: "is protected under New York Public Health Law Article 27-F. We will not share it without your specific written consent, except as that law allows.",
        },
        {
          lead: "Genetic test results",
          text: "are protected under New York Civil Rights Law §79-l and will not be disclosed without your written consent, except as that law allows.",
        },
        {
          lead: "Substance use disorder treatment records.",
          text: "If we receive records from a federally assisted substance use disorder program protected by 42 CFR Part 2, those records will not be used or disclosed in civil, criminal, administrative, or legislative proceedings against you without your written consent or a court order, and will be handled as Part 2 requires.",
        },
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "To use any of these rights, contact us at support@getmeddyhealth.com, at 516-925-3997, or through the patient portal. Requests may be received by Meddy staff on our behalf, but the Practice decides every request.",
      ],
      bullets: [
        {
          lead: "See or get a copy of your records.",
          text: "You can ask to inspect, or get an electronic or paper copy of, your medical record. We will let you inspect your record within 10 days of your request and provide copies within 30 days. Paper copies cost no more than 75 cents per page. Electronic copies are provided for a reasonable, cost-based fee.",
        },
        {
          lead: "Ask us to correct your record.",
          text: "You can ask us to correct information you think is incorrect or incomplete. We may say no, but we will tell you why in writing within 60 days.",
        },
        {
          lead: "Request confidential communications.",
          text: "You can ask us to contact you a specific way (for example, a different phone or email) or at a different address. We will say yes to all reasonable requests.",
        },
        {
          lead: "Ask us to limit what we use or share.",
          text: "You can ask us not to use or share certain information. We are not required to agree, except: if you pay for a service in full out of pocket, you can ask us not to share that information with your health insurer, and we will agree unless the law requires us to share it.",
        },
        {
          lead: "Get a list of disclosures.",
          text: "You can ask for a list of times we have shared your information in the six years before your request, other than for treatment, payment, operations, and certain other disclosures. One list a year is free.",
        },
        {
          lead: "Get a copy of this notice",
          text: "on paper at any time, even if you agreed to receive it electronically.",
        },
        {
          lead: "Choose someone to act for you.",
          text: "If you have a health care proxy or legal guardian, that person can exercise your rights.",
        },
      ],
      trailing:
        "This notice is posted on the Meddy website and in the patient app, and you acknowledge receiving it when you request a consultation.",
    },
    {
      title: "Complaints",
      paragraphs: [
        "If you believe your privacy rights have been violated, you can file a complaint with our Privacy Officer at support@meddypartners.com or by mail at the address below. You can also file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights at 200 Independence Avenue SW, Washington, DC 20201, by calling 1-877-696-6775, or online at www.hhs.gov/ocr/privacy/hipaa/complaints/.",
        "We will not retaliate against you for filing a complaint.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "Privacy Officer: Dr. Sameer Aggarwal",
        "Sameer Aggarwal Medical PLLC, 307 W 38th St 16th Floor # 255 New York, NY 10018",
        "Privacy complaints: support@meddypartners.com",
        "All other questions: support@getmeddyhealth.com · 516-925-3997",
      ],
    },
  ],
};
