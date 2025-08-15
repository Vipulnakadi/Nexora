document.addEventListener('DOMContentLoaded', () => {

    // --- Admin Panel Elements ---
    const adminTrigger = document.getElementById('admin-trigger');
    const adminModal = document.getElementById('admin-modal');
    const closeModalButton = adminModal.querySelector('.close-button');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPanel = document.getElementById('admin-panel');
    const logoutButton = document.getElementById('logout-button');
    const downloadButton = document.getElementById('download-excel');
    
    // --- Check login status on page load ---
    if (sessionStorage.getItem('nexoraAdminLoggedIn') === 'true') {
        showAdminPanel();
    }

    // --- Event Listeners ---
    adminTrigger.addEventListener('click', () => {
        adminModal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginError = document.getElementById('login-error');

        // Basic authentication
        if (username === 'NeXoRa' && password === 'NeXoRaItTaR') {
            sessionStorage.setItem('nexoraAdminLoggedIn', 'true');
            loginError.textContent = '';
            adminModal.style.display = 'none';
            showAdminPanel();
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });
    
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('nexoraAdminLoggedIn');
        adminPanel.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    downloadButton.addEventListener('click', downloadOrdersAsExcel);

    // --- Admin Panel Functions ---
    function showAdminPanel() {
        adminPanel.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        renderOrdersTable();
    }
    
    function renderOrdersTable() {
        const ordersTbody = document.getElementById('orders-tbody');
        const orders = JSON.parse(localStorage.getItem('nexoraOrders')) || [];
        
        if (orders.length === 0) {
            ordersTbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No orders found.</td></tr>';
            return;
        }

        ordersTbody.innerHTML = orders.reverse().map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer.name}</td>
                <td>${order.customer.email}</td>
                <td>${order.customer.phone}</td>
                <td>${order.customer.address}</td>
                <td>${order.items.map(p => `${p.name} (x${p.quantity})`).join('<br>')}</td>
                <td>₹${order.total.toLocaleString('en-IN')}</td>
                <td>${new Date(order.date).toLocaleDateString()}</td>
            </tr>
        `).join('');
    }

    function downloadOrdersAsExcel() {
        const orders = JSON.parse(localStorage.getItem('nexoraOrders')) || [];
        if (orders.length === 0) {
            alert("No orders to download.");
            return;
        }

        // Flatten the data for Excel
        const flattenedData = orders.map(order => ({
            'Order ID': order.id,
            'Date': new Date(order.date).toLocaleString(),
            'Customer Name': order.customer.name,
            'Customer Email': order.customer.email,
            'Customer Phone': order.customer.phone,
            'Shipping Address': order.customer.address,
            'Products': order.items.map(p => `${p.name} (Qty: ${p.quantity})`).join(', '),
            'Total Amount (INR)': order.total
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        // Set column widths
        worksheet['!cols'] = [
            { wch: 15 }, // Order ID
            { wch: 20 }, // Date
            { wch: 20 }, // Customer Name
            { wch: 25 }, // Customer Email
            { wch: 15 }, // Customer Phone
            { wch: 40 }, // Shipping Address
            { wch: 50 }, // Products
            { wch: 20 }  // Total Amount
        ];

        XLSX.writeFile(workbook, "NeXoRa_Ittar_Orders.xlsx");
    }
});
