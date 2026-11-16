import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { agency } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";

const title = "Accessibility Statement";
const description =
  "Andrews Insurance Agency is committed to a website that everyone can use. Learn about our WCAG 2.1 Level AA accessibility practices and how to request help.";
const path = "/accessibility";

export const metadata: Metadata = pageMetadata({ title, description, path });

export default function AccessibilityPage() {
  return (
    <LegalPage path={path} title={title} description={description} updated="November 2026">
      <p>
        {agency.name} wants everyone to be able to use this website, including people who rely on
        assistive technology. We designed and built the site with the goal of conforming to the Web
        Content Accessibility Guidelines (WCAG) 2.1 at Level AA.
      </p>

      <h2>What we have done</h2>
      <ul>
        <li>Semantic page structure with headings, landmarks and a &quot;Skip to main content&quot; link</li>
        <li>Full keyboard operation for menus, forms, accordions and calculators, with visible focus indicators</li>
        <li>Text and controls that meet or exceed 4.5:1 color contrast</li>
        <li>Labels, instructions and clearly described error messages on every form field</li>
        <li>Layouts that reflow on small screens and when text is enlarged, with large touch targets</li>
        <li>Respect for the reduced-motion setting on your device</li>
      </ul>

      <h2>Need help or found a problem?</h2>
      <p>
        If you have trouble using any part of this site, or would prefer to request a quote or
        service another way, we are glad to help by phone, email or in person:
      </p>
      <ul>
        <li>
          Phone: <a href={agency.phone.href}>{agency.phone.display}</a> ({agency.hours.summary})
        </li>
        <li>
          Email: <a href={`mailto:${agency.email}`}>{agency.email}</a>
        </li>
        <li>Office: {agency.address.oneLine}</li>
      </ul>
      <p>
        Please tell us the page you were on and what happened. We aim to respond within two business
        days and to correct confirmed accessibility issues promptly.
      </p>

      <h2>Third-party content</h2>
      <p>
        Some links lead to websites run by insurance carriers or government agencies. We cannot
        control the accessibility of those sites, but we will help you complete any task you cannot
        finish there.
      </p>
    </LegalPage>
  );
}
