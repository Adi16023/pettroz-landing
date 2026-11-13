import {
  Banknote,
  Building2,
  Droplets,
  Fuel,
  MapPin,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const categoryArtwork: Record<string, { Icon: LucideIcon; tone: string }> = {
  "Petrol Pump Management": { Icon: Fuel, tone: "from-[#f9e3da] to-[#f2c5b5]" },
  "Fuel Inventory & Stock Control": { Icon: Droplets, tone: "from-[#dcecf2] to-[#b9dbe6]" },
  "Employee Attendance": { Icon: MapPin, tone: "from-[#e2eadf] to-[#c3d6c0]" },
  "Payroll & HR Management": { Icon: Banknote, tone: "from-[#f2e9d8] to-[#e6d3ad]" },
  "Business Productivity": { Icon: Building2, tone: "from-[#e5e3f1] to-[#cbc9e5]" },
};

export function BlogThumbnail({
  category,
  title,
  coverUrl,
  className = "",
}: {
  category: string;
  title: string;
  coverUrl?: string | null;
  className?: string;
}) {
  if (coverUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={coverUrl}
        alt={title}
        className={`aspect-[1.65/1] w-full object-cover ${className}`}
      />
    );
  }

  const artwork = categoryArtwork[category] ?? { Icon: Wallet, tone: "from-[#eee8df] to-[#d8cec0]" };
  const { Icon } = artwork;

  return (
    <div
      role="img"
      aria-label={`Illustration for ${title}`}
      className={`relative isolate flex aspect-[1.65/1] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${artwork.tone} ${className}`}
    >
      <span aria-hidden="true" className="absolute -right-8 -top-12 size-48 rounded-full border border-white/50" />
      <span aria-hidden="true" className="absolute -bottom-20 -left-8 size-52 rounded-full border border-white/50" />
      <span aria-hidden="true" className="absolute right-[18%] bottom-[17%] size-3 rounded-full bg-white/70" />
      <span aria-hidden="true" className="absolute top-[20%] left-[22%] size-2 rounded-full bg-white/70" />
      <span className="relative grid size-20 place-items-center rounded-[1.6rem] border border-white/60 bg-white/75 text-navy shadow-[0_12px_30px_-18px_#1a1c29aa] sm:size-24 sm:rounded-[2rem]">
        <Icon aria-hidden="true" className="size-9 sm:size-11" strokeWidth={1.4} />
      </span>
    </div>
  );
}
