"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[4px] w-full grow overflow-hidden rounded-full bg-white/30">
      <SliderPrimitive.Range className="absolute h-full bg-white group-hover:bg-spotify-green rounded-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-[0px] w-[0px] group-hover:h-3 group-hover:w-3 rounded-full border-1  bg-white  transition-colors focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
