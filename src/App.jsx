import { useState, useEffect} from 'react'
import './App.css'

import {
  getCaPercent,
  getCaContribution,
  getRequiredExamPercent,
  getStatus
} from './utils/gradeCalculations';

function App() {
  const [moduleName, setModuleName] = useState('');

  const [caScore, setCaScore] = useState('');
  const [caMax, setCaMax] = useState('');
  const [caWeight, setCaWeight] = useState('');

  const [examWeight, setExamWeight] = useState('');

  const [targetGrade, setTargetGrade] = useState('');



  const [modules, setModules] = useState(() => {

    const savedModules = localStorage.getItem('modules');

    if (savedModules) {
      return JSON.parse(savedModules);
    }

    return [];
  });

  
  function addModule() {
    const newModule = {
      id: crypto.randomUUID(),
      moduleName,
      caScore,
      caMax,
      caWeight,
      examWeight,
      targetGrade
    };

    setModules([...modules, newModule]);
  }

  useEffect(() => {
    localStorage.setItem('modules', JSON.stringify(modules));
  }, [modules]);

  const caPercent = getCaPercent(caScore, caMax);

  const caContribution = getCaContribution(
    caPercent, 
    caWeight
  );

  const requiredExamPercent = getRequiredExamPercent(
    targetGrade,
    caContribution,
    examWeight
  );

  const status = getStatus(requiredExamPercent);





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


        <button onClick={addModule}>
          Add Module
        </button>


        <section className="results">
          <h2>{moduleName || "Results"}</h2>

          <p>CA Percentage: {caPercent.toFixed(1)}%</p>
          <p>CA Contribution: {caContribution.toFixed(1)}%</p>
          <p>Required exam score: {requiredExamPercent.toFixed(1)}%</p>
          <p>Status: {status}</p>
        </section>
      </section>

      <section className="card">
        <h2>Your Modules</h2>

        {modules.map((module) => (
          <div key={module.id} className="results">
            <h3>{module.moduleName}</h3>
            <p>CA Score: {module.caScore}</p>
            <p>CA Max: {module.caMax}</p>
            <p>CA Weight: {module.caWeight}%</p>
            <p>Exam Weight: {module.examWeight}%</p>
            <p>Target Grade: {module.targetGrade}%</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App
    
