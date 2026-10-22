import type { LegalDoc } from "../types";

export const patientTermsOfService: LegalDoc = {
  title: "Patient Terms of Service",
  org: "Sameer Aggarwal Medical PLLC",
  effectiveDate: "October 17, 2026",
  sections: [
    {
      number: 1,
      title: "Who we are and agreement to these terms",
      paragraphs: [
        "These Terms of Service (“Terms”) are an agreement between you and Sameer Aggarwal Medical PLLC (“the Practice,” “we,” “us”), a New York professional limited liability company. They govern your membership plans and your receipt of telehealth medical services from the Practice.",
      ],
      subsections: [
        {
          heading: "Meddy and the Practice.",
          body: "The Practice provides its services through the Meddy website, app, and patient portal. Meddy is a brand owned and operated by Meddy Health LLC (“Meddy”). The two are separate companies:",
        },
      ],
      bullets: [
        "The Practice provides all medical care. Its licensed physicians and other licensed health care professionals, employed or contracted by the Practice (“clinicians”), make all clinical decisions. The Practice owns your medical records, sets and charges membership fees, and is responsible for your care.",
        "Meddy Health LLC owns and operates the Meddy brand, website, app, and technology, and provides administrative services to the Practice, such as scheduling and patient communications. Meddy does not practice medicine, does not provide medical care or advice, and does not employ or supervise the Practice’s clinicians.",
      ],
      trailing: [
        "Your use of the Meddy website and app is also subject to Meddy Health LLC’s Terms of Use and Privacy Policy. If those terms conflict with these Terms on any matter involving your medical care, membership, fees, or medical records, these Terms control.",
        "You accept these Terms by checking “I agree” during enrollment, and we keep a record of the date and time of your acceptance. If you do not agree, do not enroll or use our services. Medical care is also governed by our Telehealth Informed Consent, which you accept separately, and our Notice of Privacy Practices.",
      ],
    },
    {
      number: 2,
      title: "Eligibility and accounts",
      bullets: [
        "You must be at least 18 years old and physically located in New York, or another state where the Practice’s clinicians are licensed and the Practice offers services, at the time of each visit.",
        "You agree to provide accurate, current, and complete information, including your identity, contact details, location, insurance or government health program coverage, and health history, and to keep it updated.",
        "You are responsible for keeping your login credentials private. Tell us right away if you believe your account has been accessed without permission.",
        "Your account is for you only. You may not create an account for someone else or share your account.",
      ],
    },
    {
      number: 3,
      title: "Medical services",
      subsections: [
        {
          heading: "Not for emergencies.",
          body: "Our services are not for medical emergencies or urgent care. If you have an emergency, call 911 or go to the nearest emergency room. If you are in crisis or thinking about harming yourself, call or text 988.",
        },
        {
          heading: "Provider-patient relationship.",
          body: "A provider-patient relationship with the Practice begins at your first visit with a Practice clinician, including a free consultation, after you accept the Telehealth Informed Consent. Using the Meddy website or app does not by itself create a provider-patient relationship, and no provider-patient relationship exists between you and Meddy Health LLC.",
        },
        {
          heading: "Free consultations.",
          body: "Where offered, a free consultation is a video visit with a Practice clinician. It does not require you to become a member, and the clinician decides what care, if any, is appropriate for you. Free consultations may not be available to people whose care is billed to Medicare or another government health program (see Section 5).",
        },
        {
          heading: "Professional judgment.",
          body: "Your clinician decides what care is appropriate, including whether telehealth is suitable, whether to order tests, and whether to prescribe medication. A membership does not guarantee any particular test, prescription, or outcome. The Practice does not prescribe controlled substances or weight-loss medications, including GLP-1 medications.",
        },
        {
          heading: "Nutrition, fitness, and wellness guidance",
          body: "is tailored to your health. It is not a substitute for in-person care when your clinician recommends it. Exercise and nutrition changes carry risks, including injury; follow your plan as written, and stop and seek care if you experience concerning symptoms.",
        },
        {
          heading: "Referrals.",
          body: "If you need in-person care, specialty care, or services we do not provide, your clinician will refer you. Costs of outside care are your responsibility, subject to your insurance coverage.",
        },
      ],
    },
    {
      number: 4,
      title: "Membership plans, billing, and cancellation",
      subsections: [
        {
          heading: "Who charges you.",
          body: "Memberships and medical services are sold by the Practice. All fees are charged by and paid to the Practice through its own payment processor account. Meddy Health LLC provides the technology you use to enroll and manage your membership, but it does not sell medical services, set prices, or receive your payments.",
        },
        {
          heading: "Plans.",
          body: "We offer monthly membership plans. The services included in each plan and its price, which may differ depending on how you pay for your care (see Section 5), are shown when you enroll. Services outside your plan, outside laboratory fees, pharmacy costs, and in-person care are not included unless your plan says so.",
        },
        {
          heading: "Automatic renewal.",
          body: "Your membership renews automatically each month, and we charge your payment method on file at the start of each billing period, until you cancel. These renewal terms are shown next to the “I agree” box at enrollment, and you will receive an email confirming your plan, price, renewal terms, and how to cancel. We will notify you before any price change takes effect.",
        },
        {
          heading: "How to cancel.",
          body: "You can cancel at any time online through the patient app or portal, by emailing support@getmeddyhealth.com, or by calling 516-925-3997. Cancellation takes effect at the end of your current billing period, and you will not be charged again.",
        },
        {
          heading: "Refunds.",
          body: "Monthly fees are not refundable for partial months, except where required by law. If the Practice becomes unable to provide the services included in your plan, we will refund prepaid fees for services not provided.",
        },
        {
          heading: "Price changes.",
          body: "We may change plan prices with at least 30 days’ notice. If you do not agree, you may cancel before the change takes effect.",
        },
        {
          heading: "Failed payments.",
          body: "If a payment fails, we may pause non-urgent membership features until payment is updated. We will not abandon your care; see Section 11.",
        },
      ],
    },
    {
      number: 5,
      title: "Insurance, Medicare, and other payers",
      subsections: [
        {
          heading: "Accepted payers.",
          body: "The Practice accepts the insurance plans and government health programs listed on our website, and we update that list as we add plans. If your plan is not listed, you may pay for your care yourself where the law and your plan allow, and we will give you a receipt you can submit to your insurer.",
        },
        {
          heading: "How billing works.",
          body: "If your care is billed to your insurance, Medicare, or another payer:",
          bullets: [
            "the Practice bills your payer for covered services through a claims clearinghouse;",
            "you pay the copays, deductibles, and coinsurance your plan requires, which we do not routinely waive;",
            "your membership fee, if you choose a membership, pays only for features and services your plan does not cover, such as app features, and never for a service billed to your plan;",
            "you can receive covered care from the Practice without buying a membership; and",
            "the membership prices and plan details that apply to your coverage are shown when you enroll.",
          ],
        },
        {
          heading: "Medicare, Medicaid, and other government programs.",
          body: "If you are enrolled in Medicare, Medicaid, or another government health program, tell us when you enroll. Where the Practice participates in your program, we bill it for covered services as the law requires, and we will not charge you for covered services beyond the cost-sharing your program allows. Where the Practice does not yet participate in your program, we may not be able to provide services to you.",
        },
        {
          heading: "Services your plan may not cover.",
          body: "Before providing a service your plan is not expected to cover, we will tell you, get your agreement, and give you any notice your program requires, such as Medicare’s Advance Beneficiary Notice.",
        },
        {
          heading: "Coverage decisions",
          body: "are made by your payer, not the Practice. Please check your benefits before your visit.",
        },
      ],
    },
    {
      number: 6,
      title: "Scheduling, messaging, and communications",
      subsections: [
        {
          heading: "Scheduling.",
          body: "Appointments are scheduled through the Meddy app, portal, or website. Meddy Health LLC manages scheduling and appointment reminders on the Practice’s behalf. Clinical decisions about your care, including the type and timing of visits you need, are made only by Practice clinicians.",
        },
        {
          heading: "Secure messaging.",
          body: "You can message your care team through the patient app or portal at any time. Administrative staff, including Meddy staff and Meddy’s automated assistant acting on the Practice’s behalf, may read messages to answer non-clinical questions (such as scheduling, account, and membership questions) and to route clinical questions to a Practice clinician. Administrative staff and the automated assistant do not give medical advice; all clinical questions are answered by a Practice clinician. Messages are not monitored continuously. We respond within 1 to 2 business days, depending on your plan, as shown when you enroll. Do not use messaging for urgent or emergency concerns.",
        },
        {
          heading: "Phone calls.",
          body: "Calls to 516-925-3997 may be answered by Meddy’s automated assistant, which uses artificial intelligence, on the Practice’s behalf. It will tell you at the start of each call that you are speaking with an automated assistant and that the call is recorded and transcribed. By continuing the call, you agree to the recording and transcription. The assistant can help with scheduling, account, and membership questions, takes messages for your care team, and sends clinical questions to a Practice clinician. It does not give medical advice. Recordings, transcripts, and voicemails are kept with your records. Do not use the phone line for emergencies; call 911.",
        },
        {
          heading: "Account emails.",
          body: "We send emails needed for your membership and care, such as receipts, renewal and price-change notices, security alerts, and appointment confirmations.",
        },
        {
          heading: "Text messages and reminders.",
          body: "If you opt in, the Practice, and Meddy Health LLC on the Practice’s behalf, will send appointment reminders and account updates by text and email. Message frequency varies. Message and data rates may apply. Reply STOP to opt out of text messages or HELP for help, or update your preferences in the app or portal. Consent to text messages is not required to receive care. We never share your mobile number for marketing, and we will not send marketing messages without your separate consent.",
        },
        {
          body: "Standard email and text messages are not encrypted and could be read by others, for example if they are intercepted or sent to a shared device. For that reason, we use them only for appointment, account, billing, and other non-clinical information, and we send detailed health information only through the secure patient app or portal. By opting in to texts, and by giving us your email for account messages, you agree to receive these messages despite that risk. You can ask us to stop optional messages at any time.",
        },
      ],
    },
    {
      number: 7,
      title: "Your responsibilities",
      bulletIntro: "You agree to:",
      bullets: [
        "Give accurate information about your health, medications, location, and insurance coverage at every visit.",
        "Follow your care plan, or tell your clinician if you cannot or choose not to.",
        "Seek in-person or emergency care when your clinician recommends it or your symptoms require it.",
        "Attend scheduled visits or cancel at least 24 hours in advance.",
        "Treat the Practice’s clinicians and staff, and Meddy staff, with respect.",
      ],
      trailing:
        "You agree not to misuse our services, including by giving false identity or coverage information, obtaining medication for someone else, recording visits without written consent, attempting to access other patients’ information, or interfering with the security of our systems.",
    },
    {
      number: 8,
      title: "Privacy",
      paragraphs: [
        "We protect your health information as required by HIPAA and New York law. Our Notice of Privacy Practices explains how we use and share your medical information and your rights. We do not sell your health information.",
        "Meddy Health LLC is the Practice’s business associate under HIPAA. It receives and maintains your health information only to provide technology and administrative services to the Practice, under a Business Associate Agreement that requires it to protect your information and limits how it may be used. Health information you share when you request a consultation is covered by our Notice of Privacy Practices from the moment you share it. General website data and account details unrelated to your care are covered by Meddy Health LLC’s Privacy Policy.",
      ],
    },
    {
      number: 9,
      title: "Meddy website, app, and platform",
      paragraphs: [
        "The Meddy website, app, patient portal, electronic health record, and brand are owned and operated by Meddy Health LLC, which licenses them to the Practice. Meddy Health LLC and the Practice are both owned by Dr. Sameer Aggarwal. Video visits take place through Google Meet. Meddy may update or change these platforms. Services may occasionally be unavailable due to maintenance or technical problems; we will reschedule affected visits.",
        "The Meddy name, logos, website, app, and general educational materials belong to Meddy Health LLC or its licensors. Your medical records and the clinical content of your care belong to the Practice, and you have the rights to your records described in our Notice of Privacy Practices. You may use the website, app, and materials for your personal health care only, and may not copy, sell, or redistribute them.",
      ],
    },
    {
      number: 10,
      title: "Disclaimers and limitation of liability",
      subsections: [
        {
          heading: "Professional medical care is not limited.",
          body: "Nothing in these Terms limits the Practice’s or its clinicians’ responsibility for the professional medical care you receive, or any rights you have that cannot be waived under applicable law.",
        },
        {
          heading: "App features.",
          body: "Tracking, scores, trends, and analyses in the patient app are informational tools that support, but do not replace, your clinician’s clinical judgment. Readings from consumer devices may be inaccurate.",
        },
        {
          heading: "Artificial intelligence.",
          body: "We use artificial intelligence tools, under Business Associate Agreements, to help with tasks such as answering calls, transcribing conversations, summarizing messages, and drafting notes or replies. Your clinician reviews AI-assisted clinical work before relying on it, and artificial intelligence does not make decisions about your care. Our vendors may not use your information to train their artificial intelligence models. Meddy may use information that has been de-identified, so that it can no longer identify you, to improve its services, including to develop artificial intelligence models, as HIPAA permits.",
        },
        {
          heading: "Website and educational content.",
          body: "The website, app, and general educational content are provided “as is.” General educational content is for information only and is not medical advice for your specific situation.",
        },
        {
          heading: "Non-clinical claims.",
          body: "To the extent permitted by law, the Practice is not liable for any indirect, incidental, special, or consequential damages, including lost profits or income, arising from non-clinical matters such as the website, patient app, billing, scheduling, or service interruptions, delays, or technical failures. The Practice’s total liability for such matters is limited to the membership fees you paid in the 12 months before the claim arose.",
        },
      ],
    },
    {
      number: 11,
      title: "Ending the relationship",
      paragraphs: [
        "You may end your membership and care with the Practice at any time by canceling as described in Section 4.",
        "The Practice may end the relationship if, for example, telehealth is no longer appropriate for your care, you are no longer located in a state where the Practice’s clinicians are licensed, payment is not made, or these Terms are seriously violated. If we do, we will give you written notice, continue to be available for prescription refills and non-urgent clinical questions for 30 days while you find another provider, help with referrals, and provide copies of your medical records on request.",
        "Your medical records are kept by the Practice as required by law after your membership ends, including if the Practice stops using the Meddy platform.",
      ],
    },
    {
      number: 12,
      title: "Governing law, disputes, changes, and contact",
      subsections: [
        {
          heading: "Governing law and disputes.",
          body: "These Terms are governed by New York law. Before filing any legal action, you and the Practice agree to try to resolve the dispute through good-faith mediation. Any legal action will be brought in the state or federal courts located in New York County, New York.",
        },
        {
          heading: "Concerns.",
          body: "If you have a concern, please contact us first at support@getmeddyhealth.com or 516-925-3997 so we can try to resolve it. You may also contact the New York State Office of Professional Medical Conduct.",
        },
        {
          heading: "Changes.",
          body: "We may update these Terms. We will notify you of material changes at least 30 days before they take effect, and you will be asked to accept material changes in the app before continuing to use our services.",
        },
        {
          heading: "Other terms.",
          body: "If any part of these Terms is found unenforceable, the rest remains in effect. These Terms, the Telehealth Informed Consent, and our Notice of Privacy Practices are the entire agreement between you and the Practice about our medical services.",
        },
      ],
      trailing: [
        "Contact:",
        "Sameer Aggarwal Medical PLLC, 307 W 38th St 16th Floor # 255 New York, NY 10018 · support@getmeddyhealth.com · 516-925-3997",
      ],
    },
  ],
};
