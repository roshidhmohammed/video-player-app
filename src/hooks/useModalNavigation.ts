import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useModalNavigation = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => navigate(-1), 200);
  };

  return { closeModal, isOpen };
};

export default useModalNavigation;
