import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { useHttp } from "../../../hooks/http.hook";
import {
  getIndicators,
  getResponsibles,
} from "../../../actions/actionsGetData";
import { infoAppeal } from "../../../actions/actionsPatchData";

import "./infoAppealPage.scss";

const InfoAppealPage = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  const indicators = useSelector((state) => state.reducerGetData.indicators);
  const responsibles = useSelector(
    (state) => state.reducerGetData.responsibles
  );
  const infoId = useSelector((state) => state.reducerPatchData.id);
  const appeal = useSelector((state) => state.reducerPatchData.appeal);
  const dispatch = useDispatch();
  const { getData, patchData } = useHttp();
  const indRef = useRef();
  const respRef = useRef();

  useEffect(() => {
    setAnim(true);

    getData("http://localhost:3001/indicators").then((data) =>
      dispatch(getIndicators(data))
    );

    getData("http://localhost:3001/responsibles").then((data) =>
      dispatch(getResponsibles(data))
    );

    getData("http://localhost:3001/appeals/" + infoId).then((data) =>
      dispatch(infoAppeal(data))
    );
  }, [infoId]);

  const { id, type, description } = appeal;
  const { allInd, appointed, performed, closed } = indicators;
  const { allResp, dve, ddo } = responsibles;

  const onChangeAppeal = (e) => {
    switch (e.target.getAttribute("data-type")) {
      case "indicator":
        dispatch(
          infoAppeal({
            ...appeal,
            indicator: e.target.value,
          })
        );
        break;
      case "responsible":
        dispatch(
          infoAppeal({
            ...appeal,
            responsible: e.target.value,
          })
        );
        break;
      default:
        break;
    }
  };

  const onAdditionAppeal = () => {
    const data = JSON.stringify(appeal);

    patchData("http://localhost:3001/appeals/" + infoId, "PATCH", data).then(
      (data) => console.log(data)
    );

    indRef.current.reset();
    respRef.current.reset();
  };

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="appeals__info info" ref={animref}>
        <div className="info__box">
          <div className="info__ind">
            <p className="info__field">Выберите статус запроса</p>
            <select
              className="info__meaning"
              ref={indRef}
              data-type="indicator"
              onChange={(e) => onChangeAppeal(e)}
            >
              <option value={allInd}>{allInd}</option>
              <option value={appointed}>{appointed}</option>
              <option value={performed}>{performed}</option>
              <option value={closed}>{closed}</option>
            </select>
          </div>
          <div className="info__id">
            <p className="info__field">Номер запроса</p>
            <p className="info__meaning">{id}</p>
          </div>
          <div className="info__type">
            <p className="info__field">Тип запроса</p>
            <p className="info__meaning">{type}</p>
          </div>
          <div className="info__description">
            <p className="info__field">Описание запроса</p>
            <p className="info__meaning">{description}</p>
          </div>
          <div className="info__responsible">
            <p className="info__field">Выберите ответственного сотрудника</p>
            <select
              className="info__meaning"
              ref={respRef}
              data-type="responsible"
              onChange={(e) => onChangeAppeal(e)}
            >
              <option value={allResp}>{allResp}</option>
              <option value={dve}>{dve}</option>
              <option value={ddo}>{ddo}</option>
            </select>
          </div>
          <div className="info__button">
            <NavLink
              to={`/info/${id}`}
              className={() => "info__btn"}
              onClick={onAdditionAppeal}
            >
              сохранить изменения
            </NavLink>
            <NavLink
              to="/"
              className={() => "info__btn"}
              onClick={onAdditionAppeal}
            >
              сохранить изменения и вернуться к списку запросов
            </NavLink>
            <NavLink to="/" className={() => "info__btn"}>
              вернуться к списку запросов
            </NavLink>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default InfoAppealPage;
