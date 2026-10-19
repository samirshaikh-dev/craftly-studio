import Link from "next/link";
import NavLink from "./NavLink";

export default function DesktopNav() {
  return (
    <>
      {/* Centered navigation links */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink href="/services">Services</NavLink>
        <NavLink href="/pricing">Pricing</NavLink>
        <NavLink href="/portfolio">Work</NavLink>
        <NavLink href="/industries/manufacturing">Industries</NavLink>
        <NavLink href="/blog">Blog</NavLink>
        <NavLink href="/about">About</NavLink>
      </div>

      {/* Action button on the right */}
      <div className="hidden md:block">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Start Project
        </Link>
      </div>
    </>
  );
}
