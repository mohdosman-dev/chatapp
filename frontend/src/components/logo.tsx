import { Link } from "react-router";
import { cn } from "../lib/utils";
import logo from "../assets/logo.svg";

interface LogoProps {
  url?: string;
  showText?: boolean;
  imgClass?: string;
  textClass?: string;
}

const Logo = ({
  url = "/",
  showText = true,
  imgClass = "size-[30px]",
  textClass,
}: LogoProps) => {
  return (
    <Link to={url} className="flex items-center gap-2 w-fit">
      <img src={logo} alt="Whop" className={cn(imgClass)} />
      {showText && (
        <span className={cn("font-semibold text-lg leading-tight", textClass)}>
          Whop.
        </span>
      )}
    </Link>
  );
};

export default Logo;
