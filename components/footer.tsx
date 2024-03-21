import Link from "next/link";

interface FooterProps {
}

const Footer: React.FC<FooterProps> = ({
}) => {
  return (
    <footer className="fixed z-[2] bottom-0 bg-gray-50 w-full">
      <hr className=" border-gray-200 sm:mx-auto" />
      <div
        className="
            py-4
            w-full
            flex
            flex-row
            justify-center
            gap-4
            md:gap-2
            items-center
            grayscale
          "
      >
        <Link title="Github" href={'https://github.com/nnq-huy'}>
          <p className="text-neutral-600 font-semibold font-mono">DrawCode © 2024 Huy Nguyen </p>
        </Link>
      </div>
    </footer>
  );
}


export default Footer;