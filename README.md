# 🔥edu-redux-for-beginners
Learning Vanilla-Redux and React-Redux
<br/><br/>
* 노마드코더님의 (초보자를 위한 리덕스 101)[https://nomadcoders.co/redux-for-beginners] 강의를 들으며 작성한 필기노트입니다.
<br/><br/><br/><br/>

# ✏️Pure Redux

## getting start
```
npm install redux
```
* redux를 사용하기 위해 react-redux를 다운받아야한다.

## store
```js
import { createStore } from "redux"
const store = createStore(modifier);
```
* store는 reducer(modifier)를 필요로 한다.
* store에는 4개의 메서드가 들어있다. (dispatch,getState,replaceReducer,subscribe)

## reducer(modifier)
```js
const reducer = (state = defaultValue, action) => {
    switch(action.type){
        case "type":
            return newState;
        default:
            return state;
    }
}
```
* reducer는 data를 modify(수정)하는 function이다.(때문에 modifier라고도 불린다)
* store에 저장된 데이터는 오직 reducer에서만 바꿀 수 있다.
* reducer가 리턴하는게 곧 업데이트된 새로운 데이터가 되어 store에 저장된다.
* 🛑**Never Mutate State!!** return문에서 절대로 state를 직접 변경하지 않는다.꼭 새로운 object 리턴하기( slice || [..arr]⭕️ , push || unshift || pop || shift ❌)
* 💡if문보다 switch문을 사용하는 것이 좋다.

## action
```js
const TYPE = "TYPE"
action = {
    type: TYPE,
    payload: "payload",
    text: "text"
}
```
* action은 redux에서 function을 부를 때 쓰는 두번째 parameter 혹은, argument이다.
* action은 객체이다.
* action은 reducer와 소통하기 위해 필요한 준비물이다.(dispatch에게 심부름 시킬 때 들려보내는 쪽지)
* type외에 다양한 key:value를 정의하여 reducer에 전달할 수 있다.
* 💡action.type은 변수화하면 오타를 내는 오류를 줄일 수 있어서 좋다.
* 💡action을 만드는 action creator 함수를 따로 만들고 액션이 필요한 곳에서 호출하면 더욱 깔끔하다.

## dispatch
```js
store.dispatch(actionCreator)
store.dispatch(action)
```
* dispatch는 store의 메서드이다.
* dispatch는 modifier에 보내는 메세지이다.("내가 보낸 action 보고 store에 있는 data 바꿔줘")
* dispatch에 action을 인자로 넣어 호출하면 리덕스가 자동으로 modifier를 부르고, modifier에 action을 전달한다.

## getState
```js
store.getState()
```
* getState는 store의 메서드이다.
* getState로 store에 저장된 데이터를 읽어올 수 있다.

## subscribe
```js
const onChange = () => {console.log("there was a change on the store")}
store.subscribe(onChange)
```
* subscribe는 store의 메서드이다.
* subscribe로 store안의 변화를 감지할 수 있다.
* 인자로 함수를 받으며, store안의 data가 변경되면 자동으로 그 함수를 실행한다.

<br/><br/><br/><br/>

# ✏️React Redux

## getting start
```
npm install react-redux
```
* react에서 redux를 사용하기 위해 react-redux를 다운받아야한다.

## Provider
```js
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
* Provider에 store를 연결해줘야 한다.

## Connect: mapStateToProps
```js
//TodoList.js

import { connect } from "react-redux";

function TodoList({ todoList }){
    //...
}

function mapStateToProps(state, ownProps) {
  const { todos } = state
  return { todoList: todos.allIds }
}

export default connect(mapStateToProps)(TodoList)
```
* Pure Redux에서 store.getState + store.subscrube를 React Redux에서 대체하는 방법이다.
* connect는 mapStateToProps함수를 이용해, store에 저장되어 있는 state를 Component(TodoList)의 props로 연결해준다.
* mapStateToProps는 통칭이며, 다른이름으로 지정해도 상관없지만, 보통 mapStateToProps로 쓰는게 좋다.
* mapStateToProps는 첫번째 인자로 state를, 두번째 인자로 ownProps를 받는다.
* ownProps는 필요할 경우만 받아서 사용한다.
* mapStateToProps의 인자 state는 store에서 받아온 state이다.
* ownProps는 연결한 Component(TodoList)의 props객체이다.
* mapStateToProps에서 새로운 property를 만들 수 있다.
* mapStateToProps는 object를 리턴해야한다. 리턴된 object가 곧, Component의 새로운 prop으로 추가된다.
* [공식문서링크](https://react-redux.js.org/using-react-redux/connect-mapstate)

## Connect: mapDispatchToProps
```js
//TodoList.js

import { connect } from "react-redux";
import { actionCreators } from "../store"; //action creators함수를 묶은 하나의 객체를 받아온다고 친다.

function TodoList({ todoList, addToDo }){
    //...
}

const mapDispatchToProps = (dispatch) => {
    return { 
        addToDo: (text) => dispatch(actionCreators.addToDo(text))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)
//or if you need mapDispatchToProps only.. export default connect(null,mapDispatchToProps)(TodoList)
```
```js
//TodoList.js
//dispatch를 컴포넌트 안에서 작성하기

function TodoList({ todoList, dispatch }){
    //... dispatch 직접사용
}
//...
export default connect()(TodoList)
//or.. export default connect(null,null)(TodoList)
//or if you need mapStateToProps only.. export default connect(mapStateToProps)(TodoList)

```
* dispatch는 connect의 두번째 인수로 들어간다.
* mapDispatchToProps를 설정하지 않아도, connect()만 사용하면 컴포넌트는 dispatch props를 받는다.
* 하지만 특정된 함수로 dispatch의 기능을 새분하여 사용하면 컴포넌트 안에서 직관적이다. (ex. dispatch -> addToDo)
* mapDispatchToProps는 통칭이며, 다른이름으로 지정해도 상관없지만, 보통 mapDispatchToProps로 쓰는게 좋다.
* mapDispatchToPropss는 첫번째 인자로 dispatch 메서드를, 두번째 인자로 ownProps를 받는다.
* ownProps는 필요할 경우만 받아서 사용한다.
* mapDispatchToProps의 인자 dispatch는 store에서 받아온 dispatch메서드이다.
* ownProps는 연결한 Component(TodoList)의 props객체이다.
* mapDispatchToProps에서 새로운 property로 dispatch함수를 만들 수 있다.
* mapDispatchToProps는 함수를 담은 object를 리턴한다. 리턴된 object가 곧, Component의 새로운 prop으로 추가된다.
* [공식문서링크](https://react-redux.js.org/using-react-redux/connect-mapdispatch)

<br/><br/><br/><br/>

# 🤔more

* createStore 대신에 configureStore을 사용하라는 권고문 뜸