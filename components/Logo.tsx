import Image from 'next/image';

// The Ranlanka logo as supplied: the gold and silver drop with the black wordmark (276 x 35).
export function Logo({ priority }: { priority?: boolean }) {
  return <Image className="logo-img" src="/images/logo.png" alt="Ranlanka" width={276} height={35} priority={priority} unoptimized />;
}
