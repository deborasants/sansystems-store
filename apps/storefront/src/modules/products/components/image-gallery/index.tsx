import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-zinc-100 rounded-2xl flex items-center justify-center">
        <p className="text-zinc-400">Sem imagens disponíveis</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => (
        <Container
          key={image.id}
          className="relative aspect-[4/3.5] md:aspect-[29/34] w-full overflow-hidden bg-zinc-100 rounded-2xl shadow-sm"
          id={image.id}
        >
          {image.url && (
            <Image
              src={image.url}
              priority={index === 0} // Apenas a primeira imagem com priority
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              alt={`Imagem do produto ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
            />
          )}
        </Container>
      ))}
    </div>
  )
}

export default ImageGallery