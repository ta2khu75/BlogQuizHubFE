"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type Props = {
    children: React.ReactNode,
    current: number;
    count: number;
    onNextSlide?: () => void
    onPrevSlide?: () => void
    className?: string
}
const Carousel = ({ children, current, onNextSlide, onPrevSlide, className, count }: Props) => {
    return (
        <div className={cn(`relative w-full mx-auto overflow-hidden ${className}`)}>
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${(current) * 100}%)` }}
            >
                {children}
            </div>
            <Button
                type="button"
                disabled={current === 0}
                onClick={onPrevSlide}
                className="absolute top-1/2 left-0"
            >
                ❮
            </Button>

            <Button
                type="button"
                disabled={current === count}
                onClick={onNextSlide}
                className="absolute top-1/2 right-0"
            >
                ❯
            </Button>
        </div >
    );
};

export default Carousel;
