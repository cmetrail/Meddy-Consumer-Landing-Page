import type { LegalDoc } from "../types";

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  org: "Meddy Health LLC",
  effectiveDate: "October 17, 2026",
  sections: [
    {
      title: "Who we are and what this policy covers",
      paragraphs: [
        "This policy explains how Meddy Health LLC (“Meddy,” “we,” “us”), a New York limited liability company, collects, uses, and shares information through the website getmeddyhealth.com and the Meddy mobile app. Meddy owns and operates the Meddy brand, website, app, and technology, and provides administrative services, such as scheduling and patient communications, to Sameer Aggarwal Medical PLLC (“the Medical Practice”).",
        "Meddy does not practice medicine or provide medical care. All medical services are provided by the Medical Practice and its licensed clinicians. Meddy Health LLC and the Medical Practice are both owned by Dr. Sameer Aggarwal.",
        "New York only. Medical services through Meddy are currently available only to people who are located in New York at the time of each consultation and visit.",
        "This policy covers information that is not part of your medical care, such as website visits, account and contact details, and how we use cookies and send communications.",
        "Your health information is covered by a different notice. Any health information you share with us, including the health goals, concerns, or measurements you provide when you request a free consultation, is protected health information of the Medical Practice from the moment you share it. The same applies to your records, appointments, messages, and data you log or share from devices once you are a patient. Meddy handles this information only on the Medical Practice’s behalf, as its business associate under HIPAA, to provide technology and administrative services such as scheduling, appointment reminders, and routing your messages to the Medical Practice’s clinicians. How that information is used and shared, and your rights over it, are described in the Medical Practice’s Notice of Privacy Practices. If this policy and that notice differ about your health information, the notice controls.",
      ],
    },
    {
      title: "Information we collect",
      table: {
        headers: ["Category", "Examples", "Source"],
        rows: [
          [
            "Contact and account information",
            "Name, email, phone number, state of residence, login credentials",
            "You",
          ],
          [
            "Communications",
            "Emails, support requests, messages to Meddy support, and recordings and transcripts of calls to our phone line",
            "You",
          ],
          [
            "Device and usage information",
            "Browser and device type, operating system, IP address, pages or screens viewed, app crash reports",
            "Automatically, from your device",
          ],
          [
            "Cookie information",
            "Session cookies needed to run the site and app; analytics cookies and session recordings by Contentsquare on public website pages, only if you accept them",
            "Automatically, from your device",
          ],
          [
            "Payment information",
            "Card details are entered into and held by the Medical Practice’s payment processor (Stripe); Meddy does not store card numbers or receive your payments",
            "You, via Stripe",
          ],
        ],
      },
      trailing:
        "Health information you share when you request a consultation is not listed here because it is covered by the Medical Practice’s Notice of Privacy Practices, as described above. We do not collect biometric identifiers such as fingerprints, facial geometry, retina or iris scans, or voiceprints, or precise location information. We do not buy personal information from data brokers.",
    },
    {
      title: "How we use information",
      bulletIntro: "We use information only to:",
      bullets: [
        "Create and manage your account, and let you use the website and app",
        "Respond to consultation requests and schedule your free consultation with the Medical Practice, on the Medical Practice’s behalf",
        "Send transactional messages, such as account notices, appointment confirmations and reminders, and security alerts",
        "Answer calls and texts, including through an automated assistant that uses artificial intelligence. It tells you at the start of each call that it is automated and that the call is recorded and transcribed.",
        "Provide support and respond to your requests, and route any health questions to the Medical Practice’s clinicians. Meddy staff and our automated assistant do not give medical advice.",
        "Keep the site and app secure, prevent fraud, and fix problems",
        "Understand how the site and app are used so we can improve them, using Contentsquare analytics on our public website pages if you accept analytics cookies",
        "Improve our services using de-identified information that cannot be used to identify you, including to develop and train our own analytics and artificial intelligence models",
        "Comply with the law and enforce our terms",
      ],
      trailing:
        "We will not use your information for a new purpose without telling you first and, where required, getting your consent.",
    },
    {
      title: "How we share information",
      paragraphs: [
        "We do not sell your personal information, and we do not use or share health information for advertising. We do not place third-party advertising pixels, analytics, or session recording tools in the patient app or portal, or on pages where you request a consultation, book an appointment, or enter health information.",
      ],
      bulletIntro: "We share information only with:",
      table: {
        headers: ["Recipient", "Why"],
        rows: [
          [
            "Sameer Aggarwal Medical PLLC",
            "To schedule consultations and provide the medical services you request",
          ],
          [
            "Service providers that work for us, such as Amazon Web Services (hosting and email delivery), Google Workspace (email), Sinch (phone calls and text messages), OpenAI (artificial intelligence processing, including our automated assistant), Stedi (insurance claims processing), and Contentsquare (website analytics)",
            "To run the site and app and send communications, under contracts that limit their use of the data to providing services to us. Providers that handle health information sign Business Associate Agreements, and may not use your health information to train artificial intelligence models.",
          ],
          [
            "Authorities or others, when required by law",
            "To comply with legal obligations or court orders, or to protect safety",
          ],
          [
            "A successor company",
            "If Meddy is involved in a merger or sale, subject to this policy and the Medical Practice’s protections for health information",
          ],
        ],
      },
      trailing: "We share information for any other purpose only with your consent.",
    },
    {
      title: "Cookies, analytics, and tracking",
      paragraphs: [
        "We use essential cookies to keep you signed in, remember your settings, and protect the site and app. These are always on.",
        "With your permission, we also use Contentsquare to understand how visitors use our public website pages, including which pages they view, where they click and scroll, and recordings of how they move through a page. When you first visit our website, we ask whether you accept analytics cookies and session recordings. Contentsquare does not run until you accept, and you can change your choice at any time through the cookie settings link at the bottom of our website.",
      ],
      bulletIntro: "When it runs, Contentsquare:",
      bullets: [
        "runs only on public website pages, and never in the patient app or portal, or on pages where you request a consultation, book an appointment, or enter health information;",
        "does not record pages about medications or weight management;",
        "is configured to mask anything you type; and",
        "truncates IP addresses where the tool allows.",
      ],
      trailing:
        "You can also block or delete cookies in your browser settings, though some features may not work without essential cookies. We honor Global Privacy Control signals by turning off any non-essential cookies for that browser.",
    },
    {
      title: "Communications and your choices",
      paragraphs: [
        "Meddy sends transactional messages, including account, security, scheduling, and appointment notices, for itself and on behalf of the Medical Practice. These are part of the service. Reminders by text or email contain no clinical details.",
      ],
      bullets: [
        {
          lead: "Text messages:",
          text: "reply STOP to opt out at any time. Message and data rates may apply. Consent to texts is not required to use the service or receive care. Calls and texts are handled through our phone provider, Sinch. Calls to our phone line may be answered by an automated assistant and are recorded and transcribed. Texts and email are not encrypted, so they never include clinical details.",
        },
        {
          lead: "Marketing emails",
          text: "are sent only with your consent. Use the unsubscribe link in any marketing email to opt out. We never use your medical information for marketing without your written authorization.",
        },
        {
          lead: "Push notifications",
          text: "can be turned off in your device settings.",
        },
      ],
    },
    {
      title: "Your rights",
      bulletIntro: "For information covered by this policy, you can ask us to:",
      bullets: [
        "Tell you what personal information we hold about you and give you a copy",
        "Correct inaccurate information",
        "Delete your information and close your account",
      ],
      trailing: [
        "Email support@getmeddyhealth.com with your request. We will verify your identity and respond within 30 days. We will not treat you differently for making a request.",
        "Deleting your Meddy account does not delete medical records the Medical Practice must keep by law. To access, correct, or get copies of your health information, follow the Medical Practice’s Notice of Privacy Practices.",
      ],
    },
    {
      title: "Retention",
      table: {
        headers: ["Information", "How long we keep it"],
        rows: [
          [
            "Consultation requests from people who do not have a consultation",
            "Deleted within 12 months, or sooner on request",
          ],
          [
            "Support communications, including call recordings and transcripts, for people who do not become patients",
            "Deleted within 12 months",
          ],
          [
            "Account information",
            "While your account is open, then deleted within 90 days of closure unless the law requires longer",
          ],
          ["Device, usage, and analytics data", "13 months"],
          [
            "Medical records, including free consultations, appointments, patient messages, and patient call recordings",
            "Kept by the Medical Practice as New York law requires (at least six years), under its Notice of Privacy Practices",
          ],
        ],
      },
    },
    {
      title: "Security and breach notification",
      paragraphs: [
        "We protect information with encryption in transit and at rest, multi-factor authentication for administrators, access controls and logging, regular security updates, and encrypted backups, hosted on HIPAA-eligible cloud infrastructure. Meddy staff who handle patient information are trained on HIPAA and can access only what they need for their work. No system is completely secure, so please keep your login private and tell us right away if you think your account has been compromised.",
        "If a security breach affects your personal information, we will notify you, and the authorities where required, as New York law and HIPAA require. For a breach involving health information, notice is given by or with the approval of the Medical Practice.",
      ],
    },
    {
      title: "Children",
      paragraphs: [
        "Meddy is for adults 18 and older. We do not knowingly collect information from anyone under 18; if we learn we have, we will delete it.",
      ],
    },
    {
      title: "Changes to this policy",
      paragraphs: [
        "We will post any changes here with a new effective date, and notify you in the app or by email before material changes take effect. We will not use previously collected information in a materially new way without your consent.",
      ],
    },
    {
      title: "Contact us",
      paragraphs: [
        "Meddy Health LLC · 2248 Broadway #1071, New York, NY 10024 · support@getmeddyhealth.com",
        "For questions about your medical records or health information, contact Sameer Aggarwal Medical PLLC at support@getmeddyhealth.com or 516-925-3997.",
      ],
    },
  ],
};
