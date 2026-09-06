"use client";
import { useState } from "react";
import { FacebookIcon, FacebookShareButton } from "next-share";
import { FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_API!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.ok) {
        setStatus("Message sent! Thank you.");
        form.reset();
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("Error sending message.");
      console.log(err);
    }
  }

  return (
    <>
      <section className="bg-[#f5f1e8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-neutral-600">
              Contact
            </p>
            <h1 className="text-5xl font-black tracking-tight text-black md:text-7xl">
              Book Kyle.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-700">
              Send a note about bookings, comedy shows, or just to say you liked the set.
            </p>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_15px_40px_rgba(0,0,0,0.08)] md:p-8">
            <form onSubmit={handleSubmit} className="mx-auto space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full rounded-lg border border-black/15 bg-[#f7f6f2] px-4 py-3 text-black transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-black/15 bg-[#f7f6f2] px-4 py-3 text-black transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-black/15 bg-[#f7f6f2] px-4 py-3 text-black transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="rounded-lg bg-[#dfe490] px-7 py-3.5 font-bold text-black transition hover:bg-[#cdd56e]"
                >
                  Send Message
                </button>
              </div>
            </form>

            {status && <p className="mt-6 text-center text-sm text-neutral-700">{status}</p>}
          </div>

          <div className="mt-10 text-center">
            <div className="flex items-center justify-center gap-5">
              <FacebookShareButton
                url={"https://www.facebook.com/share/16MZG5vx1K/?mibextid=wwXIfr"}
              >
                <FacebookIcon size={48} round />
              </FacebookShareButton>
              <a
                href="https://www.instagram.com/capn___karl/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white p-3 text-pink-500 shadow-sm transition hover:text-pink-400"
                aria-label="Instagram"
              >
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
