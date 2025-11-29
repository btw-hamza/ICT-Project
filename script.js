document.addEventListener('DOMContentLoaded', function() 
{
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm)
    {
        initializeExpenseTracker();
    }
    const contactForm = document.getElementById('contactForm');
    if (contactForm) 
    {
        initializeContactForm();
    }
    const expenseDateInput = document.getElementById('expenseDate');
    if (expenseDateInput) 
    {
        expenseDateInput.valueAsDate = new Date();
    }
});
function initializeExpenseTracker() 
{
    const form = document.getElementById('expenseForm');
    
    form.addEventListener('submit', function(e) 
    {
        e.preventDefault();
        addExpense();
    });
}
function addExpense()
{
    const name = document.getElementById('expenseName').value.trim();
    const amount = document.getElementById('expenseAmount').value;
    const category = document.getElementById('expenseCategory').value;
    const date = document.getElementById('expenseDate').value;
    if (!name || !amount || !category || !date) 
    {
        alert('Please fill in all fields!');
        return;
    }
    if (amount <= 0) 
    {
        alert('Amount must be greater than 0!');
        return;
    }
    const tableBody = document.getElementById('expenseTableBody');
    const noDataRow = tableBody.querySelector('.no-data');
    if (noDataRow) 
    {
        noDataRow.remove();
    }
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${formatDate(date)}</td>
        <td>${name}</td>
        <td>${category}</td>
        <td class="amount-cell">RS ${parseInt(amount).toLocaleString()}</td>
        <td><button class="delete-btn" onclick="deleteExpense(this)">Delete</button></td>
    `;
    tableBody.appendChild(row);
    updateTotal();
    document.getElementById('expenseForm').reset();
    document.getElementById('expenseDate').valueAsDate = new Date();
    showSuccessMessage('Expense added successfully!');
}
function deleteExpense(button) 
{
    const row = button.closest('tr');
    row.remove();
    updateTotal();
    const tableBody = document.getElementById('expenseTableBody');
    if (tableBody.children.length === 0) 
    {
        tableBody.innerHTML = '<tr class="no-data"><td colspan="5">No expenses added yet. Start tracking!</td></tr>';
    }
    showSuccessMessage('Expense deleted!');
}
function updateTotal() 
{
    const tableBody = document.getElementById('expenseTableBody');
    const rows = tableBody.querySelectorAll('tr:not(.no-data)');
    let total = 0;
    rows.forEach(row => 
    {
        const amountCell = row.querySelector('.amount-cell');
        if (amountCell) 
        {
            const amount = amountCell.textContent.replace('RS ', '').replace(/,/g, '');
            total += parseInt(amount);
        }
    });
    document.getElementById('totalAmount').textContent = `RS ${total.toLocaleString()}`;
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e)
    {
        e.preventDefault();
        submitContactForm();
    });
}
function submitContactForm() 
{
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !email || !message) 
    {
        alert('Please fill in all fields!');
        return;
    }
    if (!isValidEmail(email)) 
    {
        alert('Please enter a valid email address!');
        return;
    }
    if (message.length < 10) 
    {
        alert('Message must be at least 10 characters long!');
        return;
    }
    alert('Message Sent! Thank you for contacting us. We will get back to you soon.');
    document.getElementById('contactForm').reset();
}
function isValidEmail(email)
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function showSuccessMessage(message) 
{
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00E0C7, #4F8CFD);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 224, 199, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(messageDiv);
    setTimeout(() =>
    {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => 
        {
            messageDiv.remove();
        }, 300);
    }, 3000);
}
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut
    {
        from
        {
            transform: translateX(0);
            opacity: 1;
        }
        to 
        {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
