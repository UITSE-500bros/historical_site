import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define types for analytics API response
interface AnalyticsData {
  totalPayments: number;
  totalRevenue: number;
  byMonth: Record<string, { count: number; revenue: number }>;
  byYear: Record<string, { count: number; revenue: number }>;
  byStatus: Record<string, number>;
  byMuseumName: Record<string, { count: number; revenue: number }>;
}

// Fetch analytics data from the API
async function getAnalytics(): Promise<AnalyticsData | null> {
  try {
    const res = await fetch("http://localhost:8888/payments/admin/analytic", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch analytics");
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function AdminDashboard() {
  const analytics = await getAnalytics();

  return (
    <div className="h-full w-full bg-gray-50 p-8 overflow-auto">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to the Historical Site admin system
          </p>
        </div>

        {!analytics ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Data Load Error</CardTitle>
              <CardDescription>
                Unable to load analytics data. Please try again later.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Transactions</CardTitle>
                  <CardDescription>Total number of payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    {analytics.totalPayments ?? 0}
                  </p>
                  <p className="text-sm text-gray-500">Total transactions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Total revenue (VND)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">
                    {analytics.totalRevenue?.toLocaleString("vi-VN") ?? 0}
                  </p>
                  <p className="text-sm text-gray-500">Total revenue</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction Status</CardTitle>
                  <CardDescription>Status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {Object.entries(analytics.byStatus || {}).map(
                      ([status, count]) => (
                        <li key={status} className="flex justify-between">
                          <span className="capitalize">
                            {status.toLowerCase()}
                          </span>
                          <span className="font-semibold">
                            {count as number}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Most recent months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {Object.entries(analytics.byMonth || {}).map(
                      ([month, data]) => {
                        const d = data as { count: number; revenue: number };
                        return (
                          <li key={month} className="flex justify-between">
                            <span>{month}</span>
                            <span>
                              {d.count} transactions,{" "}
                              {d.revenue.toLocaleString("vi-VN")} VND
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Yearly Revenue</CardTitle>
                  <CardDescription>Most recent years</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {Object.entries(analytics.byYear || {}).map(
                      ([year, data]) => {
                        const d = data as { count: number; revenue: number };
                        return (
                          <li key={year} className="flex justify-between">
                            <span>{year}</span>
                            <span>
                              {d.count} transactions,{" "}
                              {d.revenue.toLocaleString("vi-VN")} VND
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Revenue by Museum</CardTitle>
                <CardDescription>Breakdown by museum</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {Object.entries(analytics.byMuseumName || {}).map(
                    ([museum, data]) => {
                      const d = data as { count: number; revenue: number };
                      return (
                        <li key={museum} className="flex justify-between">
                          <span>{museum}</span>
                          <span>
                            {d.count} transactions,{" "}
                            {d.revenue.toLocaleString("vi-VN")} VND
                          </span>
                        </li>
                      );
                    }
                  )}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
