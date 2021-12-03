export const addRequest = (request) => async (dispatch) => {
  dispatch({
    type: "add_request",
    payload: { request: request },
  });
};

export const setLastRequest = (lastRequest) => async (dispatch) => {
  dispatch({
    type: "set_last_request",
    payload: { lastRequest: lastRequest },
  });
};

export const setSelected = (selected) => async (dispatch) => {
  dispatch({
    type: "set_selected",
    payload: { selected: selected },
  });
};

export const setPageNumber = (pageNumber) => async (dispatch) => {
  dispatch({
    type: "set_page_number",
    payload: { pageNumber: pageNumber },
  });
};

export const setSelectedData = (selectedData) => async (dispatch) => {
  dispatch({
    type: "set_selected_data",
    payload: { selectedData: selectedData },
  });
};

export const setListOfCountries = (listOfCountries) => async (dispatch) => {
  dispatch({
    type: "set_list_of_countries",
    payload: { listOfCountries: listOfCountries },
  });
};

export const setAToZ = (aToZ) => async (dispatch) => {
  dispatch({
    type: "set_a_to_z",
    payload: { aToZ: aToZ },
  });
};
