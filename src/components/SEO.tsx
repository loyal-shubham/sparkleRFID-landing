import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  routePath?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage = "https://cdn.prod.website-files.com/69fb53371d5b8e9c3f4e4c69/6a1c669055af9680ca67da10_Ciao-energy_meta-img.jpg",
  routePath
}) => {
  // Track page views automatically on component mounting/change
  useEffect(() => {
    // Dynamically log page transitions to window.gtag if it exists
    const path = routePath || window.location.hash || "/";
    
    // Console log for local verification
    console.log(`[Google Analytics Pageview]: Tracking Route: "${path}" - Title: "${title}"`);
    
    // Call Google Analytics if scripts loaded
    const windowWithGtag = window as any;
    if (typeof windowWithGtag.gtag === "function") {
      windowWithGtag.gtag("event", "page_view", {
        page_title: title,
        page_path: path,
        send_to: "G-XXXXXXXXXX"
      });
    }
  }, [title, routePath]);

  return (
    <>
      {/* React 19 automatically hoists title, meta, and link tags from here directly to the document head */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
};
