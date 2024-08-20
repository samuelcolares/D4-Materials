import Image from 'next/image';
export default function ImageComponent({
  src,
  alt,
  size = 64,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <div className="flex justify-center items-center">
      <Image src={src} width={size} height={size} alt={alt} className="" />
      <span className="sr-only">{alt}</span>
    </div>
  );
}