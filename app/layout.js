import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

export const metadata = {
  title: "dClipboard",
  description: "Remote dClipboard",
  icons: {
    icon: 'favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
