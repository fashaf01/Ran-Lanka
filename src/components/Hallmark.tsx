export function Hallmark({ value = "916", karat = "22K" }: { value?: string; karat?: string }) {
  return (
    <span className="rl-hm" role="img" aria-label={`${value} hallmark, ${karat.replace("K", " karat")}`}>
      <span className="rl-hm__in" aria-hidden="true">
        <span className="rl-hm__v">{value}</span>
        <span className="rl-hm__k">{karat}</span>
      </span>
    </span>
  );
}
