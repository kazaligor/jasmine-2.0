import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jasmine — Платформа управления корпоративной ликвидностью',
  description: 'Проект Jasmine: единая цифровая среда для привлечения, размещения и обращения корпоративной ликвидности.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
