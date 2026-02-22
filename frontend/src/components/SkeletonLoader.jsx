/**
 * Skeleton loaders for loading states
 */
import './SkeletonLoader.css';

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__header">
        <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-2-3"></div>
        <div className="skeleton-bar skeleton-bar--h-8 skeleton-bar--w-24 skeleton-bar--rounded"></div>
      </div>

      <div className="skeleton-card__body">
        <div className="skeleton-bar skeleton-bar--h-4 skeleton-bar--w-full"></div>
        <div className="skeleton-bar skeleton-bar--h-4 skeleton-bar--w-5-6"></div>
      </div>

      <div className="skeleton-card__stack">
        <div className="skeleton-bar skeleton-bar--h-4 skeleton-bar--w-20"></div>
        <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-32"></div>
        <div className="skeleton-bar skeleton-bar--h-4 skeleton-bar--w-20"></div>
        <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-40"></div>
      </div>

      <div className="skeleton-card__footer">
        <div className="skeleton-bar skeleton-bar--h-24 skeleton-bar--w-24 skeleton-bar--rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3 }) {
  return (
    <div className="skeleton-grid">
      <div className="skeleton-grid__inner">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonDetailHeader() {
  return (
    <div className="skeleton-detail-header">
      <div className="skeleton-detail-header__back">
        <div className="skeleton-bar skeleton-bar--h-10 skeleton-bar--w-32"></div>
      </div>
      <div className="skeleton-detail-header__title">
        <div className="skeleton-bar skeleton-bar--h-10 skeleton-bar--w-3-4"></div>
      </div>
      <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-full"></div>
    </div>
  );
}

export function SkeletonCardContent() {
  return (
    <div className="skeleton-card-content">
      <div className="skeleton-card-content__title">
        <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-40"></div>
      </div>
      <div className="skeleton-card-content__body">
        <div className="skeleton-bar skeleton-bar--h-4 skeleton-bar--w-full"></div>
        <div className="skeleton-bar skeleton-bar--h-4 skeleton-bar--w-5-6"></div>
        <div className="skeleton-bar skeleton-bar--h-4 skeleton-bar--w-4-6"></div>
      </div>
    </div>
  );
}

export function SkeletonChecklistSection() {
  return (
    <div className="skeleton-checklist">
      <div className="skeleton-checklist__header">
        <div className="skeleton-checklist__header-left">
          <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-5"></div>
          <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-40"></div>
          <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-20 skeleton-bar--rounded"></div>
        </div>
      </div>
      <div className="skeleton-checklist__body">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton-checklist__item">
            <div className="skeleton-bar skeleton-bar--h-6 skeleton-bar--w-6"></div>
            <div className="skeleton-checklist__item-content">
              <div className="skeleton-bar skeleton-bar--h-4 skeleton-bar--w-3-4"></div>
              <div className="skeleton-bar skeleton-bar--h-3 skeleton-bar--w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
