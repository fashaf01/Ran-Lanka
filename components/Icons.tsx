// Thin line icons, drawn on a 24px grid at a 1.3 stroke to match the type.
type P = { className?: string; size?: number };
const svg = (d: React.ReactNode) =>
  function Icon({ className, size = 20 }: P) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {d}
      </svg>
    );
  };

export const SearchIcon = svg(<><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></>);
export const HeartIcon = svg(<path d="M12 20s-7.5-4.6-7.5-10.1A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />);
export const BagIcon = svg(<><path d="M5 8h14l-1 12.5H6L5 8Z" /><path d="M9 10V6.5a3 3 0 0 1 6 0V10" /></>);
export const MenuIcon = svg(<path d="M3.5 8h17M3.5 16h17" />);
export const CloseIcon = svg(<path d="M6 6l12 12M18 6 6 18" />);
export const ArrowLeft = svg(<path d="M14.5 6 8.5 12l6 6" />);
export const ArrowRight = svg(<path d="M9.5 6l6 6-6 6" />);
export const LongArrow = svg(<path d="M3 12h17M15 7l5 5-5 5" />);
export const PlusIcon = svg(<path d="M12 5v14M5 12h14" />);
export const MinusIcon = svg(<path d="M5 12h14" />);
export const ChevronDown = svg(<path d="m6 9.5 6 6 6-6" />);
export const PinIcon = svg(<><path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.8" r="2.3" /></>);
export const PhoneIcon = svg(<path d="M7.3 3.5 9.6 8 7.6 9.8c1.1 2.5 3.1 4.5 5.6 5.6l1.8-2 4.5 2.3-.8 3.8C11.5 19 5 12.5 3.5 4.3l3.8-.8Z" />);
export const ScaleIcon = svg(<><path d="M12 4v16M6 20h12M5 7h14" /><path d="M5 7 2.5 13a3 3 0 0 0 5 0L5 7ZM19 7l-2.5 6a3 3 0 0 0 5 0L19 7Z" /></>);
export const RingIcon = svg(<><circle cx="12" cy="14.5" r="5.5" /><path d="m9.5 6 2.5-2.5L14.5 6 12 9 9.5 6Z" /></>);
export const TruckIcon = svg(<><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="17" cy="17.5" r="1.7" /></>);
export const PencilIcon = svg(<><path d="M4 20l1-4.5L16 4.5l3.5 3.5L8.5 19 4 20Z" /><path d="m14 6.5 3.5 3.5" /></>);
export const InstagramIcon = svg(<><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.8" /><path d="M17 7h.01" /></>);
export const CheckIcon = svg(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const LockIcon = svg(<><rect x="5" y="10.5" width="14" height="10" rx="1.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>);
export const FilterIcon = svg(<path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4.5v5M8 14.5v5" />);
