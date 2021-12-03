const initState = {
  requests: [], //[["united",united],["a",aData]],
  lastRequest: "",
  selected: false,
  selectedData: {},
  listOfCountries: [],
  aToZ: true,
  pageNumber: 2,
};

const countriesReducers = (state = initState, action) => {
  switch (action.type) {
    case "set_page_number": {
      state.pageNumber = action.payload.pageNumber;
      return { ...state };
    }
    case "set_a_to_z": {
      state.aToZ = action.payload.aToZ;
      return { ...state };
    }
    case "add_request": {
      state.requests = [...state.requests, action.payload.request];
      return { ...state };
    }
    case "set_last_request": {
      state.lastRequest = action.payload.lastRequest;
      return { ...state };
    }
    case "set_list_of_countries": {
      state.listOfCountries = action.payload.listOfCountries;
      return { ...state };
    }
    case "set_selected": {
      state.selected = action.payload.selected;
      return { ...state };
    }
    case "set_selected_data": {
      state.selectedData = action.payload.selectedData;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default countriesReducers;
