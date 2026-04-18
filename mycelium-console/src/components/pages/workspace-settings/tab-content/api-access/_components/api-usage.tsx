import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ApiUsageItemProps {
  title: string;
  value: string;
  includeSeparator?: boolean;
}

function ApiUsageItem({ title, value, includeSeparator }: ApiUsageItemProps) {
  return (
    <div className="h-full w-full flex flex-wrap justify-between">
      <div className="flex flex-col items-start justify-center gap-1">
        <p className="text-sm text-foreground/70 font-medium">{title}</p>
        <p className="text-lg font-medium">{value}</p>
      </div>
      {includeSeparator && (
        <Separator orientation="vertical" className="bg-foreground/10" />
      )}
    </div>
  );
}

export function ApiUsage() {
  return (
    <div
      className={cn(
        "w-full h-fit py-4 px-8",
        "bg-background border border-foreground/10 rounded-md",
        "grid grid-cols-4 grid-rows-[1fr_auto] gap-6",
      )}
    >
      <ApiUsageItem
        title="Total Requests"
        value="10,000"
        includeSeparator={true}
      />
      <ApiUsageItem title="Error Rate" value="0.5%" includeSeparator={true} />
      <ApiUsageItem
        title="Average Latency"
        value="120 ms"
        includeSeparator={true}
      />
      <ApiUsageItem title="Unique IPs" value="1" includeSeparator={false} />
      <div className="col-span-4 row-2">
        <p className="text-sm text-foreground/70">
          These statistics show usage from 1st April 2026. We have a detailed
          overview of how we calculate it.&nbsp;
          <Link href={"/billing"} className="text-blue-400 hover:underline">
            Learn more
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
