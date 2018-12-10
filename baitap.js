const listStudent = [];
class Student {

    constructor(name,age,female) {
        this.name = name;
        this.age = age;
        this.female = female;
    }
    static addStudent(student) {
        listStudent.push(student);
        return listStudent;
    }
    static getStudentByIndex(index) {
        return listStudent[index];
    }
    static getStudentByName(name) {
        const listStudentByName = [];
        for (let i = 0; i<listStudent.length;i++) {
            if (listStudent[i].name === name){
                listStudentByName.push(listStudent[i]);
            }
        }
        if(listStudentByName.length !==0) {
            return listStudentByName;
        }
        return 0;
        

    }
    static deleteStudentByName(name) {
        if (getStudentByName(name)!== false) {
            var i = listStudent.indexOf(name);
            console.log ('xoa thanh cong')
            listStudent.splice(i,1);
            return listStudent;
        } else {
            console.log('khong co');
            return listStudent;

        }
    }
}
var p = new Student('adam', 16, true);
Student.addStudent(p);
var p = new Student('hong', 16, false);
Student.addStudent(p);
Student.getStudentByIndex(1);
Student.getStudentByName('adam');
Student.deleteStudentByName('hong');