/**
 * Brand Data Model and Configuration
 *
 * Defines TypeScript interfaces and data for all 8 brands in the ComuStock ecosystem:
 * personal, movil, fibra, flow, pay, tienda, smarthome, tech
 *
 * **Validates: Requirements 1.1, 1.3**
 */

export interface BrandResource {
  type: 'logo' | 'guideline' | 'asset';
  title: string;
  description?: string;
  downloadUrl: string;
  previewUrl?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  color: string;
  logoIso: string;
  logoImg: string;
  headerImage: string;
  description: string;
  resources: BrandResource[];
}

export type BrandSlug =
  | 'personal'
  | 'movil'
  | 'fibra'
  | 'flow'
  | 'pay'
  | 'tienda'
  | 'smarthome'
  | 'tech';

const brandsData: Brand[] = [
  {
    id: 'personal',
    name: 'Personal',
    slug: 'personal',
    displayName: 'Personal',
    color: '#00b7eb',
    logoIso: '/assets/img/ecosistema/personal/header.svg',
    logoImg: '/assets/img/ecosistema/personal/header.svg',
    headerImage: '/assets/img/ecosistema/personal/header.svg',
    description:
      'Manual de marca Personal — lineamientos de identidad visual, logos, paleta cromática y usos correctos.',
    resources: [
      {
        type: 'logo',
        title: 'Logos Personal',
        description: 'Pack de logos en versiones positiva, negativa y sobre fondos de color.',
        downloadUrl: '/content/identidad/ecosistema/personal/logos/',
        previewUrl: '/assets/img/ecosistema/personal/header.svg',
      },
      {
        type: 'guideline',
        title: 'Lineamientos de uso',
        description: 'Guía de tamaños mínimos, áreas de resguardo y usos incorrectos.',
        downloadUrl: '/content/identidad/ecosistema/personal/',
      },
    ],
  },
  {
    id: 'movil',
    name: 'Móvil',
    slug: 'movil',
    displayName: 'Móvil',
    color: '#00b7eb',
    logoIso: '/assets/img/ecosistema/movil/header.svg',
    logoImg: '/assets/img/ecosistema/movil/header.svg',
    headerImage: '/assets/img/ecosistema/movil/header.svg',
    description:
      'Manual de marca Móvil — lineamientos de identidad visual, logos, paleta cromática y usos correctos.',
    resources: [
      {
        type: 'logo',
        title: 'Logos Móvil',
        description: 'Pack de logos en versiones positiva, negativa y sobre fondos de color.',
        downloadUrl: '/content/identidad/ecosistema/movil/logos/',
        previewUrl: '/assets/img/ecosistema/movil/header.svg',
      },
      {
        type: 'guideline',
        title: 'Lineamientos de uso',
        description: 'Guía de tamaños mínimos, áreas de resguardo y usos incorrectos.',
        downloadUrl: '/content/identidad/ecosistema/movil/',
      },
    ],
  },
  {
    id: 'fibra',
    name: 'Fibra',
    slug: 'fibra',
    displayName: 'Fibra',
    color: '#00b7eb',
    logoIso: '/assets/img/ecosistema/fibra/header.svg',
    logoImg: '/assets/img/ecosistema/fibra/header.svg',
    headerImage: '/assets/img/ecosistema/fibra/header.svg',
    description:
      'Manual de marca Fibra — lineamientos de identidad visual, logos, paleta cromática y usos correctos.',
    resources: [
      {
        type: 'logo',
        title: 'Logos Fibra',
        description: 'Pack de logos en versiones positiva, negativa y sobre fondos de color.',
        downloadUrl: '/content/identidad/ecosistema/fibra/logos/',
        previewUrl: '/assets/img/ecosistema/fibra/header.svg',
      },
      {
        type: 'guideline',
        title: 'Lineamientos de uso',
        description: 'Guía de tamaños mínimos, áreas de resguardo y usos incorrectos.',
        downloadUrl: '/content/identidad/ecosistema/fibra/',
      },
    ],
  },
  {
    id: 'flow',
    name: 'Flow',
    slug: 'flow',
    displayName: 'Flow',
    color: '#ff6b35',
    logoIso: '/assets/img/ecosistema/flow/header.svg',
    logoImg: '/assets/img/ecosistema/flow/header.svg',
    headerImage: '/assets/img/ecosistema/flow/header.svg',
    description:
      'Manual de marca Flow — lineamientos de identidad visual, logos, paleta cromática y usos correctos.',
    resources: [
      {
        type: 'logo',
        title: 'Logos Flow',
        description: 'Pack de logos en versiones positiva, negativa y sobre fondos de color.',
        downloadUrl: '/content/identidad/ecosistema/flow/logos/',
        previewUrl: '/assets/img/ecosistema/flow/header.svg',
      },
      {
        type: 'guideline',
        title: 'Lineamientos de uso',
        description: 'Guía de tamaños mínimos, áreas de resguardo y usos incorrectos.',
        downloadUrl: '/content/identidad/ecosistema/flow/',
      },
    ],
  },
  {
    id: 'pay',
    name: 'Pay',
    slug: 'pay',
    displayName: 'Pay',
    color: '#00b7eb',
    logoIso: '/assets/img/ecosistema/pay/header.svg',
    logoImg: '/assets/img/ecosistema/pay/header.svg',
    headerImage: '/assets/img/ecosistema/pay/header.svg',
    description:
      'Manual de marca Pay — lineamientos de identidad visual, logos, paleta cromática y usos correctos.',
    resources: [
      {
        type: 'logo',
        title: 'Logos Pay',
        description: 'Pack de logos en versiones positiva, negativa y sobre fondos de color.',
        downloadUrl: '/content/identidad/ecosistema/pay/logos/',
        previewUrl: '/assets/img/ecosistema/pay/header.svg',
      },
      {
        type: 'guideline',
        title: 'Lineamientos de uso',
        description: 'Guía de tamaños mínimos, áreas de resguardo y usos incorrectos.',
        downloadUrl: '/content/identidad/ecosistema/pay/',
      },
    ],
  },
  {
    id: 'tienda',
    name: 'Tienda',
    slug: 'tienda',
    displayName: 'Tienda',
    color: '#00b7eb',
    logoIso: '/assets/img/ecosistema/tienda/header.svg',
    logoImg: '/assets/img/ecosistema/tienda/header.svg',
    headerImage: '/assets/img/ecosistema/tienda/header.svg',
    description:
      'Manual de marca Tienda — lineamientos de identidad visual, logos, paleta cromática y usos correctos.',
    resources: [
      {
        type: 'logo',
        title: 'Logos Tienda',
        description: 'Pack de logos en versiones positiva, negativa y sobre fondos de color.',
        downloadUrl: '/content/identidad/ecosistema/tienda/logos/',
        previewUrl: '/assets/img/ecosistema/tienda/header.svg',
      },
      {
        type: 'guideline',
        title: 'Lineamientos de uso',
        description: 'Guía de tamaños mínimos, áreas de resguardo y usos incorrectos.',
        downloadUrl: '/content/identidad/ecosistema/tienda/',
      },
    ],
  },
  {
    id: 'smarthome',
    name: 'Smarthome',
    slug: 'smarthome',
    displayName: 'Smarthome',
    color: '#00b7eb',
    logoIso: '/assets/img/ecosistema/smarthome/header.svg',
    logoImg: '/assets/img/ecosistema/smarthome/header.svg',
    headerImage: '/assets/img/ecosistema/smarthome/header.svg',
    description:
      'Manual de marca Smarthome — lineamientos de identidad visual, logos, paleta cromática y usos correctos.',
    resources: [
      {
        type: 'logo',
        title: 'Logos Smarthome',
        description: 'Pack de logos en versiones positiva, negativa y sobre fondos de color.',
        downloadUrl: '/content/identidad/ecosistema/smarthome/logos/',
        previewUrl: '/assets/img/ecosistema/smarthome/header.svg',
      },
      {
        type: 'guideline',
        title: 'Lineamientos de uso',
        description: 'Guía de tamaños mínimos, áreas de resguardo y usos incorrectos.',
        downloadUrl: '/content/identidad/ecosistema/smarthome/',
      },
    ],
  },
  {
    id: 'tech',
    name: 'Tech',
    slug: 'tech',
    displayName: 'Tech',
    color: '#00b7eb',
    logoIso: '/assets/img/ecosistema/tech/header.svg',
    logoImg: '/assets/img/ecosistema/tech/header.svg',
    headerImage: '/assets/img/ecosistema/tech/header.svg',
    description:
      'Manual de marca Tech — lineamientos de identidad visual, logos, paleta cromática y usos correctos.',
    resources: [
      {
        type: 'logo',
        title: 'Logos Tech',
        description: 'Pack de logos en versiones positiva, negativa y sobre fondos de color.',
        downloadUrl: '/content/identidad/ecosistema/tech/logos/',
        previewUrl: '/assets/img/ecosistema/tech/header.svg',
      },
      {
        type: 'guideline',
        title: 'Lineamientos de uso',
        description: 'Guía de tamaños mínimos, áreas de resguardo y usos incorrectos.',
        downloadUrl: '/content/identidad/ecosistema/tech/',
      },
    ],
  },
];

/**
 * Get brand data by slug.
 * Returns undefined if the brand is not found.
 */
export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brandsData.find((brand) => brand.slug === slug);
};

/**
 * Get all brands data.
 */
export const getAllBrands = (): Brand[] => {
  return brandsData;
};

export default brandsData;
