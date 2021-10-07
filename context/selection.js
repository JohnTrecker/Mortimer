import React, { createContext, useReducer } from 'react';

const SelectionStateContext = createContext()
const SelectionDispatchContext = createContext()

function selectionReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TOPIC':
    case 'UPDATE_SUBTOPIC':
    case 'UPDATE_REFERENCE': {
      return { ...state, ...action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SelectionProvider({ children }) {
  const initialState = { topic: {}, subtopic: {}, reference: {} };
  const [state, dispatch] = useReducer(selectionReducer, initialState)
  return (
    <SelectionStateContext.Provider value={state}>
      <SelectionDispatchContext.Provider value={dispatch}>
        {children}
      </SelectionDispatchContext.Provider>
    </SelectionStateContext.Provider>
  )
}

export {
  SelectionProvider,
  SelectionStateContext,
  SelectionDispatchContext
}
