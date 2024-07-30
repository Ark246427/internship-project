// script.js

// Initialize an empty array to store subject data
let subjects = [];

// Function to add or edit a subject
function addSubject() {
    const subjectInput = document.getElementById("subject");
    const gradeInput = document.getElementById("grade");
    const creditInput = document.getElementById("credit");

    const subject = subjectInput.value.trim();
    const grade = gradeInput.value;
    const credit = parseInt(creditInput.value);

    // Validate input
    if (!subject || !grade || isNaN(credit) || credit <= 0) {
        document.getElementById("inputError").textContent = "Please fill in all fields correctly.";
        return;
    }

    // Check if subject already exists
    const existingSubject = subjects.find((s) => s.subject === subject);
    if (existingSubject) {
        existingSubject.grade = grade;
        existingSubject.credit = credit;
    } else {
        subjects.push({ subject, grade, credit });
    }

    // Clear input fields
    subjectInput.value = "";
    gradeInput.value = "S";
    creditInput.value = "";

    // Update subject list
    updateSubjectList();
}

// Function to update the subject list
function updateSubjectList() {
    const subjectList = document.getElementById("subjectList");
    subjectList.innerHTML = "";

    subjects.forEach((s, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${s.subject}</td>
            <td>${s.grade}</td>
            <td>${s.credit}</td>
            <td>
                <button class="edit" onclick="editSubject(${index})">Edit</button>
                <button class="delete" onclick="deleteSubject(${index})">Delete</button>
            </td>
        `;
        subjectList.appendChild(row);
    });
}

// Function to edit a subject
function editSubject(index) {
    const { subject, grade, credit } = subjects[index];
    document.getElementById("subject").value = subject;
    document.getElementById("grade").value = grade;
    document.getElementById("credit").value = credit;
}

// Function to delete a subject
function deleteSubject(index) {
    subjects.splice(index, 1);
    updateSubjectList();
}

// Function to calculate CGPA
function calculateCGPA() {
    const totalCredits = subjects.reduce((sum, s) => sum + s.credit, 0);
    const totalGradePoints = subjects.reduce((sum, s) => sum + getGradePoint(s.grade) * s.credit, 0);
    const cgpa = (totalGradePoints / totalCredits).toFixed(2);
    document.getElementById("cgpa").textContent = cgpa;
}

// Helper function to map letter grades to grade points
function getGradePoint(grade) {
    switch (grade) {
        case "O": return 10;
        case "A+": return 9;
        case "A": return 8;
        case "B+": return 7;
        case "B": return 6;
        case "C": return 5;
        case "F": return 0;
        default: return 0;
    }
}

// Function to reset the form
function resetForm() {
    subjects = [];
    document.getElementById("cgpa").textContent = "0.00";
    updateSubjectList();
}
