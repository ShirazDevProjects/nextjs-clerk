import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "NextJS Clerk App",
  description: "Created By ShirazDev to help teach how to use clerk",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/login"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/dashboard"
    >
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
