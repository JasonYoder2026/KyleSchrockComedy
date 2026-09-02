import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
type Video = {
  id: string;
  link: string;
};
async function getVideos(): Promise<Video[]> {
  const supabaseUrl = process.env.NEXT_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Missing NEXT_SUPABASE_URL or NEXT_SUPABASE_PUBLISHABLE_KEY",
    );
    return [];
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .schema("public")
    .from("videos")
    .select("id, link");
  if (error) {
    console.error("Unable to load videos from Supabase:", error.message);
    return [];
  }
  return data as Video[];
}

function getYoutubeEmbedUrl(link: string) {
  try {
    const url = new URL(link);
    const hostname = url.hostname.replace("www.", "");
    if (hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
      return videoId ? `https://www.youtube.com/embed/${videoId}` : link;
    }
  } catch {
    return `https://www.youtube.com/embed/${link}`;
  }

  return link;
}
export default async function HomePage() {
  const videos = await getVideos();

  return (
    <>
      <section className="relative overflow-hidden bg-[#f5f1e8] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-neutral-600">
              Stand-up comedian · Goshen, Indiana
            </p>
            <h1 className="max-w-3xl text-6xl font-black leading-[0.92] tracking-tight text-black md:text-8xl">
              Kyle Schrock
            </h1>
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-neutral-700 md:text-2xl">
              Marriage, parenting, and the beautiful mess of everyday life,
              turned into a night you will actually remember.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="rounded-lg bg-[#dfe490] px-7 py-3.5 font-bold text-black transition hover:bg-[#cdd56e]"
              >
                See upcoming shows
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-black px-7 py-3.5 font-bold text-black transition hover:bg-black hover:text-white"
              >
                Book Kyle
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-4 text-sm font-semibold text-neutral-600">
              <span className="h-px w-12 bg-neutral-400" />
              Stories from the garage, classroom, and family room
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-4 -top-4 h-full w-full border-2 border-black md:-right-6 md:-top-6" />
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-300">
              <Image
                src="/about.png"
                alt="Kyle Schrock performing stand-up comedy"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <p className="absolute -bottom-5 -left-5 bg-black px-5 py-3 text-sm font-bold uppercase tracking-wider text-white">
              Live, loud, and slightly over-caffeinated
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-black bg-[#dfe490] px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-left">
          <p className="text-lg font-bold text-black">
            Looking for a comedian who can work the room and the room schedule?
          </p>
          <Link
            href="/contact"
            className="shrink-0 font-bold text-black underline underline-offset-4 hover:no-underline"
          >
            Let&apos;s talk <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
                From the stage
              </p>
              <h2 className="text-4xl font-black tracking-tight text-black md:text-5xl">
                Watch Kyle work it out.
              </h2>
            </div>
            <p className="max-w-sm text-neutral-600">
              A few clips for the curious, the unconvinced, and the person
              choosing tonight&apos;s entertainment.
            </p>
          </div>

          {videos.length === 0 ? (
            <p className="border border-neutral-300 bg-[#f5f1e8] p-8 text-center text-neutral-700">
              New clips are on the way. Check back soon.
            </p>
          ) : (
            <div className="grid gap-7 md:grid-cols-2">
              {videos.map((video, index) => (
                <div key={video.id} className="group">
                  <div className="aspect-video overflow-hidden bg-neutral-900 shadow-[8px_8px_0_#dfe490] transition group-hover:shadow-[4px_4px_0_#dfe490]">
                    <iframe
                      className="h-full w-full"
                      src={getYoutubeEmbedUrl(video.link)}
                      title={`Kyle Schrock comedy clip ${index + 1}`}
                      loading={index > 1 ? "lazy" : "eager"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white md:px-10 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#dfe490]">
              Ready when you are
            </p>
            <h2 className="max-w-2xl text-4xl font-black tracking-tight md:text-5xl">
              Put a little more life in the lineup.
            </h2>
          </div>
          <Link
            href="/events"
            className="rounded-lg bg-white px-7 py-3.5 font-bold text-black transition hover:bg-[#dfe490]"
          >
            Find a show
          </Link>
        </div>
      </section>
    </>
  );
}
// import Link from "next/link";

// const VIDEOS = [
//   { id: "AeSIZixD2BI", title: "Comedy Clip 1" },
//   { id: "_vrq0xzKbm0", title: "Comedy Clip 2" },
//   { id: "5sXa_73j2bc", title: "Comedy Clip 3" },
//   { id: "F6hEzg3rF3I", title: "Comedy Clip 4" },
// ];

// export default function HomePage() {
//   return (
//     <>
//       {/* Hero */}
//       <section className="relative py-20 md:py-28 px-4 overflow-hidden">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-5xl md:text-7xl font-bold text-black tracking-tight">
//             Kyle Schrock
//           </h1>
//           <p className="mt-4 text-xl md:text-2xl font-medium" style={{ color: 'rgba(61, 61, 61, 1)' }}>
//             Stand-up comedian
//           </p>
//           <p className="mt-2 max-w-xl mx-auto" style={{ color: 'rgba(61, 61, 61, 1)' }}>
//             Marriage, parenting, and the chaos of everyday life — served with a laugh.
//           </p>
//           <Link
//             href="/events"
//             className="inline-block mt-8 px-8 py-3 hover:bg-amber-400 text-black font-semibold rounded-lg transition"
//             style={{ backgroundColor: 'rgba(223, 228, 144, 1)', color: 'rgba(0, 0, 0, 1)' }}
//           >
//             See Upcoming Shows
//           </Link>
//         </div>
//       </section>

//       {/* Videos */}
//       <section className="py-16 px-4 border-t border-neutral-800">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-black mb-2 text-center">
//             Watch
//           </h2>
//           <p className="text-center mb-12" style={{ color: 'rgba(61, 61, 61, 1)' }}>
//             Recent clips from the stage
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {VIDEOS.map((video) => (
//               <div key={video.id} className="group">
//                 <div className="aspect-video rounded-lg overflow-hidden bg-neutral-800 shadow-lg group-hover:shadow-xl transition">
//                   <iframe
//                     className="w-full h-full"
//                     src={`https://www.youtube.com/embed/${video.id}`}
//                     title={video.title}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-12 text-center">
//             <Link
//               href="/about"
//               className="text-black hover:text-amber-300 font-medium transition"
//             >
//               Learn more about Kyle →
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
