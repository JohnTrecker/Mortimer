import { NEXT_HMR_REFRESH_HEADER } from 'next/dist/client/components/app-router-headers';
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
  updateTopic: (value: Value) => void,
  updateSubtopic: (value: Value) => void,
  updateReference: (value: Value) => void,
  updateSeveral: (values: State) => void,
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
  updateSeveral: noop,
};

const SelectionStateContext = createContext<State>(initialState)
const SelectionDispatchContext = createContext<Dispatches>(initialMethods)

enum UPDATE {
  topic = "UPDATE_TOPIC",
  subtopic = "UPDATE_SUBTOPIC",
  reference = "UPDATE_REFERENCE",
  several = "UPDATE_SEVERAL"
}

interface Action {
  type: UPDATE,
  payload: State,
}

function selectionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'UPDATE_TOPIC':
    case 'UPDATE_SUBTOPIC':
    case 'UPDATE_REFERENCE':
    case 'UPDATE_SEVERAL': {
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

  function updateSeveral(updatedState: State) {
    const newTopic = updatedState.topic.id ? updatedState.topic : state.topic
    const newSubtopic = updatedState.subtopic.id ? updatedState.subtopic : state.subtopic
    const newReference = updatedState.reference.id ? updatedState.reference : state.reference
    dispatch({
      type: UPDATE.several,
      payload: {topic: {...newTopic}, subtopic: {...newSubtopic}, reference: {...newReference}}
    });
  }

  const dispatchMethods = {
    updateTopic,
    updateSubtopic,
    updateReference,
    updateSeveral,
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
