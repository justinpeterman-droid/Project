import { site, services, faqs, contact, images } from "../data/site";

const businessId = `${site.url}/#business`;

export function buildPageJsonLd() {
  const heroImage = new URL(`${images.hero.base}.jpg`, site.url).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": businessId,
        name: site.name,
        description: site.seo.description,
        url: site.url,
        image: heroImage,
        telephone: contact.phoneHref.replace("tel:", ""),
        email: contact.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressRegion: "AR",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "State", name: "Arkansas" },
          { "@type": "Country", name: "United States" },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: site.url,
          servicePhone: contact.phoneHref.replace("tel:", ""),
        },
        founder: { "@id": `${site.url}/#person` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Integrative wellness services",
          itemListElement: services.map((s, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.summary,
              provider: { "@id": businessId },
            },
          })),
        },
        sameAs: [
          "https://www.instagram.com/hometownserenity",
          "https://www.facebook.com/profile.php?id=61583873646491",
          "https://youtube.com/@inkedintegration",
          "https://inkedintegration.substack.com/",
        ],
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.practitioner,
        honorificSuffix: site.credentials,
        jobTitle: "Clinical Hypnotherapist & Behavioral Coach",
        worksFor: { "@id": businessId },
        url: site.url,
        image: new URL(`${images.aboutAshley.base}.jpg`, site.url).toString(),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.seo.description,
        publisher: { "@id": businessId },
      },
    ],
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
