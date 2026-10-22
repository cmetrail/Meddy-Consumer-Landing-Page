import type { LegalDoc } from "../types";

export const telehealthConsent: LegalDoc = {
  title: "Telehealth Informed Consent",
  org: "Sameer Aggarwal Medical PLLC",
  effectiveDate: "October 17, 2026",
  sections: [
    {
      number: 1,
      title: "Introduction",
      paragraphs: [
        "Sameer Aggarwal Medical PLLC (“the Practice”) provides primary care services through telehealth. Telehealth means receiving medical care from a licensed provider using secure video, audio, messaging, and electronic health records, instead of an in-person visit. Your provider is a physician or other licensed health care professional employed or contracted by the Practice.",
        "You access the Practice’s services through the Meddy app, patient portal, and website, which are owned and operated by Meddy Health LLC. All medical care is provided by the Practice, not by Meddy.",
        "This consent applies to every telehealth visit with the Practice, including a free consultation or your first visit. This form explains how telehealth works at the Practice, its benefits and limitations, and your rights. Please read it carefully and ask us any questions before you agree.",
      ],
    },
    {
      number: 2,
      title: "Services, benefits, and limitations",
      subsections: [
        {
          heading: "What we provide.",
          body: "Telehealth primary care focused on weight management, metabolic health, and preventive care, which may include evaluation and treatment of common conditions, prescriptions, laboratory testing, physician-developed nutrition and exercise guidance, and review of health measurements (biomarkers) you log or share from your own devices.",
        },
        {
          heading: "Benefits.",
          body: "Care from home or another private location, less travel and waiting, and easier follow-up.",
        },
        {
          heading: "Limitations and risks.",
          body: "You should understand that:",
          bullets: [
            "Your provider cannot perform a physical examination. Some conditions cannot be fully evaluated without one, which may lead to a delayed or missed diagnosis.",
            "Your provider may decide telehealth is not appropriate for your condition and refer you to in-person care, urgent care, or a specialist.",
            "Technology can fail. A poor connection, equipment problems, or service outages may interrupt or delay your visit.",
            "Although we use secure systems covered by Business Associate Agreements, no electronic system is completely secure, and there is a small risk of unauthorized access to your information.",
            "Care depends on the information you provide being complete and accurate.",
            "Exercise and nutrition changes carry risks, including injury, low blood sugar, dizziness, or worsening of existing conditions. Follow your plan as written, progress gradually, and stop and seek care if you experience chest pain, shortness of breath, fainting, or other concerning symptoms. Tell us about any injuries, conditions, or limitations before starting a new plan.",
          ],
        },
      ],
    },
    {
      number: 3,
      title: "Emergencies",
      paragraphs: [
        "Telehealth is not for emergencies. If you have a medical emergency, call 911 or go to the nearest emergency room. Do not use secure messaging, call our phone line, or wait for a scheduled visit.",
        "If you are having thoughts of harming yourself or others, or are in emotional crisis, call or text 988 (Suicide & Crisis Lifeline) or call 911.",
        "At each visit, we will confirm your current physical location and a phone number where you can be reached. If you experience an emergency during a visit, your provider may contact emergency services at your location on your behalf. Please also provide an emergency contact, who we may contact if we believe you are at serious risk.",
        "If a message or call you send describes a possible emergency, our staff or automated assistant will tell you to call 911, or 988 for a mental health crisis, and will alert your provider, but they cannot send help to you. Call 911 yourself.",
      ],
    },
    {
      number: 4,
      title: "Location, licensure, and eligibility",
      paragraphs: [
        "You must be physically located in a state where your provider is licensed at the time of each visit. We will ask you to confirm your location at the start of every visit.",
        "If you are traveling or move to a state where your provider is not licensed, we may not be able to treat you there. Please tell us before scheduling.",
        "Services are for patients age 18 and older.",
      ],
    },
    {
      number: 5,
      title: "Prescriptions, labs, and biomarker results",
      subsections: [
        {
          heading: "Prescriptions.",
          body: "Your provider may prescribe medication when clinically appropriate. The Practice does not prescribe controlled substances or medications for weight loss (including GLP-1 medications). Prescribing is at your provider’s professional judgment and is not guaranteed.",
        },
        {
          heading: "Laboratory testing.",
          body: "Your provider may order lab tests at an outside laboratory. Your provider will review your results and contact you about any that need follow-up. Results may also appear in your patient portal before your provider has reviewed them.",
        },
        {
          heading: "Biomarker tracking.",
          body: "Health measurements you share or that we track are reviewed during scheduled visits and as described in your care plan. They are not monitored continuously or in real time. If you notice concerning symptoms or readings, contact us, and for urgent concerns call 911. Readings from consumer devices (such as smartwatches, rings, and scales) may be inaccurate. App features such as scores, trends, and analyses are informational tools that support, but do not replace, your provider’s clinical judgment.",
        },
      ],
      trailing:
        "Please keep your contact information current and tell us if you have not heard about a result within 7 business days.",
    },
    {
      number: 6,
      title: "Privacy, technology, and communications",
      paragraphs: [
        "Your health information is protected under HIPAA and applicable state law, as described in our Notice of Privacy Practices.",
        "Visits take place through secure video covered by a Business Associate Agreement (currently Google Meet) and the Meddy electronic health record and patient portal. Video visits are not recorded. You agree not to record visits without your provider’s written consent.",
        "Please join visits from a private location, using your own device and a secure internet connection, not public Wi-Fi.",
      ],
      subsections: [
        {
          heading: "Who handles your messages and scheduling.",
          body: "Meddy Health LLC, a company owned by Dr. Aggarwal, provides the patient app and electronic health record and handles administrative services for the Practice, such as scheduling, appointment reminders, patient communications, and the Practice’s phone line, text messages, and support email. It does this under a Business Associate Agreement that requires it to protect your information. Meddy staff and Meddy’s automated assistant may read your messages to answer non-clinical questions, such as scheduling or account questions, and to send clinical questions to your provider. Meddy staff and the automated assistant are not medical providers and do not give medical advice. All medical services are provided by Sameer Aggarwal Medical PLLC.",
        },
        {
          heading: "Phone calls and artificial intelligence.",
          body: "Calls to our phone line (516-925-3997) may be answered by Meddy’s automated assistant, which uses artificial intelligence. It will tell you at the start of each call that you are speaking with an automated assistant and that the call is recorded and transcribed. Unlike video visits, these calls are recorded, and recordings, transcripts, and voicemails are kept with your records. We also use artificial intelligence tools, under Business Associate Agreements, to help transcribe conversations, summarize messages, and draft notes. Your provider reviews AI-assisted clinical work before relying on it, and artificial intelligence does not make decisions about your care. Our vendors may not use your information to train their artificial intelligence models. Meddy may use information that has been de-identified, so that it can no longer identify you, to improve its services, including to develop artificial intelligence models, as HIPAA permits.",
        },
        {
          heading: "Response times.",
          body: "Secure messages are not monitored 24/7. We respond within 1 or 2 business days, depending on your membership plan, as described in our Patient Terms of Service. Do not use messaging for urgent or emergency concerns.",
        },
        {
          heading: "Email and text messages.",
          body: "With your consent, the Practice, or Meddy on its behalf, may send appointment reminders and notifications by email or text message. These contain no clinical details. They are not encrypted and could be read by others, and by consenting to receive them you accept that risk. Message and data rates may apply. Reply STOP to opt out of texts at any time. Consent to texts is not required to receive care. If you text or email us about a health concern, we will reply through the secure patient app and ask you to continue the conversation there.",
        },
      ],
      trailing:
        "If you connect a wearable device, the device maker’s own privacy policy also applies to the data it collects.",
    },
    {
      number: 7,
      title: "Your rights and responsibilities",
      subsections: [
        {
          heading: "Your rights.",
          body: "You may:",
          bullets: [
            "Ask questions about telehealth and your care at any time.",
            "Decline telehealth or withdraw this consent at any time, without affecting your right to future care. If you withdraw, we will help you find in-person care.",
            "Access and request copies of your medical records.",
            "Know who your provider is and their licensure.",
          ],
        },
        {
          heading: "Your responsibilities.",
          body: "You agree to:",
          bullets: [
            "Provide accurate and complete information about your health, medications, location, and insurance or government health program coverage.",
            "Follow your care plan or tell us if you cannot.",
            "Seek in-person or emergency care when your provider recommends it or your symptoms require it.",
            "Keep your portal login private and tell us if you believe it has been compromised.",
          ],
        },
      ],
    },
    {
      number: 8,
      title: "Fees and payment",
      paragraphs: [
        "The Practice offers monthly membership plans, billed in advance each month, as described at enrollment. If you pay for your care yourself, your first consultation is free.",
        "If the Practice accepts your insurance, Medicare, or other government health program, covered services, including your first visit, are billed to your plan, and you pay the copays, deductibles, and coinsurance your plan requires. A membership, if you choose one, covers only features and services your plan does not pay for, and you can receive covered care without one. The plans and payers the Practice accepts are listed on our website.",
        "Laboratory testing may be billed separately by the laboratory or your insurer, unless included in your plan.",
        "All fees are charged by and paid to the Practice through its payment processor. The Practice does not store your card number, and Meddy Health LLC does not receive your payments. You may cancel your membership at any time, effective at the end of the current billing month. Full payment, insurance, cancellation, and refund terms are in our Patient Terms of Service.",
      ],
    },
    {
      number: 9,
      title: "State-specific terms",
      paragraphs: [
        "Some states require additional disclosures or consent steps. If you receive care while located in one of the states below, the terms in the matching addendum also apply.",
      ],
      subsections: [
        {
          heading: "New York addendum",
          body: "If you receive care while located in New York:",
          bullets: [
            "Your consent to telehealth will be documented in your medical record before or during your first telehealth visit.",
            "You can verify your provider’s New York license through the New York State Education Department, Office of the Professions, license verification website.",
            "You may choose not to receive care by telehealth. Alternatives include in-person care with another provider, which may involve travel or delays.",
            "Telehealth visits will not be recorded without your consent.",
            "HIV-related information receives additional confidentiality protections under New York Public Health Law Article 27-F, and will not be disclosed except as that law permits.",
          ],
        },
      ],
    },
    {
      number: 10,
      title: "Questions",
      paragraphs: [
        "Sameer Aggarwal Medical PLLC, 307 W 38th St 16th Floor # 255 New York, NY 10018 · support@getmeddyhealth.com · 516-925-3997",
      ],
    },
    {
      number: 11,
      title: "Acknowledgment and consent",
      bulletIntro: "By signing below, I confirm that:",
      bullets: [
        "I have read this form, or had it read to me, and I understand it.",
        "I have had the opportunity to ask questions, and my questions have been answered.",
        "I understand the benefits, limitations, and risks of telehealth, and that I may withdraw this consent at any time.",
        "I understand telehealth is not for emergencies, and I will call 911 or 988 when needed.",
        "I understand that Meddy Health LLC provides technology and administrative services, and that my medical care is provided by Sameer Aggarwal Medical PLLC.",
        "I understand that calls to the Practice’s phone line may be answered by an automated assistant and are recorded and transcribed, and that email and text messages are not encrypted and are used only for non-clinical information.",
        "I consent to receive telehealth services from Sameer Aggarwal Medical PLLC.",
      ],
      trailing: [
        "This consent remains in effect until I withdraw it in writing. I agree that checking “I agree” or signing electronically has the same effect as a handwritten signature.",
        "Patient name: ______________________________",
        "Date of birth: ______________________________",
        "Signature: ______________________________ Date: ______________",
        "If signed by a legal representative: Name and relationship: ______________________________",
      ],
    },
  ],
};
