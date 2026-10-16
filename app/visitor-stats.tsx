"use client";

import { useEffect, useState } from "react";

const site = "haner-liveinlove.github.io";
const badgeQuery = new URLSearchParams({
  path: site,
  label: "Visits",
  labelColor: "#5f5d57",
  countColor: "#a85300",
  style: "flat",
});
const badgeImage = `https://api.visitorbadge.io/api/combined?${badgeQuery}`;
const badgeDashboard = `https://visitorbadge.io/status?path=${site}`;

// A public counter ID, never the private management key.
const flagCounterId = "ionep5cv";

export default function VisitorStats() {
  const [enabled, setEnabled] = useState(false);
  const [badgeFailed, setBadgeFailed] = useState(false);

  useEffect(() => {
    const privacy = navigator as Navigator & { globalPrivacyControl?: boolean };
    setEnabled(
      window.location.hostname.toLowerCase() === site &&
      navigator.doNotTrack !== "1" &&
      privacy.globalPrivacyControl !== true,
    );
  }, []);

  return (
    <div className="visitor-stats" aria-label="Visitor statistics">
      <a
        className="visitor-badge"
        href={badgeDashboard}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visits — today and total; open visitor statistics"
      >
        {enabled && !badgeFailed ? (
          // Direct image requests identify the visitor correctly; do not proxy,
          // poll, or split this into two counting images for the same page view.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={badgeImage}
            alt="Visits"
            height={24}
            loading="eager"
            decoding="async"
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => setBadgeFailed(true)}
          />
        ) : (
          <span className="visitor-badge-placeholder">
            <span>Visits</span>
            <span>{badgeFailed ? "Unavailable" : "— / —"}</span>
          </span>
        )}
      </a>

      {enabled && (
        // Load once to record the visit, without a visible or focusable widget.
        // Eager loading is required because this image never enters the viewport.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://liveflagcounter.com/c/${flagCounterId}.svg`}
          alt=""
          aria-hidden="true"
          hidden
          width={1}
          height={1}
          loading="eager"
          decoding="async"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}
