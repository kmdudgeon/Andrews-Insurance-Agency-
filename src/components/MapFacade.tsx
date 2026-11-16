"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { agency } from "@/data/agency-config";

/** Lightweight map preview. The Google Maps iframe loads only after the visitor asks for it. */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-navy-50">
      {loaded ? (
        <iframe
          title={`Map showing ${agency.name} at ${agency.address.oneLine}`}
          src={`https://www.google.com/maps?q=${agency.mapsQuery}&output=embed`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <svg aria-hidden="true" className="absolute inset-0 size-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="250" fill="#eef3f8" />
            <g stroke="#fff" strokeWidth="14" fill="none">
              <path d="M-10 90h420M-10 180h420M90-10v270M210-10v270M320-10v270" />
            </g>
            <g stroke="#dbe6f0" strokeWidth="4" fill="none">
              <path d="M-10 40h420M-10 135h420M-10 225h420M40-10v270M150-10v270M265-10v270M365-10v270" />
            </g>
            <path d="M-10 230C80 200 150 240 260 205s120-20 160-30" stroke="#bfd4e6" strokeWidth="10" fill="none" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
            <MapPin size={40} className="text-cta" aria-hidden="true" />
            <p className="font-semibold text-navy-900">{agency.address.oneLine}</p>
            <button type="button" className="btn-outline" onClick={() => setLoaded(true)}>
              Load interactive map
            </button>
          </div>
        </>
      )}
    </div>
  );
}
