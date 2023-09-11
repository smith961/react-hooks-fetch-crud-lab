import React from "react";
import QuestionItem from "./QuestionItem"; 

function QuestionList({Questions, deleteItem, changeAnswer}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
        Questions.map((qustion,)=> (
          <QuestionItem key={qustion.id} question={qustion} handleDelete={deleteItem} newCorrectanswer={changeAnswer}/>
        ) )
        }</ul>
    </section>
  );
}

export default QuestionList;