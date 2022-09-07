import { useEffect } from "react";
import { CheckCircle, Error, Info } from "@mui/icons-material";
import { motion } from "framer-motion";
import "./Styles.css";

export default function ({ props }) {
  const {
    toastInfo,
    toastInfo: { type },
    setToastInfo,
  } = props;

  const variants = {
    hidden: {
      x: "100vw",
    },
    active: {
      x: 0,
    },
  };

  useEffect(() => {
    if (toastInfo.isOpen) {
      const removeToast = setTimeout(() => {
        setToastInfo((prevState) => {
          return { ...prevState, isOpen: false };
        });
      }, 3000);

      return () => {
        clearTimeout(removeToast);
      };
    }
  }, [toastInfo]);

  return (
    <motion.div
      className="toast-wrapper"
      style={{
        backgroundColor:
          type === "info"
            ? "#1e95d6"
            : type === "success"
            ? "#43a047"
            : "#d84646",
      }}
      variants={variants}
      initial="hidden"
      animate={toastInfo.isOpen ? "active" : "hidden"}
    >
      {type === "success" && <CheckCircle fontSize="small" />}
      {type === "error" && <Error fontSize="small" />}
      {type === "info" && <Info />}
      <div className="toast-message">{toastInfo.message} !</div>
    </motion.div>
  );
}
