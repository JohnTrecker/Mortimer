import React, { createContext, useReducer } from 'react';

interface Value {
  id: string | null,
  name: string | null,
}

interface State {
  topic: Value,
  subtopic: Value,
  reference: Value,
}

interface Dispatches {
  updateTopic: (v: Value) => void,
  updateSubtopic: (v: Value) => void,
  updateReference: (v: Value) => void,
}

const initialState: State = {
  topic: {id: null, name: null},
  subtopic: {id: null, name: null},
  reference: {id: null, name: null}
};

function noop() { }

const initialMethods: Dispatches = {
  updateTopic: noop,
  updateSubtopic: noop,
  updateReference: noop,
};

const SelectionStateContext = createContext<State>(initialState)
const SelectionDispatchContext = createContext<Dispatches>(initialMethods)

enum UPDATE {
  topic = "UPDATE_TOPIC",
  subtopic = "UPDATE_SUBTOPIC",
  reference = "UPDATE_REFERENCE"
}

interface Action {
  type: UPDATE,
  payload: State,
}

function selectionReducer(state: State, action: Action) {
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

const SelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(selectionReducer, initialState)


  function updateTopic({id, name}: Value) {
    dispatch({
      type: UPDATE.topic,
      payload: {...initialState, topic: {id, name}}
    });
  }

  function updateSubtopic({id, name}: Value) {
    dispatch({
      type: UPDATE.topic,
      payload: {...state, subtopic: {id, name}, reference: {id: null, name: null}}
    });
  }

  function updateReference({id, name}: Value) {
    dispatch({
      type: UPDATE.topic,
      payload: {...state, reference: {id, name}}
    });
  }

  const dispatchMethods = {
    updateTopic,
    updateSubtopic,
    updateReference,
  };

  return (
    <SelectionStateContext.Provider value={state}>
      <SelectionDispatchContext.Provider value={dispatchMethods}>
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
