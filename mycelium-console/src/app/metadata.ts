import type { Metadata } from 'next';
import { ROOT_APP_TITLE } from './layout.config';

const DEFAULT_IMAGE_ALT = 'Mycelium metadata image';
const DEFAULT_IMAGE_HEIGHT = 630;
const DEFAULT_IMAGE_PATH = '/images/metadata/default.png';
const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_SITE_URL = 'https://mycelium.local';
const DEFAULT_TWITTER_CARD = 'summary_large_image';

interface GenerateMetadataParams {
  description: string;
  pathname: string;
  title: string;
}

export function generateMetadata({
  description,
  pathname,
  title,
}: GenerateMetadataParams): Metadata {
  const metadataBase = new URL(DEFAULT_SITE_URL);
  const canonicalUrl = new URL(pathname, metadataBase).toString();
  const imageUrl = new URL(DEFAULT_IMAGE_PATH, metadataBase).toString();

  return {
    title,
    description,
    metadataBase,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      description,
      images: [
        {
          alt: DEFAULT_IMAGE_ALT,
          height: DEFAULT_IMAGE_HEIGHT,
          url: imageUrl,
          width: DEFAULT_IMAGE_WIDTH,
        },
      ],
      siteName: ROOT_APP_TITLE,
      title,
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: DEFAULT_TWITTER_CARD,
      description,
      images: [imageUrl],
      title,
    },
  };
}
