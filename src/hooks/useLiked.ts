import { useEffect, useState } from "react";

function useIsLiked(id: string) {
  const [isLiked, setIsLiked] = useState<string | null>(() =>
    localStorage.getItem(id)
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLiked(localStorage.getItem(id));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [id]);

  const toggleLike = () => {
    if (localStorage.getItem(id)) {
      localStorage.removeItem(id);
    } else {
      localStorage.setItem(id, "true");
    }

    window.dispatchEvent(new StorageEvent("storage"));

    setIsLiked(localStorage.getItem(id));
  };


  return { isLiked, toggleLike };
}

export default useIsLiked;