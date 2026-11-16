import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { agency } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";

const title = "Privacy Policy";
const description =
  "How Andrews Insurance Agency collects, uses, protects and shares personal information, including our Gramm-Leach-Bliley Act (GLBA) privacy notice.";
const path = "/privacy-policy";

export const metadata: Metadata = pageMetadata({ title, description, path });

export default function PrivacyPolicyPage() {
  return (
    <LegalPage path={path} title={title} description={description} updated="November 2026">
      <p>
        {agency.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
        This policy explains what information we collect through this website and in the course of
        providing insurance services, how we use and protect it, and the choices you have. It
        includes the privacy notice we provide under the federal Gramm-Leach-Bliley Act (GLBA) and
        applicable Indiana insurance privacy regulations.
      </p>

      <h2>Information we collect</h2>
      <p>We collect nonpublic personal information (NPI) from the following sources:</p>
      <ul>
        <li>
          <strong>Information you give us</strong> on quote, appointment and service request forms
          or by phone and email, such as your name, contact details, address, and general details
          about the vehicles, property, household or business you want to insure.
        </li>
        <li>
          <strong>Information about your transactions</strong> with us and with insurance carriers,
          such as policy coverage, premiums and claims history.
        </li>
        <li>
          <strong>Information from third parties</strong> where permitted by law and required for
          underwriting, such as motor vehicle or claims reports obtained by a carrier.
        </li>
        <li>
          <strong>Website usage information</strong>, such as pages visited and referring campaign
          tags, collected through privacy-friendly analytics that do not identify you personally.
        </li>
      </ul>

      <h2>Information we do not collect online</h2>
      <p>
        Our website forms never ask for Social Security numbers, driver&apos;s license numbers,
        payment card numbers or detailed medical histories. When that information is required to
        complete an application, we collect it by phone, in person or through a carrier&apos;s
        secure portal. Please do not send it through website forms or email.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To prepare insurance quotes and recommend coverage</li>
        <li>To submit applications to, and service policies with, insurance carriers</li>
        <li>To respond to your requests and assist with claims</li>
        <li>To contact you as you have consented, including by phone, text message and email</li>
        <li>To comply with legal and regulatory obligations</li>
      </ul>

      <h2>How we share your information</h2>
      <p>
        We share nonpublic personal information only as permitted or required by law, and only as
        needed to serve you:
      </p>
      <ul>
        <li>
          <strong>Insurance carriers and their underwriting partners</strong>, to obtain quotes,
          place coverage and service your policies.
        </li>
        <li>
          <strong>Service providers</strong> that support our operations, such as secure data
          hosting, under obligations to protect your information and use it only for our purposes.
        </li>
        <li>
          <strong>Regulators, courts and law enforcement</strong> when required by law.
        </li>
      </ul>
      <p>
        <strong>
          We never sell your personal information, and we never share it with third-party lead
          aggregators or unaffiliated companies for their own marketing.
        </strong>{" "}
        Because we do not share your information outside the exceptions permitted by GLBA, no
        opt-out is necessary.
      </p>

      <h2>How we protect your information</h2>
      <p>
        We maintain physical, electronic and procedural safeguards designed to protect nonpublic
        personal information. Website submissions are encrypted in transit, stored in a database
        with strict row-level access controls, and available only to authorized agency personnel
        who need the information to serve you.
      </p>

      <h2>Communications consent</h2>
      <p>
        When you submit a quote or appointment request, you may give express written consent to be
        contacted by phone, text message and email. We record the consent language you agreed to and
        when you agreed. Consent is not a condition of purchase, and you may revoke it at any time
        by replying STOP to a text message, calling {agency.phone.display}, or emailing{" "}
        <a href={`mailto:${agency.email}`}>{agency.email}</a>.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This site does not use advertising cookies. Your progress in the quote form is saved in your
        browser&apos;s session storage so you do not lose your work, and it is cleared when you
        submit the form or close the tab. We use aggregate analytics to understand site performance.
      </p>

      <h2>Your rights and choices</h2>
      <p>
        You may ask to review, correct or delete the personal information we hold about you, subject
        to legal and carrier record-keeping requirements. Contact us using the details below.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This website is intended for adults. We do not knowingly collect information online from
        children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of the page shows when it
        was last revised. Current clients receive privacy notices as required by law.
      </p>

      <h2>Contact us</h2>
      <p>
        {agency.name}
        <br />
        {agency.address.street}, {agency.address.city}, {agency.address.state} {agency.address.zip}
        <br />
        <a href={agency.phone.href}>{agency.phone.display}</a> ·{" "}
        <a href={`mailto:${agency.email}`}>{agency.email}</a>
      </p>
      <p>
        See also our <Link href="/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/disclaimers">Licensing &amp; Disclaimers</Link>.
      </p>
    </LegalPage>
  );
}
