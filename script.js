// const members = [
//     {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
//     {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
// ];



// //OLD WAY DEMO - CONSTRUCTOR FUNCTION
// function Employee(firstName, lastName, email, birthdate, salary) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.birthdate = birthdate;
//     this.salary = salary;
//   }

//   Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
//     return new Employee(firstName, lastName, email, birthdate, salary);
//   };

//   Employee.prototype.editEmployee = function(updates) {
//     Object.assign(this, updates);
//   };

//   // Usage example:
//   const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
//   console.log(bill);

//   bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
//   console.log(bill);


//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate
class Employee {
  constructor(firstName, lastName, email, birthdate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
  }
}


// 2. Instantiate (i.e. create a new instance) of an Employee with your info and save it to a const with your first name
const ivan = new Employee("Ivan", "Mata", "ivanmata@example.com", "2004-10-27");


// 3. After step 2, console log your const and then try to console.log parts of the object
console.log(ivan); 
console.log(ivan.firstName);
console.log(ivan.lastName);
console.log(ivan.email);
console.log(ivan.birthdate);


// 4. Then create a const array that creates many "new Employee" objects and says to an array.  Console this object as a whole and parts of it
const employees = [
  ivan,
  new Employee("Alice", "Johnson", "aj@example.com", "1990-05-15"),
  new Employee("Bob", "Smith", "bsmith@gmail.com", "1985-08-22"),
  new Employee("Charlie", "Brown", "cbrown@email.com", "1992-11-30")
];
console.log(employees);
console.log(employees[0].firstName);
console.log(employees[1].email);
console.log(employees[2].birthdate);


// 5. Add methods to your class to "getEmployees" which just returns all the fields in the object.
//    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS
Employee.prototype.getEmployees = function() {
  return `Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, Birthdate: ${this.birthdate}`;
};

Employee.addEmployee = function(firstName, lastName, email, birthdate) {
  return new Employee(firstName, lastName, email, birthdate);
};

Employee.prototype.editEmployee = function(updates) {
  Object.assign(this, updates);
};

// Test the methods
console.log(ivan.getEmployees());
const newEmployee = Employee.addEmployee("Test", "User", "test@example.com", "2000-01-01");
console.log(newEmployee.getEmployees());
newEmployee.editEmployee({ email: "updated@example.com" });
console.log(newEmployee.getEmployees());


// 6. Try to get instances of your class object to display in the table.  You can set the innerhtml
//    of the table to be empty and then replace it with the looped-through values of your object
document.addEventListener("DOMContentLoaded", () => {
  const employeeTable = document.getElementById("employeeTable");
  if (!employeeTable) return;

  employeeTable.innerHTML = ""; // Clear existing content

  // Create table header
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Birthdate</th>
  `;
  employeeTable.appendChild(headerRow);

  // Loop through employees and add rows to the table
  employees.forEach(x => {
    const newRow = document.createElement('tr');
    // NOTE: don't nest a <tr> inside a <tr>; just add <td> cells.
    newRow.innerHTML = `
      <td>${x.firstName}</td>
      <td>${x.lastName}</td>
      <td>${x.email}</td>
      <td>${x.birthdate}</td>
    `;
    employeeTable.appendChild(newRow);
  });
});


/* ========================================================================== */
/* Callbacks */
/* ========================================================================== */

function verifyPayment(orderTotal, onSuccess, onError) {
  setTimeout(() => {
    if (orderTotal < 5000) {
      onSuccess(`Payment verified for $${orderTotal.toFixed(2)}`);
    } else {
      onError(`$${orderTotal.toFixed(2)} requires manager approval`);
    }
  }, 800);
}

// Tests
verifyPayment(3000,
  (msg) => console.log(msg),
  (err) => console.error(err)
);

verifyPayment(6000,
  (msg) => console.log(msg),
  (err) => console.error(err)
);
