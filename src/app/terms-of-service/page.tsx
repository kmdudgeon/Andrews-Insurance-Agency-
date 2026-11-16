import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { agency, legal } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";

const title = "Terms of Service";
const description =
  "Terms of use for the Andrews Insurance Agency website, including non-binding coverage disclaimers and limits on the use of website information.";
const path = "/terms-of-service";

export const metadata: Metadata = pageMetadata({ title, description, path });

export default function TermsPage() {
  return (
    <LegalPage path={path} title={title} description={description} updated="November 2026">
      <p>
        These terms govern your use of the {agency.name} website. By using this site, you agree to
        them. If you do not agree, please do not use the site.
      </p>

      <h2>No coverage is bound through this website</h2>
      <p>{legal.nonBinding}</p>

      <h2>Information is general, not a policy</h2>
      <p>{legal.informational}</p>
      <p>
        Quotes are estimates based on the information you provide and are subject to change after
        carrier underwriting review. Coverage availability, discounts and eligibility vary by
        carrier and state. Your policy documents are the only source for the terms of your coverage.
      </p>

      <h2>Not legal, tax or financial advice</h2>
      <p>
        Articles, calculators and other educational content on this site, including the life
        insurance needs estimator, are provided for general information only. They are not legal,
        tax or financial advice. Consult a licensed professional about your specific situation.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Provide accurate and complete information when requesting quotes or service.</li>
        <li>
          Do not submit Social Security numbers, driver&apos;s license numbers, payment card numbers
          or medical records through website forms.
        </li>
        <li>Do not misuse the site, attempt to disrupt it, or access it by automated means that harm its operation.</li>
      </ul>

      <h2>Communications</h2>
      <p>
        If you give consent on a form, we may contact you by phone, text message and email as
        described in that consent. Message and data rates may apply. Reply STOP to opt out of text
        messages at any time. See our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>Third-party links</h2>
      <p>
        This site links to websites operated by insurance carriers and other third parties for your
        convenience. We do not control those sites and are not responsible for their content,
        security or privacy practices.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content of this site is owned by {agency.name} or its licensors. Carrier names and logos
        belong to their respective owners. You may view and print pages for personal use.
      </p>

      <h2>Disclaimer of warranties and limitation of liability</h2>
      <p>
        This website is provided &quot;as is&quot; without warranties of any kind. To the fullest
        extent permitted by law, {agency.name} is not liable for damages arising from your use of,
        or inability to use, the site or from reliance on its general information. Nothing in these
        terms limits rights you have under an issued insurance policy or under applicable law.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Indiana.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Call <a href={agency.phone.href}>{agency.phone.display}</a> or
        email <a href={`mailto:${agency.email}`}>{agency.email}</a>.
      </p>
    </LegalPage>
  );
}
