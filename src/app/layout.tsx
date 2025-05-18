import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Over The Bar",
  description: "Calisthenics training website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
