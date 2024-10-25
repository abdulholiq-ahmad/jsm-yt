import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const CarouselComponent = ({ data }: { data: { url: string }[] }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="mx-auto max-w-full bg-transparent">
      <Carousel setApi={setApi} className="w-full max-w-full bg-transparent">
        <CarouselContent>
          {data.map((photo, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="bg-transparent h-[500px]">
                  <img className="object-contain" src={photo.url} alt={`Slide ${index + 1}`} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {count > 1 && (
          <>
            <CarouselPrevious className="absolute left-0 text-white bg-[#877EFF] hover:bg-[#877EFF] transition-colors duration-300 ease-in rounded-full p-2" />
            <CarouselNext className="absolute right-0 text-white bg-[#877EFF] hover:bg-[#877EFF] transition-colors duration-300 ease-in rounded-full p-2" />
          </>
        )}
      </Carousel>

      <div className="py-2 text-center text-sm text-muted-foreground">{count > 1 ? `Slide ${current} of ${count}` : ""}</div>
    </div>
  );
};

export default CarouselComponent;
