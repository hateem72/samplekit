import { useSpring, animated } from "@react-spring/web";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Button = ({ title, icon = faArrowRight, className, ...props }) => {
  const [springProps, api] = useSpring(() => ({
    scale: 1,
    y: 0,
    config: { tension: 400, friction: 15 },
  }));

  return (
    <animated.button
      className={clsx(
        "relative flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-background-white shadow-lg transition-colors hover:bg-primary-dark",
        className
      )}
      onMouseEnter={() => api.start({ scale: 1.1, y: -5 })}
      onMouseLeave={() => api.start({ scale: 1, y: 0 })}
      style={springProps}
      {...props}
    >
      <span className="font-display text-sm uppercase tracking-wide">{title}</span>
      <FontAwesomeIcon icon={icon} />
    </animated.button>
  );
};

export default Button;