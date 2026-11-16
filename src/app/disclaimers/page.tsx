import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { agency, broker, carriers, legal } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";

const title = "Licensing & Disclaimers";
const description =
  "Licensing information for Andrews Insurance Agency and Principal Broker Justin Michael Andrews, plus state availability, Marketplace, Medicare and carrier disclaimers.";
const path = "/disclaimers";

export const metadata: Metadata = pageMetadata({ title, description, path });

export default function DisclaimersPage() {
  return (
    <LegalPage path={path} title={title} description={description} updated="November 2026">
      <h2>Licensing</h2>
      <p>{legal.licensing}</p>
      <ul>
        <li>
          Principal Broker: <strong>{broker.name}</strong>
        </li>
        <li>
          National Producer Number (NPN): <span className="font-mono">#{broker.npn}</span>
        </li>
        <li>
          Nonresident Health License: <span className="font-mono">#{broker.nonresidentHealthLicense}</span>
        </li>
      </ul>
      <p>
        Producer licenses can be verified with the{" "}
        <a href="https://www.in.gov/idoi/" rel="noopener noreferrer">
          Indiana Department of Insurance
        </a>{" "}
        or the{" "}
        <a href="https://nipr.com/help/look-up-a-license" rel="noopener noreferrer">
          National Insurance Producer Registry
        </a>
        .
      </p>

      <h2>State availability</h2>
      <p>
        This website is intended for residents of Indiana and other states in which {agency.name}{" "}
        is licensed. It is not a solicitation of insurance in any state where we are not licensed.
        Products, coverages and discounts are not available in all states or from all carriers.
      </p>

      <h2>Coverage cannot be bound online</h2>
      <p>{legal.nonBinding}</p>

      <h2>General information only</h2>
      <p>{legal.informational}</p>

      <h2>Health Insurance Marketplace</h2>
      <p>{legal.marketplace}</p>

      <h2>Medicare</h2>
      <p>{legal.medicare}</p>

      <h2>Carriers and trademarks</h2>
      <p>
        {agency.name} is an independent agency and is not owned by any insurance company. Insurance
        is underwritten by the issuing carrier, not by {agency.name}. Carrier names referenced on
        this site, including {carriers.map((carrier) => carrier.name).join(" and ")}, are
        trademarks of their respective owners and are used for identification only. Links to carrier
        websites are provided for convenience; those sites are operated by the carriers.
      </p>

      <h2>Reviews and ratings</h2>
      <p>
        Ratings shown on this site reflect publicly posted Google reviews at the time of
        publication. Individual experiences vary, and past results do not guarantee future outcomes.
      </p>
    </LegalPage>
  );
}
