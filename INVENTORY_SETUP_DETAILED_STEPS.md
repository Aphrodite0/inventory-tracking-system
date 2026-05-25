# Inventory & Tracking System - Detailed Step-by-Step Setup

## Complete Implementation Guide (12 Steps)

---

## STEP 1: Create the Five Sheets

### 1.1 Open Excel and Create New Workbook
- Open Microsoft Excel
- Create a **New Blank Workbook**
- Save as: `Inventory_Tracking_System.xlsx`

### 1.2 Rename Sheets
- Right-click on `Sheet1` → **Rename** → Type `Dashboard`
- Right-click on empty area → **Insert Sheet** → Create: `Current Inventory`
- Right-click on empty area → **Insert Sheet** → Create: `Transaction History`
- Right-click on empty area → **Insert Sheet** → Create: `Categories Master`
- Right-click on empty area → **Insert Sheet** → Create: `Reports`

**Result:** 5 sheets in order

---

## STEP 2: Set Up Categories Master Sheet (DO THIS FIRST)

This sheet holds all your reference data.

### 2.1 Create Header Row
In row 1, enter these column headers:
```
A1: Item ID
B1: Item Name
C1: Category
D1: Description
E1: SKU/Code
F1: UOM
G1: Reorder Point
H1: Supplier
I1: Active
```

### 2.2 Format Header Row
- Select row 1
- Make **Bold** (Ctrl+B)
- Add background color (light blue)
- Auto-fit columns

### 2.3 Add Sample Data

**Row 2:**
```
A2: P001
B2: Widget A
C2: Product
D2: Standard widget, blue finish
E2: WID-A-001
F2: Units
G2: 20
H2: Supplier X
I2: Yes
```

**Row 3:**
```
A3: E001
B3: Forklift
C3: Equipment
D3: Toyota 8FD25, capacity 2.5T
E3: EQ-FORK-001
F3: Units
G3: 1
H3: Equipment Co
I3: Yes
```

**Row 4:**
```
A4: M001
B4: Steel Plates
C4: Material
D4: Grade A steel, 5mm thick
E4: MAT-STEEL-001
F4: kg
G4: 100
H4: Steel Mills Inc
I4: Yes
```

### 2.4 Add Data Validation - Category Column
- Select cells C2:C1000
- **Data** → **Data Validation**
- Allow: **List**
- Source: `Product,Equipment,Material`
- Click OK

### 2.5 Add Data Validation - UOM Column
- Select cells F2:F1000
- **Data** → **Data Validation**
- Allow: **List**
- Source: `Units,kg,Liters,Meters,Boxes,Pairs`
- Click OK

---

## STEP 3: Set Up Current Inventory Sheet

### 3.1 Create Header Row
In row 1, enter:
```
A1: Item ID
B1: Item Name
C1: Category
D1: Location
E1: UOM
F1: Opening Balance
G1: Current Qty
H1: Reorder Level
I1: Unit Cost
J1: Total Value
K1: Last Updated
```

### 3.2 Format Header Row
- Select row 1
- Make **Bold**
- Add background color (light green)
- Auto-fit columns

### 3.3 Add Sample Data

**Row 2:**
```
A2: P001
B2: Widget A
C2: Product
D2: Warehouse A
E2: Units
F2: 100
G2: (leave blank - formula)
H2: 20
I2: 5.00
J2: (leave blank - formula)
K2: (leave blank - formula)
```

**Row 3:**
```
A3: E001
B3: Forklift
C3: Equipment
D3: Warehouse A
E3: Units
F3: 2
G3: (blank)
H3: 1
I3: 25000
J3: (blank)
K3: (blank)
```

**Row 4:**
```
A4: M001
B4: Steel Plates
C4: Material
D4: Storage B
E4: kg
F4: 500
G4: (blank)
H4: 100
I4: 2.50
J4: (blank)
K4: (blank)
```

### 3.4 Format Number Columns
- Column F: Format as Number (0 decimals)
- Column H: Format as Number (0 decimals)
- Column I: Format as **Currency**
- Column J: Format as **Currency**

Right-click → **Format Cells** → Choose appropriate format

