// ------------ 🌱 PURE REDUX ------------

// import { createStore } from "redux"

// const add = document.getElementById('add');
// const minus = document.getElementById('minus');
// const number = document.querySelector('span');

// number.innerText = 0;

// const ADD = 'ADD';
// const MINUS = 'MINUS';

// const countModifier = (count = 0, action) => {
//   switch (action.type){
//     case ADD:
//       return count + 1;
//     case MINUS:
//       return count - 1;  
//     default:
//       return count;
//   }
// };

// const countStore = createStore(countModifier);

// const onChange = ()=>{
//   number.innerText = countStore.getState()
// }

// countStore.subscribe(onChange)

// const handleAdd = () => {
//   countStore.dispatch({ type: ADD })
// }

// const handleMinus = () => {
//   countStore.dispatch({ type: MINUS })
// }

// add.addEventListener('click',handleAdd)
// minus.addEventListener('click',handleMinus)



// ------------ 📝 Vanilla ToDo ------------
import {createStore} from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"

//action creators
const addToDo = (text) => {
  return {
    type: ADD_TODO, 
    text
  }
}

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}

//reducer
const reducer = (state = [],action) => {
  switch(action.type){
      case ADD_TODO:
        return [{ text: action.text, id: Date.now() },...state];
      case DELETE_TODO:
        return state.filter(toDo => toDo.id !== action.id)
      default:
        return state;
  }
}

//store
const store = createStore(reducer);

//dispatch
const dispatchAddToDo = text => {
  store.dispatch(addToDo(text))
}

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id)
  store.dispatch(deleteToDo(id))
}

const paintToDos = () => {
  const toDos = store.getState()
  ul.innerHTML = ''
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL"
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn)
    ul.appendChild(li);
  })
};

//listen store's chages
store.subscribe(paintToDos)

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo)
}

form.addEventListener("submit",onSubmit)