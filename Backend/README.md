
Budget APIs
POST /budget-api/budget ->set specific buget to user
GET  /budget-api/budget->get the buget of user
GET  /budget-api/check-budget->check out of budget or not
PUT /budget-api/updatebudget->To update user budget

Backend
│

├── APIs
│   ├── usersAPI.js
│   ├── expensesAPI.js
│   └── budgetAPI.js
│
├── Models
│   ├── UserModel.js
│   ├── ExpenseModel.js
│   └── BudgetModel.js
│
├── Middlewares
│   └── verifyToken.js
│
└── Services
     └── AuthService.js
