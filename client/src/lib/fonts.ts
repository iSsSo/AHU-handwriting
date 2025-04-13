// Font example image paths from public directory
const dancingScriptExample = '/assets/dancing-script-example.svg';
const pacificoExample = '/assets/pacifico-example.svg';
const caveatExample = '/assets/caveat-example.svg';
const indieFlowerExample = '/assets/indie-flower-example.svg';
const shadowsIntoLightExample = '/assets/shadows-into-light-example.svg';

export interface Font {
  name: string;
  className: string;
  sampleTitle: string;
  sampleText: string;
  imagePath: string;
  bestScore?: number;
}

export const defaultFonts: Font[] = [
  {
    name: 'Dancing Script',
    className: 'dancing',
    sampleTitle: 'Güzel Yazı',
    sampleText: 'Merhaba! Bu el yazısı fontunu taklit etmeye çalışın. Yumuşak kıvrımları ve akıcı çizgileri yakalamaya özen gösterin.',
    imagePath: dancingScriptExample,
    bestScore: 0
  },
  {
    name: 'Pacifico',
    className: 'pacifico',
    sampleTitle: 'Yuvarlak Hatlar',
    sampleText: 'Bu yazı stili daha yuvarlak ve bağlantılı. Harflerin birbirine geçişlerine dikkat edin.',
    imagePath: pacificoExample,
    bestScore: 0
  },
  {
    name: 'Caveat',
    className: 'caveat',
    sampleTitle: 'Hızlı El Yazısı',
    sampleText: 'Hızlı bir şekilde yazılmış gibi görünen bu yazı stili daha dinamik çizgiler içerir.',
    imagePath: caveatExample,
    bestScore: 0
  },
  {
    name: 'Indie Flower',
    className: 'indie',
    sampleTitle: 'Eğlenceli Stil',
    sampleText: 'Daha oyunbaz ve serbest bir el yazısı. Düzensiz hiza ve karakteristik harflere dikkat edin.',
    imagePath: indieFlowerExample,
    bestScore: 0
  },
  {
    name: 'Shadows Into Light',
    className: 'shadows',
    sampleTitle: 'İnce Hatlar',
    sampleText: 'İnce hatları olan bu yazı stilinde boşluklar ve oranlar oldukça önemli. Temiz çizgiler kullanın.',
    imagePath: shadowsIntoLightExample,
    bestScore: 0
  }
];

export function getMatchColorClass(percentage: number): string {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}
