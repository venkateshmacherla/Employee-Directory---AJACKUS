// ----- State -----
let employees;
let pageLimit = 10; // Default page limit
let searchQuery = '';
let filterDepartment = '';
let filterRole = '';

// Seed data if first load
if (!localStorage.getItem('employees')) {
    employees = getSampleEmployees();
    localStorage.setItem('employees', JSON.stringify(employees));
} else {
    employees = JSON.parse(localStorage.getItem('employees'));
}

// ----- Functions -----
function getSampleEmployees() {
    return [
        { id: 101, firstName: "Alice", lastName: "Smith", email: "alice@company.com", department: "HR", role: "Manager" },
        { id: 102, firstName: "Bob", lastName: "Johnson", email: "bob@company.com", department: "Engineering", role: "Developer" },
        { id: 103, firstName: "Clara", lastName: "Williams", email: "clara@company.com", department: "Finance", role: "Analyst" },
        { id: 104, firstName: "Amit", lastName: "Verma", email: "amit.verma@example.com", department: "Engineering", role: "Frontend Developer" },
        { id: 105, firstName: "Priya", lastName: "Rao", email: "priya.rao@example.com", department: "Design", role: "UX Designer" },
        { id: 106, firstName: "Ravi", lastName: "Patel", email: "ravi.patel@example.com", department: "HR", role: "Recruiter" },
        { id: 107, firstName: "Sneha", lastName: "Kulkarni", email: "sneha.kulkarni@example.com", department: "Finance", role: "Accountant" },
        { id: 108, firstName: "Arjun", lastName: "Mehta", email: "arjun.mehta@example.com", department: "Engineering", role: "Backend Developer" },
        { id: 109, firstName: "Neha", lastName: "Sharma", email: "neha.sharma@example.com", department: "Marketing", role: "Content Strategist" },
        { id: 110, firstName: "Karan", lastName: "Desai", email: "karan.desai@example.com", department: "Engineering", role: "DevOps Engineer" },
        { id: 111, firstName: "Anjali", lastName: "Joshi", email: "anjali.joshi@example.com", department: "Sales", role: "Account Executive" },
        { id: 112, firstName: "Vikas", lastName: "Gupta", email: "vikas.gupta@example.com", department: "Design", role: "Graphic Designer" },
        { id: 113, firstName: "Meena", lastName: "Singh", email: "meena.singh@example.com", department: "Support", role: "Customer Support" },
        { id: 114, firstName: "Farhan", lastName: "Ali", email: "farhan.ali@example.com", department: "Legal", role: "Compliance Officer" },
        { id: 115, firstName: "Divya", lastName: "Chawla", email: "divya.chawla@example.com", department: "Engineering", role: "QA Tester" },
        { id: 116, firstName: "Raj", lastName: "Kapoor", email: "raj.kapoor@example.com", department: "Management", role: "Project Manager" },
        { id: 117, firstName: "Tina", lastName: "D'Souza", email: "tina.dsouza@example.com", department: "Engineering", role: "Full Stack Developer" },
        { id: 118, firstName: "Manish", lastName: "Aggarwal", email: "manish.aggarwal@example.com", department: "IT", role: "System Administrator" },
        { id: 119, firstName: "Lavanya", lastName: "Reddy", email: "lavanya.reddy@example.com", department: "Finance", role: "Auditor" },
        { id: 120, firstName: "Hari", lastName: "Mohan", email: "hari.mohan@example.com", department: "HR", role: "Benefits Coordinator" },
        { id: 121, firstName: "Geeta", lastName: "Malhotra", email: "geeta.malhotra@example.com", department: "Engineering", role: "Tech Lead" },
        { id: 122, firstName: "Siddharth", lastName: "Jain", email: "siddharth.jain@example.com", department: "Marketing", role: "SEO Specialist" },
        { id: 123, firstName: "Rashmi", lastName: "Bhatt", email: "rashmi.bhatt@example.com", department: "Design", role: "Product Designer" }
    ];
}

