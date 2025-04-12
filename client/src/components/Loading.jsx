import { useSpring, animated } from "@react-spring/web";

const Loading = ({ size = "lg", className = "" }) => {
  const styles = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: { duration: 1000 },
  });

  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <animated.div
        style={styles}
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-primary to-secondary p-1`}
      >
        <div className="h-full w-full rounded-full bg-background-white"></div>
      </animated.div>
    </div>
  );
};

export default Loading;