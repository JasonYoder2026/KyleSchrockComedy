import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="bg-[#f5f1e8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-neutral-600">
              About Kyle
            </p>
            <h1 className="text-5xl font-black tracking-tight text-black md:text-7xl">
              The funny part of everyday life.
            </h1>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
              <p>
                Kyle Schrock is a certified auto mechanic, full-time college
                professor, and part-time comedian — though depending on the day,
                those roles occasionally blend together.
              </p>

              <p>
                After years of fixing engines and grading papers, Kyle decided to
                try fixing something even more unpredictable: a room full of
                strangers. Just over a year ago he dove into comedy, winning the
                Funny Over 40 contest at the Underground Laugh Lounge in Niles,
                Michigan.
              </p>

              <p>
                Kyle&apos;s comedy draws from everyday life — marriage, parenting,
                adventure, and the constant balancing act of adulthood. Whether
                he&apos;s comparing family life to a diagnostic nightmare or
                reflecting on the humor hidden inside life&apos;s chaos, his goal is
                simple: make life&apos;s struggles a little lighter and a lot more
                entertaining.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -right-4 -top-4 h-full w-full border-2 border-black md:-right-6 md:-top-6" />
              <div className="relative overflow-hidden bg-neutral-300 shadow-[10px_10px_0_#dfe490]">
                <Image
                  src="/about.png"
                  alt="Kyle Schrock"
                  width={600}
                  height={700}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black bg-[#dfe490] px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-left">
          <p className="text-lg font-bold text-black">
            More stories. More laughs. More room for real life.
          </p>
          <Link
            href="/contact"
            className="shrink-0 font-bold text-black underline underline-offset-4 hover:no-underline"
          >
            Book Kyle <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
