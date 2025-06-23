import Image from "next/image";
import "./globals.css";

export const metadata = {
  title: "Sinkronis",
  description: "Signup to get started",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <header className="p-4 flex items-center">
          <Image src="/logo.png" alt="Logo" width={164} height={48} />
         
        </header> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
