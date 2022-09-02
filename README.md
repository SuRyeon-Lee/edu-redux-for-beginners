# 🔥edu-redux-for-beginners
Learning Vanilla-Redux and React-Redux
<br/><br/>
* 노마드코더님의 (초보자를 위한 리덕스 101)[https://nomadcoders.co/redux-for-beginners] 수강일지입니다.
<br/><br/><br/><br/>

# ✏️notes

## store
```js
import { createStore } from "redux"
const store = createStore(modifier);
```
* store는 reducer(modifier)를 필요로 한다.
* store에는 4개의 메서드가 들어있다. (dispatch,getState,replaceReducer,subscribe)

## reducer(modifier)
```js
const modifier = (state = defaultValue, action) => {
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

## action
```js
action = {
    type: "TYPE"
}
```
* action은 redux에서 function을 부를 때 쓰는 두번째 parameter 혹은, argument이다.
* action은 객체이다.
* action은 reducer와 소통하기 위해 필요한 준비물이다.(dispatch에게 심부름 시킬 때 들려보내는 쪽지)

## dispatch
```js
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

# 🤔more

* createStore 대신에 configureStore을 사용하라고 뜨던데 이건뭘까?