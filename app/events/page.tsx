import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  image_link?: string;
  venue_link?: string;
};

async function getEvents(): Promise<Event[]> {
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
    .from("events")
    .select("id, title, date, time, image_link, venue_link")
    .order("date", { ascending: true });

  if (error) {
    console.error("Unable to load events from Supabase:", error.message);
    return [];
  }

  return data as Event[];
}

function formatEventDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function formatEventTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(1970, 0, 1, hours, minutes));
}

function EventCard({ event }: { event: Event }) {
  const CardContent = (
    <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={event.image_link || "/posters/placeholder.png"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="mb-3 inline-flex items-center justify-center gap-2 text-xl font-semibold text-black underline decoration-neutral-400 underline-offset-2">
          {event.title}
          {event.venue_link && (
            <FaExternalLinkAlt className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          )}
        </h3>
        <p className="text-base text-neutral-700">{formatEventDate(event.date)}</p>
        <p className="text-base text-neutral-700">{formatEventTime(event.time)}</p>
      </div>
    </div>
  );

  return event.venue_link ? (
    <Link href={event.venue_link} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <section className="bg-[#f5f1e8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-neutral-600">
              Upcoming shows
            </p>
            <h1 className="text-5xl font-black tracking-tight text-black md:text-7xl">
              Find the next laugh.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-700">
              Catch Kyle on stage for a night filled with honest stories, sharp timing, and a room full of people who were already laughing before the opener finished.
            </p>
          </div>

          {events.length === 0 ? (
            <p className="rounded-[24px] border border-neutral-300 bg-white p-10 text-center text-lg text-neutral-700 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
              Kyle has no upcoming shows right now, check back later.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-black bg-[#dfe490] px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-left">
          <p className="text-lg font-bold text-black">
            Want Kyle at your next event? Let&apos;s make it memorable.
          </p>
          <Link
            href="/contact"
            className="shrink-0 font-bold text-black underline underline-offset-4 hover:no-underline"
          >
            Book him <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
