// const members = [
//     {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
//     {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
// ];

// //OLD WAY DEMO - CONSTRUCTOR FUNCTION
// function Employee(firstName, lastName, email, birthdate, salary) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.email = email;
//   this.birthdate = birthdate;
//   this.salary = salary;
// }
// Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
//   return new Employee(firstName, lastName, email, birthdate, salary);
// };
// Employee.prototype.editEmployee = function(updates) {
//   Object.assign(this, updates);
// };
// const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
// console.log(bill);
// bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
// console.log(bill);

/* ========================================================================== */
/* 1. Classes */
/* ========================================================================== */
class Employee {
  constructor(firstName, lastName, email, birthdate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
  }
}

// 2. Instantiate
const ivan = new Employee("Ivan", "Mata", "ivanmata@example.com", "2004-10-27");

// 3. Log object & parts
console.log(ivan);
console.log(ivan.firstName);
console.log(ivan.lastName);
console.log(ivan.email);
console.log(ivan.birthdate);

// 4. Array of Employees
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

// 5. Class methods (Get, Add, Edit)
Employee.prototype.getEmployees = function() {
  return `Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, Birthdate: ${this.birthdate}`;
};
Employee.addEmployee = function(firstName, lastName, email, birthdate) {
  return new Employee(firstName, lastName, email, birthdate);
};
Employee.prototype.editEmployee = function(updates) {
  Object.assign(this, updates);
};
// Test methods
console.log(ivan.getEmployees());
const newEmployee = Employee.addEmployee("Test", "User", "test@example.com", "2000-01-01");
console.log(newEmployee.getEmployees());
newEmployee.editEmployee({ email: "updated@example.com" });
console.log(newEmployee.getEmployees());

// 6. Render table
document.addEventListener("DOMContentLoaded", () => {
  const employeeTable = document.getElementById("employeeTable");
  if (!employeeTable) return;
  employeeTable.innerHTML = "";
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Birthdate</th>
  `;
  employeeTable.appendChild(headerRow);
  employees.forEach(x => {
    const newRow = document.createElement('tr');
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
/* 2. Callbacks — verifyPaymentCb                                             */
/* ========================================================================== */
function verifyPaymentCb(orderTotal, onSuccess, onError) {
  setTimeout(() => {
    if (orderTotal < 5000) {
      onSuccess(`Payment verified for $${orderTotal.toFixed(2)}`);
    } else {
      onError(`$${orderTotal.toFixed(2)} requires manager approval`);
    }
  }, 800);
}
// Tests (callbacks)
verifyPaymentCb(3000, (msg) => console.log(msg), (err) => console.error(err));
verifyPaymentCb(6000, (msg) => console.log(msg), (err) => console.error(err));

/* ========================================================================== */
/* 3. Promises — verifyPaymentPromise                                         */
/* ========================================================================== */
function verifyPaymentPromise(orderTotal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderTotal < 5000) {
        resolve(`Payment verified for $${orderTotal.toFixed(2)}`);
      } else {
        reject(new Error(`$${orderTotal.toFixed(2)} requires manager approval`));
      }
    }, 800);
  });
}
// Tests (Promises)
verifyPaymentPromise(3000)
  .then(msg => console.log(msg))
  .catch(err => console.error(err.message));
verifyPaymentPromise(6000)
  .then(msg => console.log(msg))
  .catch(err => console.error(err.message));

/* ========================================================================== */
/* 4. Async/Await — uses the Promise version                                  */
/* ========================================================================== */
async function handlePayment(total) {
  try {
    const message = await verifyPaymentPromise(total);
    console.log(message);
  } catch (err) {
    console.error(err.message);
  }
}
handlePayment(3000);
handlePayment(6000);
