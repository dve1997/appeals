import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState, useRef } from "react";

import { setFilters } from "../../actions/actionsGetData";

import "./navAppeals.scss";

const NavAppeals = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  useEffect(() => {
    setAnim(true);
  }, []);

  const filters = useSelector((state) => state.reducerGetData.filters);
  const dispatch = useDispatch();

  const onChange = (e) => {
    switch (e.target.getAttribute("data-type")) {
      case "search":
        dispatch(setFilters({ ...filters, search: e.target.value }));
        break;
      case "type":
        dispatch(
          setFilters({
            ...filters,
            filterType: e.target.getAttribute("data-value"),
          })
        );
        break;
      case "ind":
        dispatch(
          setFilters({
            ...filters,
            filterIndicator: e.target.getAttribute("data-value"),
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="appeals__nav nav" ref={animref}>
        <div className="nav__search">
          <p>Поиск</p>
          <input
            type="text"
            placeholder="поиск"
            data-type="search"
            onChange={(e) => onChange(e)}
            value={filters.search}
          />
        </div>
        <div className="nav__filter-type">
          <p>Сортировка по типу услуги</p>
          <div className="nav__button">
            <button
              className="nav__btn"
              data-type="type"
              data-value="все"
              onClick={(e) => onChange(e)}
            >
              все
            </button>
            <button
              className="nav__btn"
              data-type="type"
              data-value="предоставление доступа"
              onClick={(e) => onChange(e)}
            >
              предоставление доступа
            </button>
            <button
              className="nav__btn"
              data-type="type"
              data-value="изменение доступа"
              onClick={(e) => onChange(e)}
            >
              изменение доступа
            </button>
            <button
              className="nav__btn"
              data-type="type"
              data-value="закрытие доступа"
              onClick={(e) => onChange(e)}
            >
              закрытие доступа
            </button>
          </div>
        </div>
        <div className="nav__filter-ind">
          <p>Сортировка по статусу услуги</p>
          <div className="nav__button">
            <button
              className="nav__btn"
              data-type="ind"
              data-value="все"
              onClick={(e) => onChange(e)}
            >
              все
            </button>
            <button
              className="nav__btn"
              data-type="ind"
              data-value="назначен"
              onClick={(e) => onChange(e)}
            >
              назначен
            </button>
            <button
              className="nav__btn"
              data-type="ind"
              data-value="исполняется"
              onClick={(e) => onChange(e)}
            >
              исполняется
            </button>
            <button
              className="nav__btn"
              data-type="ind"
              data-value="закрыт"
              onClick={(e) => onChange(e)}
            >
              закрыт
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default NavAppeals;
