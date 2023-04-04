import React, { useRef } from "react";

// APIs
import { APIs } from "../../APIs/APIs";

// React Router
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Context
import { useMovieContext } from "../../context/context";

// components
import Card from "../Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Sort/Sort";
import Loading from "../../other/Loading/Loading";
import Error from "../../other/Error/Error";

// data
import { iconsData } from "../../data/icons";

// other
import Switch from "../../other/Switch/Switch";

const List = ({ type, playerRef, playerInnerRef }) => {
  const { mode, index, setIndex } = useMovieContext();

  let list = "";
  let loading = "";
  let error = "";
  let user = "";
  let option = sessionStorage.getItem("option");

  if (type === "movie") {
    list = useSelector((state) => state.movies.sortedMovies);
    loading = useSelector((state) => state.movies.loading);
    error = useSelector((state) => state.movies.error);
    user = useSelector((state) => state.savedMovies.user);
  } else {
    list = useSelector((state) => state.tvShows.sortedShows);
    loading = useSelector((state) => state.tvShows.loading);
    error = useSelector((state) => state.tvShows.error);
    user = useSelector((state) => state.savedShows.user);
  }

  const buttonsRef = useRef(null);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  if (user && window.location.pathname === "/watchlist" && error.isError) {
    return (
      <div className="error">
        <Error msg={error.msg} />
      </div>
    );
  }

  if (
    user &&
    window.location.pathname === "/watchlist" &&
    list &&
    list.length === 0
  ) {
    return (
      <div className="error">
        <Error
          msg={
            type === "movie"
              ? "Add movies to watchlist"
              : "Add shows to watchlist"
          }
        />
      </div>
    );
  }

  if (!user && window.location.pathname === "/watchlist") {
    return (
      <div className="error">
        <Error msg={"Login to see your watchlist"} />
      </div>
    );
  }

  if (error.isError) {
    return (
      <div className="error">
        <Error msg={error.msg} />
      </div>
    );
  }

  if (!loading && list && list.length === 0) {
    return (
      <div className="error">
        <Error
          msg={
            type === "movie"
              ? option && option !== null
                ? `No "${sessionStorage
                    .getItem("option")
                    .toUpperCase()}" movies found!`
                : `No movies found!`
              : option !== null
              ? `No "${sessionStorage
                  .getItem("option")
                  .toUpperCase()}" shows found!`
              : `No shows found!`
          }
        />
      </div>
    );
  }

  const previousImage = () => {
    index < 1
      ? setIndex(list.length - 1)
      : setIndex((prevIndex) => prevIndex - 1);
  };

  const nextImage = () => {
    index === list.length - 1
      ? setIndex(0)
      : setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="list">
      {list && list.length > 0 && (
        <>
          <div
            className={"list__wall " + (mode === true ? "lightBg2" : "darkBg1")}
          >
            {list[index].backdrop_path === null ? (
              <span
                className={
                  "list__wall--image-icon-1 " +
                  (mode === true ? "darkColor1" : "lightColor1")
                }
              >
                {iconsData.imageIcon1}
              </span>
            ) : (
              <img
                className="list__wall--image-1"
                src={APIs.img_path + list[index].backdrop_path}
                alt="img"
                load="lazy"
              />
            )}

            {list[index].backdrop_path === null ? (
              <span
                className={
                  "list__wall--image-icon-2 " +
                  (mode === true ? "darkColor1" : "lightColor1")
                }
              >
                {iconsData.imageIcon}
              </span>
            ) : (
              <>
                <img
                  className="list__wall--image-2"
                  src={APIs.img_path_w780 + list[index].backdrop_path}
                  alt="img"
                  load="lazy"
                />

                <img
                  className="list__wall--image-3"
                  src={APIs.img_path_w780 + list[index].backdrop_path}
                  alt="img"
                  load="lazy"
                />
              </>
            )}

            <Link
              to={`/${type}/${list[index] && list[index].id}`}
              className={
                "list__wall__cover " +
                (mode === true
                  ? "lightGradient1 darkColor2"
                  : "darkGradient1 lightColor1")
              }
            >
              <div className="list__wall__cover__inner">
                <div className="list__wall__cover__inner__detail">
                  {list.length > 0 && (
                    <span className="title">
                      {type === "movie" &&
                      list[index].title &&
                      list[index].title.length > 30
                        ? list[index].title.substring(0, 27) + "..."
                        : list[index].title}

                      {type === "tv" &&
                      list[index].name &&
                      list[index].name.length > 30
                        ? list[index].name.substring(0, 27) + "..."
                        : list[index].name}
                    </span>
                  )}

                  <span className="length">
                    {index + 1 + " / " + list.length}
                  </span>

                  <p className="overview">
                    {list[index].overview ? (
                      list[index].overview.length > 245 ? (
                        list[index].overview.substring(0, 248) + " ....."
                      ) : (
                        list[index].overview
                      )
                    ) : (
                      <></>
                    )}
                  </p>
                </div>

                <p className="list__wall__cover__inner--activeOption ">
                  {window.location.pathname !== "/watchlist" &&
                    sessionStorage.getItem("option")}

                  {window.location.pathname === "/watchlist" && "Watchlist"}
                </p>
              </div>
            </Link>

            <div ref={buttonsRef} className="list__wall__buttons">
              {list.length > 1 ? (
                <>
                  <p
                    onClick={() => previousImage(-1)}
                    className={mode === true ? "darkColor1" : "lightColor1"}
                  >
                    <span>{iconsData.prev}</span>
                  </p>

                  <p
                    className={
                      "length " + (mode === true ? "darkColor1" : "lightColor1")
                    }
                  >
                    <span>{index + 1 + " / " + list.length}</span>
                  </p>

                  <p
                    onClick={() => nextImage(1)}
                    className={mode === true ? "darkColor1" : "lightColor1"}
                  >
                    <span>{iconsData.next}</span>
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}

      <div
        className={
          "list__sort-switch-activeOption " +
          (mode === true ? "lightBg2" : "darkBg1")
        }
      >
        {list && list.length > 0 && <Sort type={type} />}

        <p
          className={
            "list__sort-switch-activeOption--activeOption " +
            (mode === true ? "darkColor1" : "lightColor1")
          }
        >
          {window.location.pathname !== "/watchlist" &&
            sessionStorage.getItem("option")}

          {window.location.pathname === "/watchlist" && "Watchlist"}
        </p>

        <div className="switch">{list && list.length > 0 && <Switch />}</div>
      </div>

      <div className="list__movies">
        {list &&
          list.length > 0 &&
          list.map((card, index) => (
            <Card
              key={index}
              card={card}
              type={type}
              user={user}
              playerRef={playerRef}
              playerInnerRef={playerInnerRef}
            />
          ))}
      </div>

      {window.location.pathname !== "/watchlist" && list && list.length > 0 && (
        <div className="pagination">
          <Pagination type={type} />
        </div>
      )}
    </div>
  );
};

export default List;
