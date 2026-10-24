import type { LegalDoc } from "../types";

export const cookiePolicy: LegalDoc = {
  title: "Cookie Policy",
  org: "Meddy Health LLC",
  effectiveDate: "October 23, 2026",
  sections: [
    {
      title: "About this policy",
      paragraphs: [
        "This Cookie Policy explains how Meddy Health LLC (“we,” “us”) uses cookies and similar technologies on getmeddyhealth.com. It describes what we use, why, and how you can control it. Please read it together with our Privacy Policy.",
      ],
    },
    {
      title: "What cookies are",
      paragraphs: [
        "Cookies are small text files a website stores on your browser or device. They let the site remember things, such as your settings, and help us understand how the site is used. In this policy, “cookies” also covers similar technologies, such as tags, pixels and scripts that collect information about your visit.",
      ],
    },
    {
      title: "How we use cookies",
      paragraphs: [
        "We only set strictly necessary cookies unless you agree to more. Optional cookies stay off until you turn them on.",
      ],
      bullets: [
        {
          lead: "Strictly necessary (always on).",
          text: "These keep the site working and secure, and remember your cookie choices. The site can't function properly without them, so they can't be switched off.",
        },
        {
          lead: "Analytics (off unless you agree).",
          text: "These help us understand how visitors use the site, such as which pages are viewed, how people move between them, and where they run into problems. We use this to fix issues and improve the site. Our analytics provider is Contentsquare.",
        },
        {
          lead: "Marketing (off unless you agree).",
          text: "These help us measure how our ads perform and show relevant ads on other websites and apps. Our marketing providers are Meta and Google Ads, which may also use the information under their own privacy policies.",
        },
      ],
      trailing:
        "We use Google Tag Manager to load these tools on our site. Google Tag Manager does not set cookies itself; it only loads the tools listed in this policy, in line with your choices.",
    },
    {
      title: "Health-related pages",
      paragraphs: [
        "We do not run analytics or marketing cookies, pixels or tags on our medication or weight-management pages, even if you have accepted them. Visits to those pages are not shared with Contentsquare, Meta or Google.",
        "Only strictly necessary cookies, such as the one that remembers your cookie choices, may be present on those pages.",
      ],
    },
    {
      title: "Your choices",
      paragraphs: [
        "You decide which optional cookies we use, and you can change your mind at any time.",
      ],
      bullets: [
        {
          lead: "Cookie banner.",
          text: "On your first visit, you can choose Accept all, Reject all, or Manage settings to pick by category.",
        },
        {
          lead: "Cookie settings link.",
          text: "Select “Cookie settings” in the footer of any page to review or change your choice. Changes apply from that point on.",
        },
        {
          lead: "Your browser.",
          text: "Most browsers let you block or delete cookies. Blocking strictly necessary cookies may stop parts of the site from working.",
        },
      ],
      trailing:
        "Your choice is stored in a cookie on your browser and device. If you clear your cookies or use a different browser or device, we will ask again.",
    },
    {
      title: "Cookies we use",
      paragraphs: [
        "The table below lists the cookies on our site. Durations are approximate; a cookie is renewed when you return to the site.",
      ],
      table: {
        headers: ["Cookie name", "Provider", "Category", "Purpose", "Duration"],
        rows: [
          [
            "[consent cookie name]",
            "Meddy Health",
            "Strictly necessary",
            "Remembers your cookie choices",
            "12 months",
          ],
          [
            "_cs_id",
            "Contentsquare",
            "Analytics",
            "Recognizes a returning visitor so visits can be measured over time",
            "13 months",
          ],
          [
            "_cs_s",
            "Contentsquare",
            "Analytics",
            "Counts the pages viewed in the current visit",
            "30 minutes",
          ],
          [
            "_cs_c",
            "Contentsquare",
            "Analytics",
            "Stores your consent choice for Contentsquare",
            "13 months",
          ],
          [
            "_gcl_au",
            "Google Ads",
            "Marketing",
            "Links ad clicks to actions on our site to measure how our ads perform",
            "90 days",
          ],
          [
            "_gcl_aw",
            "Google Ads",
            "Marketing",
            "Stores the ad click ID when you arrive from a Google ad",
            "90 days",
          ],
          [
            "_fbp",
            "Meta",
            "Marketing",
            "Identifies your browser so we can measure and improve our Meta ads",
            "90 days",
          ],
          [
            "_fbc",
            "Meta",
            "Marketing",
            "Stores the ad click ID when you arrive from a Meta ad",
            "90 days",
          ],
          [
            "fr",
            "Meta (set on facebook.com)",
            "Marketing",
            "Used by Meta to deliver, measure and improve ads",
            "90 days",
          ],
        ],
      },
    },
    {
      title: "Changes to this policy",
      paragraphs: [
        "We may update this policy when we change the cookies we use or when the law requires it. We will post the new version here and update the date at the top. If we add a new category of optional cookies, we will ask for your consent again.",
      ],
    },
    {
      title: "Contact us",
      paragraphs: [
        "If you have questions about this policy or how we use cookies, contact us at support@getmeddyhealth.com or Meddy Health LLC, 2248 Broadway #1071, New York, NY 10024.",
      ],
    },
  ],
};
