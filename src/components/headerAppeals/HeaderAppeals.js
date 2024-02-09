import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState, useRef } from "react";

import "./headerAppeals.scss";
import logo from "../../assets/dve.jpg";

const HeaderAppeals = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="appeals__box" ref={animref}>
        <div className="appeals__loyut-header">
          <div className="appeals__logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="appeals__links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "appeals__link appeals__link-active"
                  : "appeals__link"
              }
            >
              список запросов
            </NavLink>
            <span>/</span>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive
                  ? "appeals__link appeals__link-active"
                  : "appeals__link"
              }
            >
              создать запрос
            </NavLink>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default HeaderAppeals;
