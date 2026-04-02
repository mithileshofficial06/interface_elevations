import '@/styles/globals.css';

export const metadata = {
  title: 'INTERFACE ELEVATION & SIGNS | Premium Elevation & Signage Solutions',
  description:
    'With 27+ years of expertise, Interface Elevation & Signs delivers world-class elevation and signage solutions for commercial and industrial projects.',
  keywords: [
    'elevation',
    'signage',
    'ACP cladding',
    'glass work',
    'industrial signs',
    'building elevation',
    'construction',
  ],
  openGraph: {
    title: 'INTERFACE ELEVATION & SIGNS',
    description: '27+ Years of Expertise in Elevation & Signage Solutions',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