### 3.5 Add Formulas

**Formula for Current Qty (G2):**
```
=F2+SUMIF('Transaction History'!D:D,A2,'Transaction History'!I:I)
```
- Enter in G2, press Enter
- Copy down to G3, G4

**Formula for Total Value (J2):**
```
=G2*I2
```
- Enter in J2, press Enter
- Copy down to J3, J4

**Formula for Last Updated (K2):**
```
=MAX(IF('Transaction History'!D:D=A2,'Transaction History'!B:B))
```
- Enter in K2
- Press **Ctrl+Shift+Enter** (array formula)
- Copy down to K3, K4
- Format column K as **Date**

### 3.6 Freeze Header Row
- Click cell A2
- **View** → **Freeze Panes** → **Freeze Panes**

---

## STEP 4: Set Up Transaction History Sheet

### 4.1 Create Header Row
In row 1, enter:
```
A1: Transaction ID
B1: Date
C1: Time
D1: Item ID
E1: Item Name
F1: Type
G1: Quantity
H1: Previous Balance
I1: New Balance
J1: Reason
K1: User
L1: Department
M1: Reference
N1: Notes
```

### 4.2 Format Header Row
- Select row 1
- Make **Bold**
- Add background color (light yellow)
- Auto-fit columns

### 4.3 Add Sample Transactions

**Row 2 (Purchase IN):**
```
A2: TXN001
B2: 2026-05-25
C2: 09:00
D2: P001
E2: Widget A
F2: IN
G2: 50
H2: 35
I2: 85
J2: Purchase Order
K2: John
L2: Receiving
M2: PO-2026-001
N2: Received shipment
```

**Row 3 (Sales OUT):**
```
A3: TXN002
B3: 2026-05-24
C3: 14:30
D3: P001
E3: Widget A
F3: OUT
G3: 15
H3: 50
I3: 35
J3: Sales Order
K3: Sarah
L3: Sales
M3: SO-2026-045
N3: Order fulfilled
```

**Row 4 (Equipment IN):**
```
A4: TXN003
B4: 2026-05-24
C4: 10:15
D4: E001
E4: Forklift
F4: IN
G4: 1
H4: 1
I4: 2
J4: Equipment Return
K4: Mike
L4: Maintenance
M4: MAINT-89
N4: Returned from repair
```

**Row 5 (Material ADJUSTMENT):**
```
A5: TXN004
B5: 2026-05-23
C5: 16:45
D5: M001
E5: Steel Plates
F5: ADJUSTMENT
G5: -10
H5: 430
I5: 420
J5: Inventory Count
K5: Lisa
L5: Warehouse
M5: CYCLE-2026-Q2
N5: Physical count adjustment
```

### 4.4 Format Date/Time Columns
- Column B: Format as **Date** (MM/DD/YYYY)
- Column C: Format as **Time**

### 4.5 Format Number Columns
- Columns G, H, I: Format as **Number** (0 decimals)

### 4.6 Add Data Validation - Type Column
- Select F2:F1000
- **Data** → **Data Validation**
- Allow: **List**
- Source: `IN,OUT,ADJUSTMENT,RETURN`
- Click OK

### 4.7 Add Data Validation - Department Column
- Select L2:L1000
- **Data** → **Data Validation**
- Allow: **List**
- Source: `Receiving,Sales,Warehouse,Maintenance,Management`
- Click OK

### 4.8 Freeze Header Row
- Click A2
- **View** → **Freeze Panes** → **Freeze Panes**

---

## STEP 5: Set Up Dashboard Sheet

### 5.1 Create Title
- A1: `INVENTORY DASHBOARD`
- Make **Bold**, **Font Size 16**
- Add background color (dark blue), white text

### 5.2 Add Key Metrics Section

In A3:B6:
```
A3: Dashboard Date          B3: =TODAY()
A4: Total Items            B4: =COUNTA('Current Inventory'!A2:A1000)
A5: Total Inventory Value  B5: =SUM('Current Inventory'!J:J)
A6: Low Stock Items        B6: =COUNTIF('Current Inventory'!G:G,"<"&'Current Inventory'!H:H)
```

