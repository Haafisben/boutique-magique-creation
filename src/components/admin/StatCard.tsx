
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  changeLabel = "depuis le mois dernier",
  className,
}: StatCardProps) {
  const showChange = change !== undefined;
  const isPositive = showChange && change >= 0;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {showChange && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            {isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span
              className={cn(
                isPositive ? "text-emerald-500" : "text-red-500"
              )}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>{" "}
            <span className="ml-1">{changeLabel}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
