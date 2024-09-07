"use client";
import Link from "next/link";
import { Home, ShoppingBasket, ShoppingCart } from "lucide-react";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

export default function NavBarContent({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex w-full flex-col gap-2 bg-background p-4 lg:w-64 lg:min-w-64 lg:border-r",
        className,
      )}
    >
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted",
          {
            "bg-luigi-green text-white hover:bg-luigi-green/90":
              pathname == "/",
          },
        )}
        prefetch={false}
      >
        <Home className="h-5 w-5" />
        <span>Home</span>
      </Link>
      <Link
        href="/ingredients"
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted",
          {
            "bg-luigi-green text-white hover:bg-luigi-green/90":
              pathname == "/ingredients",
          },
        )}
        prefetch={false}
      >
        <ShoppingBasket className="h-5 w-5" />
        <span>Ingredientes</span>
      </Link>
      <Link
        href="/orders"
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted",
          {
            "bg-luigi-green text-white hover:bg-luigi-green/90":
              pathname == "/orders",
          },
        )}
        prefetch={false}
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Pedidos</span>
      </Link>
    </nav>
  );
}
