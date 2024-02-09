import { CSSTransition } from "react-transition-group";
import { useEffect, useState, useRef } from "react";

import "./footerAppeals.scss";

const FooterAppeals = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="appeals__box" ref={animref}>
        <div className="appeals__logo-text">DVE</div>
      </div>
    </CSSTransition>
  );
};

export default FooterAppeals;
