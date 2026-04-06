import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaLeaf, FaSeedling, FaStar, FaUserTie } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Yabuwat Atelier | Modern Heritage Fashion",
  description:
    "Learn about Yabuwat Atelier's mission, craftsmanship, and modern Nigerian design philosophy.",
  openGraph: {
    title: "About Yabuwat Atelier | Modern Heritage Fashion",
    description:
      "Learn about Yabuwat Atelier's mission, craftsmanship, and modern Nigerian design philosophy.",
    type: "website",
  },
};

const values = [
  {
    title: "Modern Heritage",
    description:
      "We blend traditional Nigerian craftsmanship with sleek contemporary tailoring.",
    icon: FaLeaf,
  },
  {
    title: "Handcrafted Quality",
    description:
      "Every garment is carefully finished for comfort, fit, and lasting elegance.",
    icon: FaSeedling,
  },
  {
    title: "Bold Confidence",
    description:
      "Our pieces are designed to empower you with timeless confidence and presence.",
    icon: FaStar,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#1a4d3e] hover:text-[#b8a876] transition-colors font-semibold"
        >
          <FaArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start bg-white rounded-[2rem] shadow-[0_30px_90px_rgba(40,35,29,0.08)] border border-white/80 overflow-hidden">
          <div className="p-8 sm:p-12 lg:pl-16 lg:pr-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e9dfc5] px-4 py-2 text-sm font-semibold text-[#6b5d49]">
              Crafted for modern elegance
            </span>
            <h1 className="mt-8 text-4xl sm:text-5xl font-bold tracking-tight text-[#1a4d3e]">
              Yabuwat Atelier
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5c5548]">
              Elevating contemporary fashion with authentic Nigerian artistry. Our
              collections are made for people who value intention, comfort, and
              enduring style.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#e7d9c1] bg-[#faf5eb] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[#9a8468] font-semibold">
                  Signature style
                </p>
                <p className="mt-3 text-base text-[#4d493f]">
                  Minimal silhouettes with rich textures designed to last every season.
                </p>
              </div>
              <div className="rounded-3xl border border-[#e7d9c1] bg-[#fff6ed] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[#9a8468] font-semibold">
                  Tailored experience
                </p>
                <p className="mt-3 text-base text-[#4d493f]">
                  Personalized touches and premium finishes make every piece feel custom.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/catalog">
                <Button className="rounded-full bg-[#b8a876] hover:bg-[#1a4d3e] text-white px-8 py-3 font-semibold shadow-lg shadow-[#b8a876]/20 transition-all">
                  Explore the collection
                </Button>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#1a4d3e] px-8 py-3 text-sm font-semibold text-[#1a4d3e] hover:bg-[#1a4d3e] hover:text-white transition-colors">
                Book a consultation
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#1a4d3e] p-8 sm:p-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_45%)]" />
            <div className="relative space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-[#d8caa6] font-semibold">
                  Our story
                </p>
                <h2 className="mt-4 text-3xl font-bold">A modern atelier with roots.</h2>
                <p className="mt-4 text-sm leading-7 text-[#efe8da]">
                  We combine handcrafted tailoring, refined simplicity, and a deep
                  respect for cultural influence to create wardrobe pieces that feel
                  both timeless and distinctly contemporary.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                  <p className="text-sm text-[#d8caa6] uppercase tracking-[0.25em]">Designed for</p>
                  <p className="mt-3 text-xl font-semibold">Effortless confidence</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                  <p className="text-sm text-[#d8caa6] uppercase tracking-[0.25em]">Made with</p>
                  <p className="mt-3 text-xl font-semibold">Intentional details</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-white border border-[#eae3d5] shadow-[0_18px_60px_rgba(63,55,45,0.08)] overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-start p-8 sm:p-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e5cb] px-4 py-2 text-sm font-semibold text-[#a07f50]">
                Our ethos
              </span>
              <h2 className="text-3xl font-bold text-[#1a4d3e]">Built around people and purpose.</h2>
              <p className="max-w-xl text-base leading-8 text-[#5f584c]">
                Yabuwat Atelier exists to help you express your identity with pieces
                that feel personal, polished, and proudly rooted in Nigerian craft.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="rounded-[1.5rem] border border-[#ece1cf] bg-[#faf5ed] p-6 shadow-sm">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b8a876]/15 text-[#b8a876]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#1a4d3e]">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#6d6458]">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-[#dbe3d7] p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[#1a4d3e]">Made for modern style.</h2>
            <p className="mt-4 text-base leading-7 text-[#4f504d]">
              Our collections are shaped by thoughtful materials, clean silhouettes,
              and an elevated sense of ease — for those who demand quality at every step.
            </p>
          </div>
          <div className="rounded-[2rem] bg-[#1a4d3e] p-8 sm:p-10 text-white">
            <h2 className="text-2xl font-bold">Tailored to your story.</h2>
            <p className="mt-4 text-base leading-7 text-[#dcd3c2]">
              Every design begins with the customer in mind, ensuring each piece
              feels confident, comfortable, and uniquely yours.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-[#f0e8d9]">
              <FaUserTie size={24} />
              <span>Personal styling, premium finish, crafted confidence.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
