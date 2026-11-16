import Image from "next/image";
import { fuelBrandLogos } from "@/lib/content";
import { Section } from "@/components/ui";

function BrandSlides() {
  return fuelBrandLogos.map((brand) => (
    <div
      key={brand.name}
      className="flex w-[5.75rem] shrink-0 flex-col items-center px-0.5 sm:w-64 sm:px-4"
    >
      <div className="flex h-14 w-full items-center justify-center sm:h-24">
        <Image
          src={brand.image}
          alt={`${brand.name} logo`}
          width={200}
          height={120}
          sizes="(min-width: 640px) 256px, 92px"
          className="h-full w-full object-contain"
        />
      </div>
      <p className="mt-1.5 text-center text-[0.7rem] leading-4 font-medium text-navy sm:mt-3 sm:text-sm sm:leading-5">
        {brand.name}
      </p>
    </div>
  ));
}

export function FuelBrandCarousel() {
  return (
    <Section className="pt-0 pb-12 lg:pb-16">
      <div className="border-t border-navy/15 pt-12 lg:pt-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
          Designed for fuel stations across India
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-7 text-muted-foreground sm:text-base">
          Petrozz supports operational workflows for stations under major fuel brands and
          independent operators.
        </p>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Fuel brand logos"
          className="fuel-brand-viewport mt-10 overflow-hidden overscroll-x-none touch-pan-y py-1 sm:mt-12"
        >
          <div className="fuel-brand-track flex w-max gap-1 sm:gap-4">
            <div className="fuel-brand-set flex w-max gap-1 sm:gap-4" aria-label="Fuel brands">
              <BrandSlides />
            </div>
            <div
              className="fuel-brand-set flex w-max gap-1 sm:gap-4"
              aria-hidden="true"
            >
              <BrandSlides />
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs leading-6 text-muted-foreground sm:mt-10 lg:whitespace-nowrap">
          * Petrozz is independent and is not affiliated with or endorsed by the oil marketing companies named above. These references do not imply integration with proprietary systems.
        </p>
      </div>
    </Section>
  );
}
