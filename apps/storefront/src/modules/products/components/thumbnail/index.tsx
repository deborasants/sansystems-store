import { Container, clx } from "@modules/common/components/ui"
import Image from "next/image"
import React from "react"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: { url?: string }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden bg-zinc-100 rounded-2xl group-hover:shadow-md transition-shadow",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-square": size === "square",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: {
  image?: string
  size?: ThumbnailProps["size"]
}) => {
  return image ? (
    <Image
      src={image}
      alt="Imagem do produto"
      className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-500"
      draggable={false}
      quality={75}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 20 : 32} />
    </div>
  )
}

export default Thumbnail