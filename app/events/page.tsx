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
    <div className="bg-amber-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={event.image_link || '/posters/placeholder.png'}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-black underline decoration-neutral-400 underline-offset-2 mb-2 inline-flex items-center justify-center gap-1">
          {event.title}
          {event.venue_link && <FaExternalLinkAlt className="inline-block w-4 h-4 shrink-0 text-neutral-500" aria-hidden />}
        </h3>
        <p className="text-gray-700">
          {formatEventDate(event.date)}
        </p>
        <p className="text-gray-700">
          {formatEventTime(event.time)}
        </p>
      </div>
    </div>
  )
  return event.venue_link ? (
    <Link href={event.venue_link} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </Link>
  ) : (
    CardContent
  )
}


export default async function EventsPage() {
  const events = await getEvents();

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-10 text-black text-center">
        Upcoming Gigs
      </h1>

      {events.length === 0 ? (
        <p className="text-lg text-black text-center">
          Kyle has no upcoming shows right now, check back later.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
