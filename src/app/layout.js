import '@/styles/globals.css';

export const metadata = {
  title: 'Interface Elevation & Signs | Premium Facade & Signage Solutions, Chennai',
  description:
    '27+ years of expertise in facade elevation, structural glazing, ACP cladding, LED displays and signage across India. Based in Chennai, serving Pan-India.',
  keywords: [
    'facade elevation Chennai',
    'signage solutions India',
    'ACP cladding',
    'structural glazing',
    'LED display installation',
    'building elevation',
    'industrial signs',
    'HPL cladding',
    'glass elevation',
    'construction signage',
  ],
  metadataBase: new URL('https://interfaceelevationsandsigns.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Interface Elevation & Signs | Premium Facade & Signage Solutions',
    description: '27+ years of expertise in facade elevation, structural glazing, ACP cladding, LED displays and signage across India.',
    type: 'website',
    url: 'https://interfaceelevationsandsigns.com',
    siteName: 'Interface Elevation & Signs',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interface Elevation & Signs | Premium Facade & Signage Solutions',
    description: '27+ years of expertise in facade elevation, structural glazing, ACP cladding, and signage across India.',
  },
  robots: {
    index: true,
    follow: true,
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
