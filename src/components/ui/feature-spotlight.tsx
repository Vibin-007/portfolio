import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import Magnet from '../Magnet';

export interface AnimatedFeatureSpotlightProps extends React.HTMLAttributes<HTMLElement> {
  preheaderIcon?: React.ReactNode;
  preheaderText: string;
  heading: React.ReactNode;
  description: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  buttonProps?: ButtonProps;
  secondaryButtonText?: string;
  secondaryButtonIcon?: React.ReactNode;
  secondaryButtonProps?: ButtonProps;
  imageUrl: string;
  imageAlt?: string;
}

const AnimatedFeatureSpotlight = React.forwardRef<HTMLElement, AnimatedFeatureSpotlightProps>(
  (
    {
      className,
      preheaderIcon,
      preheaderText,
      heading,
      description,
      buttonText,
      buttonIcon,
      buttonProps,
      secondaryButtonText,
      secondaryButtonIcon,
      secondaryButtonProps,
      imageUrl,
      imageAlt = 'Feature illustration',
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          'w-full max-w-6xl mx-auto p-8 md:p-12 rounded-[40px] bg-[#D7E2EA]/[0.02] border border-[#D7E2EA]/10 hover:bg-[#D7E2EA]/[0.05] transition-colors overflow-hidden',
          className
        )}
        aria-labelledby="feature-spotlight-heading"
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Animated Text Content */}
          <div className="flex flex-col space-y-6 text-center md:text-left items-center md:items-start">
            <div
              className="flex items-center space-x-2 text-sm font-medium text-[#D7E2EA]/60 uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700"
            >
              {preheaderIcon}
              <span>{preheaderText}</span>
            </div>
            <h3
              id="feature-spotlight-heading"
              className="text-4xl lg:text-5xl font-black tracking-tight text-[#D7E2EA] uppercase animate-in fade-in slide-in-from-top-4 duration-700 delay-150"
            >
              {heading}
            </h3>
            <p className="text-lg text-[#D7E2EA]/70 font-light leading-relaxed animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
              {description}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 animate-in fade-in slide-in-from-top-4 duration-700 delay-500 pt-4">
              {buttonText && (
                <Button size="lg" className="flex items-center gap-2" {...buttonProps}>
                  {buttonIcon}
                  <span>{buttonText}</span>
                </Button>
              )}
              {secondaryButtonText && (
                <Button size="lg" variant="outline" className="flex items-center gap-2" {...secondaryButtonProps}>
                  {secondaryButtonIcon}
                  <span>{secondaryButtonText}</span>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Animated Visual */}
          <div className="relative w-full min-h-[250px] md:min-h-[320px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-700 delay-200">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full max-w-md object-cover rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>
    );
  }
);
AnimatedFeatureSpotlight.displayName = 'AnimatedFeatureSpotlight';

export { AnimatedFeatureSpotlight };
