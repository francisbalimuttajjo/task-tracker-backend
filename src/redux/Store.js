import {
  configureStore,
  // createSerializableStateInvariantMiddleware,
  // isPlain,
} from "@reduxjs/toolkit";
// import { Iterable } from "immutable";
import taskReducer from "./TaskReducer";
import userReducer from "./UserReducer";
// import logger from "redux-logger";
// //////////

// const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value);

// const getEntries = (value) =>
//   Iterable.isIterable(value) ? value.entries() : Object.entries(value);

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   isSerializable,
//   getEntries,
// });
export default configureStore({
  reducer: {
    users: userReducer,
    tasks: taskReducer,
    // middleware: [serializableMiddleware],

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  },
});
