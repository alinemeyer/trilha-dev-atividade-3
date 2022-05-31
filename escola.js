const teachers = [];
const classes = [];
const students = [];

// Métodos

const isStudentRegistered = (studentId) => students.findIndex(student => student.id === studentId) !== -1;

const isClassRegistered = (classId) => classes.findIndex(classAux => classAux.id === classId) !== -1;

const isTeacherRegistered = (teacherId) => teachers.findIndex(teacher => teacher.id === teacherId) !== -1;

const getTeacherById = (teacherId) => teachers.find(teacher => teacher.id === teacherId);

const getClassById = (classId) => classes.find(classAux => classAux.id === classId);

const getStudentById = (studentId) => students.find(student => student.id === studentId);

function addClass(classId, name, teachersId) {
  if(!isClassRegistered(classId)) {
    const teachers = teachersId.map(teacherId => getTeacherById(teacherId)).filter(el => el !== undefined);
    classes.push({ id: classId, name, teachers, students: [] });
  }
}

function addStudent(studentId, name, email, age, classId) {
  if(isClassRegistered(classId))
    if(!isStudentRegistered(studentId)) {
      const student = { id: studentId, name, email, age, classId };
      getClassById(classId).students.push(student);
      students.push(student);
  }
}

function addTeacher(teacherId, name, email, age) {
  if(!isTeacherRegistered(teacherId))
    teachers.push({ id: teacherId, name: name, email, age });
}

function removeTeacher(teacherId) {
  if(isTeacherRegistered(teacherId)) {
    const teacherIndex = teachers.findIndex(teacher => teacher.id === teacherId);
    teachers.splice(teacherIndex, 1);

    classes.forEach(classAux => {
      classAux.teachers = classAux.teachers.filter(teacher => teacher.id !== teacherId);
    });
  }
}

function removeStudent(studentId) {
  if(isStudentRegistered(studentId)) {
    const studentIndex = students.findIndex(student => student.id === studentId);
    students.splice(studentIndex, 1);

    classes.forEach(classAux => {
      classAux.students = classAux.students.filter(student => student.id === studentId);
    });
  }
}

function removeClass(classId) {
  if(isClassRegistered(classId)) {
    const classIndex = classes.find(classAux => classAux.id === classId);
    classes.splice(classIndex, 1);
  }
}

// Funções auxiliares
function expect(assert, value, description) {
  if(assert === value){
    console.log(`${description} - OK`);
  } else {
    console.error(`${description} - NOT OK`);
  }
}


// Execução do programa
addTeacher(1, 'João', 'joao@gmail.com', 38);
expect(teachers[0].name, 'João', 'Deve possuir professor João no array de professores');
expect(teachers[0].email, 'joao@gmail.com', 'Deve possuir e-mail do professor João');
expect(teachers[0].age, 38, 'Deve possuir idade do professor João');

addTeacher(1, 'João', 'joao@gmail.com', 38);
expect(teachers.length, 1, 'Deve impedir de cadastrar professores com o mesmo ID');

addClass(1, 'Turma 2022', [1,2,3]);
expect(classes[0].name, 'Turma 2022', 'Deve possuir Turma 2022 no array de turmas');
expect(classes[0].teachers.length, 1, 'Deve possuir apenas 1 professor cadastrado para Turma 2022');
expect(classes[0].teachers[0].name, 'João', 'Deve possuir professor João na Turma 2022');
expect(classes[0].students.length, 0, 'Deve possuir nenhum aluno');

addClass(1, 'Turma 2023', [1]);
expect(classes.length, 1, 'Deve impedir de cadastrar turmas com o mesmo ID');

addStudent(1, 'Higor', 'higor@gmail.com', 20, 1);
expect(students[0].name, 'Higor', 'Deve possuir Higor no array de alunos');
expect(students[0].email, 'higor@gmail.com', 'Deve possuir e-mail de Higor');
expect(students[0].age, 20, 'Deve possuir idade de Higor');
expect(students[0].classId, 1, 'Deve possuir turma de Higor');
expect(classes[0].students.length, 1, 'Deve possuir apenas um aluno');
expect(classes[0].students[0].name, 'Higor', 'Deve possuir aluno chamado Higor');

addStudent(1, 'Pedro', 'pedro@gmail.com', 25, 1);
expect(students.length, 1, 'Deve impedir de cadastrar alunos com o mesmo ID');

addStudent(2, 'Pedro', 'pedro@gmail.com', 25, 1);
expect(students[1].name, 'Pedro', 'Deve possuir Pedro no array de alunos');
expect(students[1].email, 'pedro@gmail.com', 'Deve possuir e-mail de Pedro');
expect(students[1].age, 25, 'Deve possuir idade de Pedro');
expect(students[1].classId, 1, 'Deve possuir turma de Pedro');
expect(classes[0].students.length, 2, 'Deve possuir dois alunos');
expect(classes[0].students[1].name, 'Pedro', 'Deve possuir aluno chamado Pedro');

removeTeacher(1);
expect(teachers.length, 0, 'Deve remover professor de ID 1');
expect(classes[0].teachers.length, 0, 'Deve remover professor da turma que ele leciona');

removeStudent(1);
expect(students.length, 1, 'Deve remover aluno de ID 1');
expect(classes[0].students.length, 1, 'Deve remover aluno da turma que ele faz parte');

removeClass(1);
expect(classes.length, 0, 'Deve remover turma de ID 1');
expect(students[0].classId, 1, 'Deve remover turma do aluno');