export type OrgSchemaInput = {
  name?: string;
  url?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
  logo?: string;
};

export function organizationSchema(input?: OrgSchemaInput) {
  const name = input?.name || "Perusahaan Keamanan Profesional";
  const url = input?.url || "https://example.com";
  const telephone = input?.telephone || "+6281234567890";
  const addr = input?.address || {};
  const sameAs = Array.isArray(input?.sameAs) ? input!.sameAs! : [];
  const logo = input?.logo;
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: addr.streetAddress || "",
      addressLocality: addr.addressLocality || "",
      postalCode: addr.postalCode || "",
      addressCountry: addr.addressCountry || "ID",
    },
    sameAs,
    openingHours: "Mo-Fr 09:00-17:00",
  };
  if (logo) out["logo"] = logo;
  return out;
}