function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function renderEmployees() {
    const container = document.getElementById('employeeContainer');
    if (!container) return;

    let filtered = employees.filter(e => {
        const matchesSearch = e.firstName.toLowerCase().includes(searchQuery)
            || e.lastName.toLowerCase().includes(searchQuery)
            || e.email.toLowerCase().includes(searchQuery);
        const matchesDept = !filterDepartment || e.department === filterDepartment;
        const matchesRole = !filterRole || e.role === filterRole;
        return matchesSearch && matchesDept && matchesRole;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<p>No employees found.</p>';
        return;
    }

    filtered.slice(0, pageLimit).forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <div class="actions">
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    `;
        container.appendChild(card);
    });
}

function addEmployee() {
    localStorage.removeItem('editEmployeeId');
    window.location.href = 'form.html';
}

function editEmployee(id) {
    localStorage.setItem('editEmployeeId', id);
    window.location.href = 'form.html';
}

function deleteEmployee(id) {
    if (confirm('Delete this employee?')) {
        employees = employees.filter(e => e.id !== id);
        saveEmployees();
        renderEmployees();
        populateFilterOptions();
    }
}

function cancelForm() {
    window.location.href = 'index.html';
}

// ----- Form Page -----
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm');

    // FORM PAGE
    if (form) {
        const editId = localStorage.getItem('editEmployeeId');
        if (editId) {
            const emp = employees.find(e => e.id === parseInt(editId));
            if (emp) {
                form.firstName.value = emp.firstName;
                form.lastName.value = emp.lastName;
                form.email.value = emp.email;
                form.department.value = emp.department;
                form.role.value = emp.role;
            }
        }

        form.addEventListener('submit', e => {
            e.preventDefault();
            const newEmp = {
                firstName: form.firstName.value.trim(),
                lastName: form.lastName.value.trim(),
                email: form.email.value.trim(),
                department: form.department.value.trim(),
                role: form.role.value.trim()
            };

            if (!validateEmployee(newEmp)) {
                document.getElementById('formErrors').innerText = 'Please fill all fields with a valid email.';
                return;
            }

            if (editId) {
                employees = employees.map(emp => emp.id === parseInt(editId) ? { ...emp, ...newEmp } : emp);
                localStorage.removeItem('editEmployeeId');
            } else {
                newEmp.id = Date.now();
                employees.push(newEmp);
                alert("✅ Employee added successfully!");
            }

            saveEmployees();
            window.location.href = 'index.html';
        });
    }

    // INDEX PAGE
    renderEmployees();
    populateFilterOptions();
});

// ----- Filters -----
function toggleFilter() {
    document.getElementById('filterSidebar')?.classList.toggle('hidden');
}

function populateFilterOptions() {
    const deptSelect = document.getElementById('filterDepartment');
    const roleSelect = document.getElementById('filterRole');
    if (!deptSelect || !roleSelect) return;

    const departments = [...new Set(employees.map(e => e.department))];
    const roles = [...new Set(employees.map(e => e.role))];

    deptSelect.innerHTML = `<option value="">All Departments</option>` + departments.map(d => `<option value="${d}">${d}</option>`).join('');
    roleSelect.innerHTML = `<option value="">All Roles</option>` + roles.map(r => `<option value="${r}">${r}</option>`).join('');

    deptSelect.value = filterDepartment;
    roleSelect.value = filterRole;
}

// ----- Search -----
document.getElementById('searchBar')?.addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderEmployees();
});

// ----- Filter Change -----
document.getElementById('filterDepartment')?.addEventListener('change', e => {
    filterDepartment = e.target.value;
    renderEmployees();
});

document.getElementById('filterRole')?.addEventListener('change', e => {
    filterRole = e.target.value;
    renderEmployees();
});

// ----- Page Limit -----
function setPageLimit(value) {
    pageLimit = parseInt(value);
    renderEmployees();
}

// ----- Validation -----
function validateEmployee(emp) {
    return (
        emp.firstName && emp.lastName && emp.email && emp.department && emp.role &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emp.email)
    );
}
