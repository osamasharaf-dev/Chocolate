// Fonts are self-hosted from npm (@fontsource), so the site never depends on Google at build or run time.
import '@fontsource/big-shoulders-display/700.css';
import '@fontsource/big-shoulders-display/800.css';
import '@fontsource/big-shoulders-display/900.css';
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/hanken-grotesk/700.css';
import '@fontsource/hanken-grotesk/800.css';
import './globals.css';

export const metadata = {
  title: 'NOUÉ Chocolate Gifts',
  description:
    'NOUÉ — chocolate gift boxes tied by hand in Riyadh. Weddings, newborns, graduation, Eid and corporate gifting.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#3A0A14',
};

// Adds the "motion" class before first paint so the animated layout is in place
// immediately (skipped for visitors who prefer reduced motion).
const motionScript = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
