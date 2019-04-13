// Person Class (Base class)
var Person = function(first, last, age){
    this.name = { first, last }
    this.age = age;
    
    this.getName = this.name.first + " " + this.name.last;
}

var person1 = new Person('Pras', 'As', 27);
console.log("Person name: " + person1.getName);


// Student Class : inherited from Person Class
var Student = function(first, last, age, grade){
    Person.call(this, first, last, age);

    this.grade = grade;
}

Student.prototype.getGrade = function(){
    console.log("call directly");
}

var stud1 = new Student('Prasanna', 'Ashok', 27);
console.log("Student name: " + stud1.getName);
console.log("Grade: " + stud1.getGrade());