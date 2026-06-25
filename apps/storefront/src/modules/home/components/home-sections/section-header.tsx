import { ReactNode } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import { Text } from "@modules/common/components/ui"

export default function SectionHeader({
  title,
  href,
  viewAllLabel = "View all",
  subtitle,
  right,
}: {
  title: string
  href?: string
  viewAllLabel?: string
  subtitle?: ReactNode
  right?: ReactNode
}) {
  return (
    <div className="flex items-end justify-between mb-6 gap-4">
      <div>
        <Text className="txt-xlarge">{title}</Text>
        {subtitle ? <div className="mt-2 text-sm text-fg-subtle">{subtitle}</div> : null}
      </div>

      {right ? (
        right
      ) : href ? (
        <InteractiveLink href={href}>
          {viewAllLabel}
        </InteractiveLink>
      ) : null}
    </div>
  )
}
