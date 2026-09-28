import { Download } from "lucide-react";
import { ContactUsButton } from "@/components/contact-us-button";
import { PriceListDownload } from "@/components/price-list-download";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="no-print bg-gradient-to-r from-cobalt to-teal text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-[26px] py-8 sm:flex-row sm:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-paper/80">Talk to us</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            <PriceListDownload>Need</PriceListDownload> a quote, COA, or a claim?
          </p>
          <p className="mt-1 text-base text-paper/80">Contact us through our official channels.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto">
          <a
            href="/GPB-September-Price-List.pdf"
            download
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-paper/50 px-5 text-base font-semibold tracking-tight text-paper transition-colors hover:bg-paper/10 sm:h-14 sm:px-6"
          >
            <Download className="size-4" />
            Price list PDF
          </a>
          <ContactUsButton tone="on-cobalt" className="w-full justify-center sm:w-auto" />
        </div>
      </div>
    </footer>
  );
}