import { Text, clx } from "@modules/common/components/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) return null

  return (
    <>
      {price.price_type === "sale" && (
        <Text className="line-through text-zinc-400 text-sm" data-testid="original-price">
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("font-semibold", {
          "text-orange-600": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  )
}