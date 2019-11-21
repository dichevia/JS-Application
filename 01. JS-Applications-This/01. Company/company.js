class Company{
    constructor(){
        this.departments = [];
    }

    addEmployee(username, salary, position, department){

        if (!username || !salary || !position || !department){
            throw new Error ("Invalid input!");
        }

        if (salary<0){
            throw new Error ("Invalid input!")
        }

        let existingDeparmentIndex = this.departments.findIndex(depart=>depart.name == department)
        
        let newEmployee = {
            "username": username,
            "salary": salary,
            "position": position
        }

        if (existingDeparmentIndex === -1){
            let newDepartment = {
                "name": department,
                "employees": [],
                "sumSalary":0
            }
            this.departments.push(newDepartment);
        }

        existingDeparmentIndex = this.departments.findIndex(depart=>depart.name == department)
        
        this.departments[existingDeparmentIndex].employees.push(newEmployee);
        this.departments[existingDeparmentIndex].sumSalary+=Number(salary);
        

        return `New employee is hired. Name: ${username}. Position: ${position}`
    }

    bestDepartment(){
        let bestDepartmentName = "";
        let bestDepartmentAverageSalary = 0;
        let bestDepartment;

        let output = "";

        this.departments.forEach(department => {
            if (department.sumSalary/department.employees.length>bestDepartmentAverageSalary){
                bestDepartmentName = department.name;
                bestDepartmentAverageSalary = department.sumSalary/department.employees.length;
                bestDepartment = department;
            }
        });
        bestDepartment.employees.sort((a, b)=> b.salary-a.salary || a.username.localeCompare(b.username));
        output+=`Best Department is: ${bestDepartmentName}\n`;
        output+=`Average salary: ${bestDepartmentAverageSalary.toFixed(2)}\n`;
        for (const employee of bestDepartment.employees) {
            output+=`${employee.username} ${employee.salary} ${employee.position}\n`;
        }
        
        return output.trim()
    }

}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());