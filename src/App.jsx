import { useState } from 'react'
import './App.css'

function App() {
  const [moduleName, setModuleName] = useState('');

  const [caScore, setCaScore] = useState('');
  const [caMax, setCaMax] = useState('');
  const [caWeight, setCaWeight] = useState('');

  const [examWeight, setExamWeight] = useState('');

  const [targetGrade, setTargetGrade] = useState('');

  const caPercent = 
    caMax > 0 ? (caScore / (caMax)) * 100 : 0;

  const caContribution = 
    caPercent * ((caWeight) / 100);

  const requiredExamPercent =
    Number(examWeight) > 0 ?
    ((targetGrade - caContribution) / (examWeight / 100)) : 0;

  function getStatus(requiredExam) {
    if (requiredExam <= 0) return "Target grade already achieved";
    if (requiredExam <= 40) return "Target grade is safe";
    if (requiredExam <= 60) return "Target grade is achievable";
    if (requiredExam <= 80) return "Target grade is difficult";
    return "Target grade is extremely difficult";
  }

  return (
    <main className="App">
      <h1>GradePilot</h1>
      <p>Calculate the exam score needed to reach your target grade</p>

      <section className="card">
        <h2>Module Calculator</h2>
        
        <label>
          Module Name:
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            placeholder="Comp Sci 101"
          />
        </label>

        <label>
          CA score:
          <input
            type="number"
            value={caScore}
            onChange={(e) => setCaScore(e.target.value)}
            placeholder="85"
          />
        </label>

        <label>
          CA max score:
          <input
            type="number"
            value={caMax}
            onChange={(e) => setCaMax(e.target.value)}
            placeholder="100"
          />
        </label>

        <label>
          CA weight (%):
          <input
            type="number"
            value={caWeight}
            onChange={(e) => setCaWeight(e.target.value)}
            placeholder="40"
          />
        </label>

        <label>
          Exam weight (%):
          <input
            type="number"
            value={examWeight}
            onChange={(e) => setExamWeight(e.target.value)}
            placeholder="60"
          />
        </label>

        <label>
          Target grade (%):
          <input
            type="number"
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value)}
            placeholder="70"
          />
        </label>


        <section className="results">
          <h2>{moduleName || "Results"}</h2>
          <p>Required exam score: {requiredExamPercent.toFixed(1)}%</p>
          <p>Status: {getStatus(requiredExamPercent)}</p>
        </section>
      </section>
    </main>
  );
}

export default App
    
