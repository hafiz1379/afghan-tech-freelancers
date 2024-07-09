import getCurrentUser from "../utils/getCurentUser";

export const initialState = {
  userId: getCurrentUser()?._id,
  title: "",
  categoryId: "",
  desc: "",
  cover: "",
  price: "",
  images: [],
  shortTitle: "",
  shortDesc: "",
  deliveryTime: "",
  revisionNumber: "",
  features: [],
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };

    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };

    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter((f) => f !== action.payload),
      };

    default:
      return {
        ...state,
      };
  }
};
