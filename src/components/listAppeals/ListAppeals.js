import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { loadedGetData } from "../../actions/actionsGetData";
import { deleteAppeal } from "../../actions/actionsDeleteData";
import { infoId } from "../../actions/actionsPatchData";
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";

import "./listAppeals.scss";

const ListAppeals = () => {
  const [anim, setAnim] = useState(false);
  const animref = useRef(null);

  const appeals = useSelector((state) => state.reducerGetData.appeals);
  const deleteId = useSelector((state) => state.reducerDeleteData.id);
  const filters = useSelector((state) => state.reducerGetData.filters);
  const dispatch = useDispatch();
  const { getData } = useHttp();

  useEffect(() => {
    setAnim(true);

    getData("http://localhost:3001/appeals").then((data) =>
      dispatch(loadedGetData(data))
    );
  }, [deleteId, filters]);

  const filterOfSearch = (appeals) => {
    return appeals.filter((appeal) =>
      appeal.responsible.includes(filters.search)
    );
  };
  const filterOfType = (appeals) => {
    switch (filters.filterType) {
      case "все":
        return appeals;
      case "предоставление доступа":
        return appeals.filter(
          (appeal) => appeal.type === "предоставление доступа"
        );
      case "изменение доступа":
        return appeals.filter((appeal) => appeal.type === "изменение доступа");
      case "закрытие доступа":
        return appeals.filter((appeal) => appeal.type === "закрытие доступа");
      default:
        break;
    }
  };
  const filterOfIndicator = (appeals) => {
    switch (filters.filterIndicator) {
      case "все":
        return appeals;
      case "назначен":
        return appeals.filter((appeal) => appeal.indicator === "назначен");
      case "исполняется":
        return appeals.filter((appeal) => appeal.indicator === "исполняется");
      case "закрыт":
        return appeals.filter((appeal) => appeal.indicator === "закрыт");
      default:
        break;
    }
  };

  const showAppeals = (appeals) => {
    if (appeals.length === 0) {
      return <Spinner />;
    } else {
      const valueFilterOfSearch = filterOfSearch(appeals);
      const valueFilterOfType = filterOfType(valueFilterOfSearch);
      const valueFilterOfIndicator = filterOfIndicator(valueFilterOfType);
      return valueFilterOfIndicator.map((appeal) => {
        return <Appeal key={appeal.id} appeals={appeal} />;
      });
    }
  };

  return (
    <CSSTransition animref={animref} in={anim} timeout={1000} classNames="anim">
      <div className="appeals__items" ref={animref}>
        {showAppeals(appeals)}
      </div>
    </CSSTransition>
  );
};

const Appeal = (props) => {
  const { indicator, id, type, description, responsible } = props.appeals;
  const modefineId = id.slice(0, 11) + "...";
  const modefineType = type.slice(0, 11) + "...";
  const modefineDescription = description.slice(0, 31) + "...";

  const dispatch = useDispatch();
  const { deleteData } = useHttp();

  const onDeleteAppeal = () => {
    dispatch(deleteAppeal(id));
    deleteData("http://localhost:3001/appeals/" + id, "DELETE").catch(
      (data) => {
        console.log(data);
      }
    );
  };

  const onInfoAppeal = () => {
    dispatch(infoId(id));
  };

  return (
    <div className="appeals__item item">
      <div className="item__ind">{indicator}</div>
      <NavLink
        to={`/info/${id}`}
        className={() => "item__id"}
        onClick={onInfoAppeal}
      >
        {modefineId}
      </NavLink>
      <div className="item__type">{modefineType}</div>
      <div className="item__description">{modefineDescription}</div>
      <div className="item__responsible">{responsible}</div>
      <div className="item__delete" onClick={onDeleteAppeal}>
        &#9746;
      </div>
    </div>
  );
};

export default ListAppeals;
