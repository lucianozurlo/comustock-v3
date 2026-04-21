import type { BentoCardData } from './BentoCard';
import { BentoCard } from './BentoCard';

/**
 * BentoGrid Component
 *
 * Grid layout container for BentoCard components.
 * Creates a responsive bento-box style grid with cards of varying sizes.
 *
 * **Validates: Requirements 1.1, 1.4, 3.2, 5.7, 8.2**
 *
 * @component
 * @example
 * ```tsx
 * <BentoGrid
 *   cards={[
 *     {
 *       title: "Presentaciones",
 *       subtitle: "Tus ideas en primer plano.",
 *       href: "/sections/templates#presentaciones",
 *       imageSrc: "/assets/img/home/templates/presentaciones.jpg",
 *       size: "large",
 *       icon: "presentation",
 *       delay: 0
 *     },
 *     {
 *       title: "E-mails",
 *       href: "/sections/templates#e-mails",
 *       imageSrc: "/assets/img/home/templates/e-mails.jpg",
 *       size: "small",
 *       icon: "email",
 *       delay: 300
 *     }
 *   ]}
 * />
 * ```
 *
 * Features:
 * - Applies cs-bento-grid CSS class for grid layout
 * - Supports stg-bottom-gap for spacing
 * - Renders multiple BentoCard components
 * - Maintains card order and sizing from data
 * - Responsive grid that adapts to different screen sizes
 *
 * @param {BentoGridProps} props - Component props
 * @param {BentoCardData[]} props.cards - Array of card data objects
 *
 * @returns {JSX.Element} Bento grid container with cards
 */

export interface BentoGridProps {
  cards: BentoCardData[];
}

export const BentoGrid: React.FC<BentoGridProps> = ({ cards }) => {
  return (
    <div className="cs-bento-grid stg-bottom-gap">
      {cards.map((card, index) => (
        <BentoCard key={`${card.href}-${index}`} {...card} />
      ))}
    </div>
  );
};
