import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { NewArrivals } from "@modules/home/components/home-sections"
import TrustBar from "@modules/home/components/trust-bar"  // ← Novo import
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Sansystems - E-commerce de Softwares",
  description: "Soluções completas para gestão, produtividade e automação.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <NewArrivals region={region} />
      <TrustBar />
    </>
  )
}