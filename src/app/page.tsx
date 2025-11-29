import Link from "next/link";

export default function IntroPage() {
  return (
    <main className="flex min-h-screen flex-col bg-action text-white font-[SF Pro]">
      {/* Logo area */}
      <header className="px-6 pt-12">
        <div className="flex items-center gap-2">
          <img
            src="/images/munchies-logo.png"
            alt="Munchies"
            className="h-6 w-auto"
          />
        </div>
      </header>

      {/* Middle hero text */}
      <section className="flex flex-1 flex-col justify-center px-6">
        <h1
          className="
            mb-4 
            text-[48px] 
            font-[760] 
            leading-[100%] 
            tracking-[-1px]
          "
        >
          Treat
          <span className="block">yourself.</span>
        </h1>

        <p
          className="
            max-w-xs 
            text-[14px] 
            font-[400] 
            leading-[150%] 
            tracking-[-0.5px]
          "
        >
          Find the best restaurants in your city and get it delivered to your
          place!
        </p>
      </section>

      {/* Bottom CTA */}
      <footer className="px-6 pb-12">
        <Link
          href="/app"
          className="block w-full rounded-[8px] border border-white py-4 text-center text-[16px] font-semibold tracking-[-0.5px]"
        >
          Continue
        </Link>
      </footer>
    </main>
  );
}
