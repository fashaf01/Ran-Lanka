// The Ranlanka mark (a gold drop) and wordmark.
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-24 0 140 140" aria-hidden="true">
      <path fill="#C6A15B" d="M69 4C58 22 26 44 12 66C2 82 0 103 6 115C12 126 26 129 40 129C56 129 68 121 72 106C74 97 71 90 66 84C63 90 64 98 61 104C58 110 50 113 41 113C28 113 19 107 19 96C19 84 24 74 31 64C44 46 62 26 69 4Z" />
      <path fill="#D7BA82" d="M42 60C46 69 59 78 59 89C59 98 51 105 41 105C31 105 24 98 24 89C24 78 38 69 42 60Z" />
      <path fill="#b9bec2" d="M52 61C73 59 90 76 90 99C90 121 72 139 48 139C38 139 28 136 21 131C30 133 39 134 47 133C67 131 81 116 81 99C81 82 68 67 52 61Z" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <Mark className="logo-mark" />
      <span className="logo-word">RANLANKA</span>
    </span>
  );
}
