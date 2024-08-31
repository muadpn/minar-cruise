import { cn } from "@/lib/utils";
import Link from "next/link";

const CompanyInfoCard = ({ className }: { className: string }) => {
  return (
    <section>
      <div className={cn("flex flex-col gap-8 h-full ", className)}>
        <h2 className="max-sm:mx-auto text-2xl font-bold ">Company</h2>
        <Link
          href="/about"
          className="max-sm:mx-auto font-semibold text-slate-400"
        >
          About Us
        </Link>
        <Link href="/booking/premium-cruise" className="max-sm:mx-auto font-semibold text-slate-400">
          Packages
        </Link>
        <Link
          href="/facilities"
          className="max-sm:mx-auto font-semibold text-slate-400"
        >
          Facilities
        </Link>
        <Link
          href="/blog"
          className="max-sm:mx-auto font-semibold text-slate-400"
        >
          News And Blogs
        </Link>
      </div>
    </section>
  );
};

export default CompanyInfoCard;
