import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        // Parameters
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
// Array
let students = [];
do {
    let action = await inquirer.prompt({
        type: 'list',
        name: 'ans',
        message: 'Please select an option\n',
        choices: ['Enroll a student', 'Show student status']
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: 'input',
            name: 'ans',
            message: 'Please enter your name: ',
        });
        let trimedStuentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimedStuentName) === false) {
            if (trimedStuentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\nYour account has been created.");
                console.log(`\nWellcome, ${trimedStuentName}`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course: ",
                    choices: ["IT", "Python", "Java"]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "Pyhon":
                        courseFees = 2000;
                        break;
                    case "IT":
                        courseFees = 1000;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course? "
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimedStuentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("You have enrolled in this course.");
                }
            }
            else {
                console.log("Invalid Name");
            }
        }
        else {
            console.log("This name is already exists.");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: 'list',
                name: 'ans',
                message: 'Please select name',
                choices: studentNameCheck
            });
            let foundStudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log("Student information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue? "
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
