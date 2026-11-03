import { PumpPreview } from "@/components/product-preview";

export function ProductShowcase() {
  return (
    <div className="min-w-0">
      <div id="hero-product-preview" className="reveal-in">
        <PumpPreview animated />
      </div>
    </div>
  );
}
