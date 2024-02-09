import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";

import { useHttp } from "../../../hooks/http.hook";
import {
  getIndicators,
  getTypes,
  getResponsibles,
} from "../../../actions/actionsGetData";
import { postAppeal } from "../../../actions/actionsPostData";

import "./createAppealPage.scss";

const CreateAppealPage = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  const indicators = useSelector((state) => state.reducerGetData.indicators);
  const types = useSelector((state) => state.reducerGetData.types);
  const responsibles = useSelector(
    (state) => state.reducerGetData.responsibles
  );
  const appeal = useSelector((state) => state.reducerPostData.appeal);
  const dispatch = useDispatch();
  const { getData, postData } = useHttp();
  const typeRef = useRef();
  const descrRef = useRef();
  const respRef = useRef();

  const { allTyp, provision, change, close } = types;
  const { allResp, dve, ddo } = responsibles;

  useEffect(() => {
    setAnim(true);

    getData("http://localhost:3001/indicators").then((data) =>
      dispatch(getIndicators(data))
    );

    getData("http://localhost:3001/types").then((data) =>
      dispatch(getTypes(data))
    );

    getData("http://localhost:3001/responsibles").then((data) =>
      dispatch(getResponsibles(data))
    );
  }, []);

  const onChangeAppeal = (e) => {
    switch (e.target.getAttribute("data-type")) {
      case "type":
        dispatch(
          postAppeal({
            ...appeal,
            type: e.target.value,
            indicator: indicators.appointed,
            id: uuidv4(),
          })
        );
        break;
      case "description":
        dispatch(
          postAppeal({
            ...appeal,
            description: e.target.value,
            indicator: indicators.appointed,
            id: uuidv4(),
          })
        );
        break;
      case "responsible":
        dispatch(
          postAppeal({
            ...appeal,
            responsible: e.target.value,
            indicator: indicators.appointed,
            id: uuidv4(),
          })
        );
        break;
      default:
        break;
    }
  };

  const onAdditionAppeal = () => {
    const data = JSON.stringify(appeal);

    postData("http://localhost:3001/appeals", "POST", data).then((data) =>
      console.log(data)
    );

    typeRef.current.reset();
    descrRef.current.reset();
    respRef.current.reset();
  };

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="appeals__create create" ref={animref}>
        <div className="create__box">
          <div className="create__type">
            <p className="create__field">Выберите тип запроса</p>
            <select
              className="create__meaning"
              data-type="type"
              onChange={(e) => onChangeAppeal(e)}
              ref={typeRef}
            >
              <option value={allTyp}>{allTyp}</option>
              <option value={provision}>{provision}</option>
              <option value={change}>{change}</option>
              <option value={close}>{close}</option>
            </select>
          </div>
          <div className="create__description">
            <p className="create__field">Введите описание запроса</p>
            <textarea
              type="text"
              placeholder="введите описание запроса"
              className="create__meaning"
              data-type="description"
              onChange={(e) => onChangeAppeal(e)}
              value={appeal.description}
              ref={descrRef}
            />
          </div>
          <div className="create__responsible">
            <p className="create__field">Выберите ответственного сотрудника</p>
            <select
              className="create__meaning"
              data-type="responsible"
              onChange={(e) => onChangeAppeal(e)}
              ref={respRef}
            >
              <option value={allResp}>{allResp}</option>
              <option value={dve}>{dve}</option>
              <option value={ddo}>{ddo}</option>
            </select>
          </div>
          <div className="create__button">
            <NavLink
              to="/create"
              className={() => "create__btn"}
              onClick={onAdditionAppeal}
            >
              создать запрос
            </NavLink>
            <NavLink
              to="/"
              className={() => "create__btn"}
              onClick={onAdditionAppeal}
            >
              создать запрос и вернуться к списку запросов
            </NavLink>
            <NavLink to="/" className={() => "create__btn"}>
              вернуться к списку запросов
            </NavLink>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default CreateAppealPage;
