import Navbar from "./components/Navbar";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

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
      <AuthProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
