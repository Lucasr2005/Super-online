import { useEffect, useState } from "react";
import hero1 from "../images/hero1.webp";

export function Hero() {
  const slides = [
    {
      title: "Hacé tu súper sin salir de casa",
      description: "Recibí tus productos frescos en la puerta de tu hogar en menos de 24 hs.",
    },
    {
      title: "Frescura garantizada en cada pedido",
      description:
        "Cuidamos la cadena de frío para que tus alimentos lleguen como recién salidos del súper.",
    },
    {
      title: "Tus compras de siempre, ahora más simples",
      description:
        "Pagá de forma segura con Mercado Pago y recibí tus productos en la puerta de tu hogar.",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-72 max-h-[500px] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 -z-10" />
      <img
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
        src={hero1}
        alt="Fondo con productos de supermercado."
      />
      <div className="max-w-3xl px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{slide.title}</h1>
        <p className="text-md  md:text-xl text-white/90">{slide.description}</p>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
