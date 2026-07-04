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
    if (!moduleName.trim()){
      alert('Please enter a module name.');
      return;
  }

  if (moduleName === '' || caScore === '' || caMax === '' || caWeight === '' || examWeight === '' || targetGrade === '') {
    alert('Please fill in all fields.');
    return;
  }

  if (Number(caWeight) > 0 && Number(caMax) <= 0){
    alert('CA max score must be a positive number.');
    return;
  }

  if (Math.abs(Number(caWeight) + Number(examWeight) - 100) > 0.01) {
    alert('CA weight and exam weight must add up to 100%.');
    return;
  }

  if (Number(targetGrade) < 0 || Number(targetGrade) > 100) {
    alert('Target grade must be between 0 and 100.');
    return;
  }

  

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

    setModuleName('');
    setCaScore('');
    setCaMax('');
    setCaWeight('');
    setExamWeight('');
    setTargetGrade('');
  }


  function clearModules(id) {
    setModules(modules.filter(module => module.id !== id));
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


  function getStatusClass(status) {
    if (status === 'Target grade already achieved') return 'status-safe';
    if (status === 'Target grade is safe') return 'status-safe';
    if (status === 'Target grade is achievable') return 'status-doable';
    if (status === 'Target grade is difficult') return 'status-hard';
    if (status === 'Target grade is extremely difficult') return 'status-impossible';
    return '';
  }

  return (
    <main className="App">
      <div className="top-header">
      <h1>GradePilot</h1>
        <p>Calculate the exam score needed to reach your target grade</p>
      </div>

    <div className="columns">
      <aside className="sidebar">
        <h2>Your Modules</h2>

          {modules.map((module) => {
            const moduleCaPercent = getCaPercent(module.caScore, module.caMax);

            const moduleCaContribution = getCaContribution(
              moduleCaPercent, 
              module.caWeight
            );

            const moduleRequiredExamPercent = getRequiredExamPercent(
              module.targetGrade,
              moduleCaContribution,
              module.examWeight
            );
          
            const moduleStatus = getStatus(moduleRequiredExamPercent);

        return(
          <div key={module.id} className="results">
            <h3>{module.moduleName}</h3>
            <p>CA Score: {module.caScore}/{module.caMax}</p>
            <p>Target Grade: {module.targetGrade}%</p>
            <p>Required exam score: {moduleRequiredExamPercent.toFixed(1)}%</p>
            <p>Status: <span className={getStatusClass(moduleStatus)}>{moduleStatus}</span></p>

            <button onClick={() => clearModules(module.id)}>
              Remove Module
            </button>
          </div>
        );
      })}
      </aside>

      <section className="main-content">

    <div className="calculator-layout">
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
      </section>
        
        <section className="results-panel">
          <h2>{moduleName || "Results"}</h2>

          <p>CA Percentage: {caPercent.toFixed(1)}%</p>
          <p>CA Contribution: {caContribution.toFixed(1)}%</p>
          <p>Required exam score: {requiredExamPercent.toFixed(1)}%</p>
          <p>Status: <span className={getStatusClass(status)}>{status}</span></p>
        </section>
      </div>
    </section>
    </div>
    </main>
    )
  }

export default App

