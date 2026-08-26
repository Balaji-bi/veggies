export const metadata = {
  title: 'Vegetable Preferences - English & Tamil',
  description: 'Pick your favourite vegetables, add cooking notes, and share via email',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#fafdf7' }}>{children}</body>
    </html>
  );
}
