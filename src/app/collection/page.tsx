import type { Metadata } from "next";
import CollectionView from "@/components/CollectionView";

export const metadata: Metadata = {
  title: "Collection",
  description: "Forty-nine pieces of 22 karat gold jewellery in eight cases: necklaces, bangles, earrings, rings, pendants, chains, bracelets and mangalsutras.",
};

export default function CollectionPage() {
  return <CollectionView />;
}
