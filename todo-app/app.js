// Enhanced Inventory Tracking System with Local Storage
class InventorySystem {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('items')) || [];
        this.categories = JSON.parse(localStorage.getItem('categories')) || [];
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.currentTab = 'items';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCategories();
        this.renderItems();
        this.renderTransactions();
        this.updateStats();
        this.populateCategoryDropdown();
        this.setTodayDate();
    }

    setupEventListeners() {
        document.getElementById('itemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });

        document.getElementById('categoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCategory();
        });

        document.getElementById('trackForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.recordTransaction();
        });
    }

    // ========== CATEGORY MANAGEMENT ==========
    addCategory() {
        const name = document.getElementById('categoryName').value.trim();
        const color = document.getElementById('categoryColor').value;

        if (!name) {
            alert('Please enter a category name');
            return;
        }

        const category = {
            id: Date.now(),
            name: name,
            color: color,
            createdAt: new Date().toISOString()
        };

        this.categories.push(category);
        this.save();
        document.getElementById('categoryForm').reset();
        this.renderCategories();
        this.populateCategoryDropdown();
    }

    deleteCategory(id) {
        if (confirm('Delete this category? Items will not be deleted.')) {
            this.categories = this.categories.filter(cat => cat.id !== id);
            this.save();
            this.renderCategories();
            this.populateCategoryDropdown();
        }
    }

    renderCategories() {
        const categoryList = document.getElementById('categoryList');
        
        if (this.categories.length === 0) {
            categoryList.innerHTML = '<div class="empty-state"><p>No categories yet.</p></div>';
            return;
        }

        categoryList.innerHTML = this.categories.map(cat => `
            <li class="category-card">
                <div class="card-header">
                    <div class="card-title">
                        <span style="display: inline-block; width: 20px; height: 20px; background: ${cat.color}; border-radius: 4px; margin-right: 10px;"></span>
                        ${cat.name}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-small btn-delete" onclick="inventorySystem.deleteCategory(${cat.id})">Delete</button>
                </div>
            </li>
        `).join('');
    }

    // ========== ITEM MANAGEMENT ==========
    addItem() {
        const name = document.getElementById('itemName').value.trim();
        const category = document.getElementById('itemCategory').value;
        const quantity = parseInt(document.getElementById('itemQuantity').value);
        const description = document.getElementById('itemDescription').value.trim();

        if (!name || !category) {
            alert('Please fill in all required fields');
            return;
        }

        const item = {
            id: Date.now(),
            name: name,
            category: category,
            quantity: quantity,
            quantityTaken: 0,
            description: description,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        this.items.push(item);
        this.save();
        document.getElementById('itemForm').reset();
        this.renderItems();
        this.updateStats();
    }

    deleteItem(id) {
        if (confirm('Delete this item?')) {
            this.items = this.items.filter(item => item.id !== id);
            this.transactions = this.transactions.filter(trans => trans.itemId !== id);
            this.save();
            this.renderItems();
            this.renderTransactions();
            this.updateStats();
        }
    }

    renderItems() {
        const itemList = document.getElementById('itemList');

        if (this.items.length === 0) {
            itemList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><p>No items yet. Add an item to get started!</p></div>';
            return;
        }

        itemList.innerHTML = this.items.map(item => {
            const category = this.categories.find(c => c.id === parseInt(item.category));
            const categoryName = category ? category.name : 'Unknown';
            const categoryColor = category ? category.color : '#999';
            const available = item.quantity - item.quantityTaken;
            const status = available > 0 ? 'available' : 'taken';

            return `
                <li class="item-card">
                    <div class="card-header">
                        <div class="card-title">${item.name}</div>
                        <span class="card-badge ${status}">${available > 0 ? 'Available' : 'All Taken'}</span>
                    </div>
                    <div class="card-info">
                        <div>📂 Category: <strong>${categoryName}</strong></div>
                        <div>📦 Total Quantity: <strong>${item.quantity}</strong></div>
                        <div>🏷️ Available: <strong style="color: #4ecdc4;">${available}</strong></div>
                        <div>✋ Taken: <strong style="color: #ff6b6b;">${item.quantityTaken}</strong></div>
                        ${item.description ? `<div>📝 ${item.description}</div>` : ''}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-small btn-track" onclick="inventorySystem.openTrackModal(${item.id}, '${item.name}', ${available})">📤 Mark as Taken</button>
                        <button class="btn btn-small btn-delete" onclick="inventorySystem.deleteItem(${item.id})">Delete</button>
                    </div>
                </li>
            `;
        }).join('');
    }

    // ========== TRANSACTION MANAGEMENT ==========
    openTrackModal(itemId, itemName, available) {
        if (available <= 0) {
            alert('No items available to take');
            return;
        }

        document.getElementById('trackItemId').value = itemId;
        document.getElementById('trackQuantity').max = available;
        document.getElementById('trackQuantity').value = 1;
        document.getElementById('trackModal').classList.add('active');
    }

    recordTransaction() {
        const itemId = parseInt(document.getElementById('trackItemId').value);
        const personName = document.getElementById('personName').value.trim();
        const quantity = parseInt(document.getElementById('trackQuantity').value);
        const date = document.getElementById('trackDate').value;
        const notes = document.getElementById('trackNotes').value.trim();

        if (!personName || !date) {
            alert('Please fill in all required fields');
            return;
        }

        const item = this.items.find(i => i.id === itemId);
        if (!item) {
            alert('Item not found');
            return;
        }

        // Update item quantity
        item.quantityTaken += quantity;
        item.lastModified = new Date().toISOString();

        // Create transaction record
        const transaction = {
            id: Date.now(),
            itemId: itemId,
            itemName: item.name,
            personName: personName,
            quantity: quantity,
            date: date,
            time: new Date().toLocaleTimeString(),
            notes: notes,
            recordedAt: new Date().toISOString()
        };

        this.transactions.unshift(transaction);
        this.save();
        this.closeModal('trackModal');
        document.getElementById('trackForm').reset();
        this.renderItems();
        this.renderTransactions();
        this.updateStats();
    }

    renderTransactions() {
        const transactionList = document.getElementById('transactionList');

        if (this.transactions.length === 0) {
            transactionList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><p>No transactions yet.</p></div>';
            return;
        }

        transactionList.innerHTML = this.transactions.map(trans => `
            <li class="transaction-card">
                <div class="card-header">
                    <div class="card-title">${trans.itemName}</div>
                    <span class="card-badge">${trans.quantity} unit(s)</span>
                </div>
                <div class="card-info">
                    <div>👤 <strong>${trans.personName}</strong></div>
                    <div>📅 ${new Date(trans.date).toLocaleDateString()}</div>
                    <div>🕐 ${trans.time}</div>
                    ${trans.notes ? `<div>📝 ${trans.notes}</div>` : ''}
                </div>
            </li>
        `).join('');
    }

    // ========== UTILITIES ==========
    populateCategoryDropdown() {
        const select = document.getElementById('itemCategory');
        const currentValue = select.value;

        select.innerHTML = '<option value="">Select a category...</option>' +
            this.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');

        if (currentValue) {
            select.value = currentValue;
        }
    }

    updateStats() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const itemsTaken = this.items.reduce((sum, item) => sum + item.quantityTaken, 0);
        const itemsAvailable = totalItems - itemsTaken;

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('itemsTaken').textContent = itemsTaken;
        document.getElementById('itemsAvailable').textContent = itemsAvailable;
        document.getElementById('totalTransactions').textContent = this.transactions.length;
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('trackDate').value = today;
    }

    save() {
        localStorage.setItem('items', JSON.stringify(this.items));
        localStorage.setItem('categories', JSON.stringify(this.categories));
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
}

// ========== GLOBAL FUNCTIONS ==========
let inventorySystem;

document.addEventListener('DOMContentLoaded', () => {
    inventorySystem = new InventorySystem();
});

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function switchTab(tabName) {
    document.querySelectorAll('#items, #transactions').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const trackModal = document.getElementById('trackModal');
    if (event.target === trackModal) {
        trackModal.classList.remove('active');
    }
});
