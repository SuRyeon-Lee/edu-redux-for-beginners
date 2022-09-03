import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function Detail({toDos}){
    const { id } = useParams()
    const toDoText = toDos.find(toDo => toDo.id === parseInt(id));
    return (
        <>
            <h1>{toDoText?.text}</h1>
            <h5>Created at: {toDoText?.id}</h5>
        </>
    )
}

function mapStateToProps(state){
    return {toDos: state}
}

export default connect(mapStateToProps)(Detail)