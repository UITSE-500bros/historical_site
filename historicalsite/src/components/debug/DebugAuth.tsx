"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function DebugAuth() {
  const router = useRouter();

  const clearToken = () => {
    Cookies.remove("accessToken");
    alert("Token đã được xóa! Bây giờ hãy thử truy cập /admin/dashboard");
  };

  const setFakeToken = () => {
    Cookies.set("accessToken", "fake-token-for-testing", { expires: 1 });
    alert("Token giả đã được set! Bây giờ có thể truy cập admin routes");
  };

  const checkToken = () => {
    const token = Cookies.get("accessToken");
    alert(
      token ? `Token tồn tại: ${token.substring(0, 20)}...` : "Không có token"
    );
  };

  const goToAdmin = () => {
    router.push("/admin/dashboard");
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>🔧 Debug Authentication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={checkToken} variant="outline" className="w-full">
          Kiểm tra Token
        </Button>
        <Button onClick={clearToken} variant="destructive" className="w-full">
          Xóa Token
        </Button>
        <Button onClick={setFakeToken} variant="secondary" className="w-full">
          Set Token Giả
        </Button>
        <Button onClick={goToAdmin} className="w-full">
          Truy cập Admin Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
