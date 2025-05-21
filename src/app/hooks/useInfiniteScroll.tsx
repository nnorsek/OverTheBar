import { useRef, useCallback, useEffect } from "react";

const useInfiniteScroll = (onLoadMore: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        onLoadMore();
      }
    },
    [onLoadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "100px",
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return ref;
};

export default useInfiniteScroll;