Format:
- Column A: **Bold**
- B5: **Currency format**
- B4, B6: **Number format**
- B3: **Date format**

### 5.3 Create Low Stock Alerts Section

**A9:** `⚠️ LOW STOCK ALERTS`
Make **Bold**, **Font Size 12**, yellow background

**Row 10 headers:**
```
A10: Item ID
B10: Item Name
C10: Current Qty
D10: Reorder Level
```

### 5.4 Create Recent Transactions Section

**A23:** `📋 RECENT TRANSACTIONS (Last 10)`
Make **Bold**, **Font Size 12**

**Row 24 headers:**
```
A24: Date
B24: Item Name
C24: Type
D24: Qty
E24: User
F24: Reason
```

---

## STEP 6: Set Up Reports Sheet

### 6.1 Inventory Valuation Report

**A1:** `INVENTORY VALUATION REPORT`
Make **Bold**, **Font Size 14**

**Row 3 headers:**
```
A3: Category
B3: Item Count
C3: Total Qty
D3: Total Value
```

**Rows 4-7:**
```
A4: Product
B4: =COUNTIF('Current Inventory'!C:C,"Product")
C4: =SUMIF('Current Inventory'!C:C,"Product",'Current Inventory'!G:G)
D4: =SUMIF('Current Inventory'!C:C,"Product",'Current Inventory'!J:J)

A5: Equipment
B5: =COUNTIF('Current Inventory'!C:C,"Equipment")
C5: =SUMIF('Current Inventory'!C:C,"Equipment",'Current Inventory'!G:G)
D5: =SUMIF('Current Inventory'!C:C,"Equipment",'Current Inventory'!J:J)

A6: Material
B6: =COUNTIF('Current Inventory'!C:C,"Material")
C6: =SUMIF('Current Inventory'!C:C,"Material",'Current Inventory'!G:G)
D6: =SUMIF('Current Inventory'!C:C,"Material",'Current Inventory'!J:J)

A7: TOTAL
B7: =SUM(B4:B6)
C7: =SUM(C4:C6)
D7: =SUM(D4:D6)
```

Format:
- Row 3, Row 7: **Bold**, background color
- Column D: **Currency**

---

## STEP 7: Add Conditional Formatting

### 7.1 Low Stock Alert on Current Inventory
- Select column G (Current Qty) starting from G2
- **Home** → **Conditional Formatting** → **New Rule**
- Select **Formula is**
- Enter: `=G2<H2`
- Set format: Red background, white text
- Click OK

### 7.2 Add Status Column (Optional)
**In Current Inventory sheet:**
- L1: `Status`
- L2: `=IF(G2<H2,"🔴 LOW STOCK","✅ OK")`
- Copy down

---

## STEP 8: Test Your System

### 8.1 Verify Current Inventory Calculations
- Check G2 shows `85` (100 + 50 - 15 from transactions)
- Check J2 shows `$425.00` (85 × $5)

### 8.2 Verify Dashboard Updates
- Check total value shows `$589,600`
- Check low stock shows items below reorder point

### 8.3 Test Adding New Transaction
- Add new row in Transaction History
- Verify Current Inventory updates automatically

---

## STEP 9: Save and Backup

### 9.1 Save Workbook
- Press **Ctrl+S**
- Verify all 5 sheets present

### 9.2 Create Backup
- Save copy with date: `Inventory_Tracking_System_2026-05-25.xlsx`

---

## STEP 10: Add Your Own Data

### 10.1 Delete Sample Items
- Go to **Categories Master**
- Delete rows 2-4

### 10.2 Add Your Items
- Categories Master: Add your actual items
- Current Inventory: Add opening balances
- Save

---

## STEP 11: Set Up User Training

### 11.1 Document Process
- Who enters transactions
- When (daily, weekly)
- Which transactions

### 11.2 Create User Guide
Print this guide for your team

---

## STEP 12: Monitor and Maintain

### 12.1 Daily
- Review Dashboard for low stock alerts

### 12.2 Weekly
- Generate Reports
- Check for discrepancies

### 12.3 Monthly
- Physical inventory count
- Reconcile with system

---

**Your system is ready!**
