import { FC, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

interface VideoData {
  type: string;
  url: string;
}

const CarouselComponent: FC<{ data: VideoData[] }> = ({ data }) => {
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
          {data.map((media, index) => (
            <CarouselItem key={index}>
              <Card className="border-none">
                <CardContent className="bg-transparent h-[500px] p-0">
                  {data.length > 0 && media.url.type === "VIDEO" ? (
                    <video className="object-contain w-full h-full" slot="media" controls>
                      <source src={media.url.url} type="video/mp4" />
                    </video>
                  ) : (
                    <img className="object-contain w-full h-full" src={media.url.url} alt={`Slide ${index + 1}`} />
                  )}
                  {media.url <= "0" && <p>No media available</p>}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {count > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 bg-gray-700 hover:bg-gray-800 hover:text-white" />
            <CarouselNext className="absolute right-2 bg-gray-700 hover:bg-gray-800 hover:text-white" />
          </>
        )}
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">{count > 1 ? `Slide ${current} of ${count}` : ""}</div>
    </div>
  );
};

export default CarouselComponent;
