import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";



function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  // feching data
  const fetchData = async() =>{
      const response = await fetch('http://localhost:4000/questions');
      const data = await response.json() ;
      console.log(data)   
       setQuestions(data)
       console.log(questions)
    }
    useEffect(()=> {
      fetchData()
      console.log(questions)
    },[])
    // Ading new question
    function addQuestion (newData) {
      fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         },
         body: JSON.stringify({
          "prompt": newData.prompt,
          "answers": [newData.answer1,newData.answer2,newData.answer3,newData.answer4],
          "correctIndex": newData.correctIndex
         }),
})
      console.log(newData)
      
    }
function deletequestion(del) {
  fetch(`http://localhost:4000/questions/${del}`, {
    method: 'DELETE',
  })
  fetchData()
}

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm newquestion = {addQuestion} /> : <QuestionList Questions = {questions} 
      deleteItem={deletequestion}
      changeAnswer={handleAnswerChange} />}
    </main>
  );
}

export default App;