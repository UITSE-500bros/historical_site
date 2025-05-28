import Footer from "../components/layout/Footer";
import NavHeader from "../components/layout/NavHeader";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavHeader />
        <div className="flex min-h-screen w-full flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
