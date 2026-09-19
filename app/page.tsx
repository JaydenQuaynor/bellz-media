import CaseStudies from "@/components/CaseStudies";
import { FinalCta, Footer, Founding } from "@/components/Closing";
import Comparison from "@/components/Comparison";
import Creators from "@/components/Creators";
import Hero from "@/components/Hero";
import Mechanism from "@/components/Mechanism";
import Objections from "@/components/Objections";
import Packages from "@/components/Packages";
import Problem from "@/components/Problem";
import Process from "@/components/Process";
import Services from "@/components/Services";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";
import StickyCta from "@/components/StickyCta";
import { ACCOUNT } from "@/lib/reels";

const PROOF = [
  {
    v: ACCOUNT.totalViewsLabel,
    l: "organic views",
    s: `across ${ACCOUNT.reelCount} reels`,
  },
  {
    v: String(ACCOUNT.over400k),
    l: "past 400K",
    s: `${ACCOUNT.over1m} of them past 1M`,
  },
  { v: ACCOUNT.totalLikesLabel, l: "likes", s: "no paid promotion" },
  {
    v: ACCOUNT.localViewsLabel,
    l: "Connecticut views",
    s: `${ACCOUNT.localReels} local reels`,
  },
];

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <ScrollReveal />
      <main className="flex flex-col">
        <Hero />

        {/* Proof strip */}
        <section
          aria-label="Performance to date"
          className="border-b border-rule bg-card px-5 py-10 md:px-8 md:py-14"
        >
          <div className="mx-auto w-full max-w-[1500px]">
            <p className="mb-8 max-w-[56ch] font-mono text-[10px] uppercase leading-[1.7] tracking-[0.14em] text-mute md:text-[11px]">
              Every figure below is pulled from the account, {ACCOUNT.windowLabel}.
              Nothing here is an estimate.
            </p>
            <dl data-reveal="group" className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
              {PROOF.map((p) => (
                <div key={p.l} className="flex flex-col gap-1.5">
                  <dt className="font-display text-[clamp(2.1rem,5.5vw,3.4rem)] font-black leading-[0.9] tracking-[-0.045em] tabular">
                    {p.v}
                  </dt>
                  <dd className="flex flex-col gap-0.5">
                    <span className="font-display text-[14px] font-semibold tracking-[-0.01em]">
                      {p.l}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mute">
                      {p.s}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Problem />
        <Mechanism />
        <CaseStudies />
        <Services />
        <Process />
        <Comparison />
        <Packages />
        <Objections />
        <Founding />
        <FinalCta />
        <Creators />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
