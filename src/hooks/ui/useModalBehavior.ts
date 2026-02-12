import { useEffect, useState } from 'react'

const useModalBehavior = (onClose: () => void) => {
    const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

   return { isOpen, closeModal };
}

export default useModalBehavior