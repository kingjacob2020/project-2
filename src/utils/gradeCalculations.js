export function getCaPercent(caScore, caMax){
    return caMax > 0 ? (caScore / (caMax)) * 100 : 0;
}

export function getCaContribution(caPercent, caWeight){
    return caPercent * ((caWeight) / 100);
}

export function getRequiredExamPercent(
    targetGrade,
    caContribution,
    examWeight
){
    return ((targetGrade - caContribution) / (examWeight / 100));
}


  export function getStatus(requiredExam) {
    if (requiredExam <= 0) return "Target grade already achieved";
    if (requiredExam <= 40) return "Target grade is safe";
    if (requiredExam <= 60) return "Target grade is achievable";
    if (requiredExam <= 80) return "Target grade is difficult";
    return "Target grade is extremely difficult";
  }