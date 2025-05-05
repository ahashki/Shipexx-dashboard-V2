import { Skeleton } from "@/components/ui/skeleton"

export default function SubscriptionCheckoutLoading() {
  return (
    <div className="container max-w-5xl mx-auto py-8">
      <Skeleton className="h-9 w-24 mb-6" />

      <div className="flex flex-col space-y-6">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>

        {/* Billing Period Toggle Skeleton */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-10 w-[400px]" />
        </div>

        {/* Subscription Plans Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
          ))}
        </div>

        {/* Payment Section Skeleton */}
        <Skeleton className="h-[300px] w-full mt-8 rounded-lg" />

        {/* Subscription Benefits Skeleton */}
        <Skeleton className="h-[200px] w-full mt-4 rounded-lg" />
      </div>
    </div>
  )
}
