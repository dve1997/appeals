import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";

import "./errorPage.scss";
import error from "../../../assets/error.png";

const ErrorPage = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="goods__error" ref={animref}>
        <h3>Возникла ошибка, указанной странцы не существует.</h3>
        <img src={error} alt="error" />
      </div>
    </CSSTransition>
  );
};

export default ErrorPage;
