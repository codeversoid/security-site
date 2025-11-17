export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Perusahaan Keamanan Profesional",
    url: "https://example.com",
    telephone: "+6281234567890",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Contoh No. 123",
      addressLocality: "Jakarta",
      postalCode: "10110",
      addressCountry: "ID",
    },
    sameAs: ["https://www.instagram.com/contosecurity"],
    openingHours: "Mo-Fr 09:00-17:00",
  };
}