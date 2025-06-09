import { Nosifer, Alegreya , Frijole} from 'next/font/google';

export const alegreya = Alegreya({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-alegreya',
});

export const nosifer = Nosifer({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nosifer',
});

export const frijole = Frijole({
    subsets: ["latin"],
    weight: '400'
});
