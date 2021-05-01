// Your code here
function createEmployeeRecord(employeeArray) {
    let record = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return record
};

function createEmployeeRecords(arr) {
    return arr.map(function(employeeArray) {
        return createEmployeeRecord(employeeArray)
    })
};

function createTimeInEvent(employeeRecord, timeIn) {
    let date = timeIn.split(' ')[0];
    let time = timeIn.split(' ')[1];

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date,
    })
    return employeeRecord
};

function createTimeOutEvent(employeeRecord, timeIn) {
    let date = timeIn.split(' ')[0];
    let time = timeIn.split(' ')[1];

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date,
    })
    return employeeRecord
};

function hoursWorkedOnDate(employee, day) {
    let startTime = employee.timeInEvents.find(function(e) {
        return e.date === day
    })

    let stopTime = employee.timeOutEvents.find(function(e) {
        return e.date === day
    })
    return (stopTime.hour - startTime.hour) / 100
};

function wagesEarnedOnDate(employee, day) {
    let wageOwed = hoursWorkedOnDate(employee, day) * employee.payPerHour

    return parseFloat(wageOwed.toString())
};

function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let amountPaid = daysWorked.reduce(function(memo, y) {
        return memo + wagesEarnedOnDate(employee, y)
    }, 0)

    return amountPaid;
};

function findEmployeeByFirstName(srcArray, firstName) {
    let matches = srcArray.find(function(e) {
        return e.firstName === firstName
    })
    return matches
};

function calculatePayroll(employeeRecords) {
    let totalPaid = employeeRecords.reduce(function(memo, y) {
        return memo + allWagesFor(y)
    }, 0)

    return totalPaid;
};