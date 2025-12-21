import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePaymentUrl } from "@/config/fortunex";

interface PricingFeature {
  label: string;
  value: string;
}

interface PricingCardProps {
  planKey: string;
  name: string;
  price: number;
  currency: string;
  features: PricingFeature[];
  popular?: boolean;
  index?: number;
}

const PricingCard = ({
  planKey,
  name,
  price,
  currency,
  features,
  popular = false,
  index = 0,
}: PricingCardProps) => {
  const handleRegister = () => {
    const paymentUrl = generatePaymentUrl(planKey, price);
    window.location.href = paymentUrl;
  };

  return (
    <div
      className={`relative flex flex-col p-6 md:p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 ${
        popular
          ? "bg-gradient-to-br from-gold/20 via-card to-card border-2 border-gold"
          : "bg-card border border-border"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 gradient-gold rounded-full text-sm font-bold text-foreground flex items-center gap-1.5 shadow-gold">
          <Star className="w-4 h-4" />
          Most Popular
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
        {name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl md:text-4xl font-bold text-gold font-display">
          {currency}{price.toLocaleString()}
        </span>
        <span className="text-muted-foreground">/one-time</span>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold/20">
                <Check className="w-3 h-3 text-gold" />
              </span>
              <span className="text-foreground">{feature.label}</span>
            </div>
            <span className="font-semibold text-gold">{feature.value}</span>
          </li>
        ))}
      </ul>

      {/* Register Button */}
      <Button
        onClick={handleRegister}
        variant={popular ? "gold" : "goldOutline"}
        size="lg"
        className="w-full"
      >
        Register Now
      </Button>
    </div>
  );
};

export default PricingCard;
