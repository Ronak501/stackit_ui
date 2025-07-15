import * as React from "react"

import { MicroscopeIcon as MagnifyingGlass } from "lucide-react"

const Search = React.forwardRef<React.ElementRef<"svg">, React.ComponentPropsWithoutRef<"svg">>(
  ({ className, ...props }, ref) => <MagnifyingGlass ref={ref} {...props} className={className} />,
)
Search.displayName = "Search"

export { Search }
