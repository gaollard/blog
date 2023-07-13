// action type
const ARTICLE_GET_NAVS = "ARTICLE/GET_NAVS";
const ARTICLE_GET_MENU = "ARTICLE/GET_MENU";

const defaultState = { navs: [], menus: [] };

export const indexReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ARTICLE_GET_NAVS:
      return {
        navs: action.navs,
      };
    case ARTICLE_GET_MENU:
      return {
        menus: action.menus,
      };
    default:
      return state;
  }
};

export const getIndexList = () => {
  return (dispatch, getState, $axios) => {
    return $axios
      .get("/api/course/list")
      .then((res) => {
        const { list } = res.data;
        dispatch({ type: GET_LIST, list });
      })
      .catch((e) => {
        // 在这里需要捕获错误，才不会出现所有页面都挂了的情况
        console.log(e);
      });
  };
};
