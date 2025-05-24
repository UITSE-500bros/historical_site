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
        <div className="flex flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
