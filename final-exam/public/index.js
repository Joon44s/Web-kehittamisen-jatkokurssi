// --- DOM-elementit ---
const customerForm = document.getElementById("customer-form");
const customerList = document.getElementById("customer-list");

// Lomakkeen kentät
const idInput = document.getElementById("customer-id");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const birthDateInput = document.getElementById("birthDate");

// Painikkeet
const btnAdd = document.getElementById("btn-add");
const btnUpdate = document.getElementById("btn-update");
const btnDelete = document.getElementById("btn-delete");
const btnClear = document.getElementById("btn-clear");

/**
 * 1. HAKU (Read): Haetaan asiakkaat palvelimelta ja näytetään ne listassa.
 */
async function loadCustomers() {
    try {
        const res = await fetch("/api/persons");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        customerList.innerHTML = "";

        if (data.length === 0) {
            customerList.innerHTML = "<p>No customers found.</p>";
            return;
        }

        data.forEach(person => {
            const div = document.createElement("div");
            div.className = "customer-card";
            div.innerHTML = `
                <strong>${person.first_name} ${person.last_name}</strong><br>
                <small>${person.email} | ${person.phone || "-"}</small>
            `;

            // 2. VALINTA: Kun asiakasta klikataan, täytetään lomake
            div.addEventListener("click", () => selectCustomer(person));
            customerList.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        customerList.innerHTML = "<p style='color:red;'>Error loading data</p>";
    }
}

/**
 * Täyttää lomakkeen valitun asiakkaan tiedoilla.
 */
function selectCustomer(person) {
    idInput.value = person.id;
    firstNameInput.value = person.first_name;
    lastNameInput.value = person.last_name;
    emailInput.value = person.email;
    phoneInput.value = person.phone || "";
    
    // Muutetaan pvm-muoto YYYY-MM-DD, jotta <input type="date"> ymmärtää sen
    if (person.birth_date) {
        birthDateInput.value = person.birth_date.split('T')[0];
    }

    // Vaihdetaan painikkeet näkyviin
    btnAdd.style.display = "none";
    btnUpdate.style.display = "inline-block";
    btnDelete.style.display = "inline-block";
    btnClear.style.display = "inline-block";
}

/**
 * Tyhjentää lomakkeen ja palauttaa "Add"-tilan.
 */
function resetForm() {
    customerForm.reset();
    idInput.value = "";
    btnAdd.style.display = "inline-block";
    btnUpdate.style.display = "none";
    btnDelete.style.display = "none";
    btnClear.style.display = "none";
}

/**
 * 1️⃣ LISÄÄMINEN (Create)
 */
customerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const newCustomer = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        birth_date: birthDateInput.value
    };

    try {
        const res = await fetch("/api/persons", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCustomer)
        });

        if (res.ok) {
            resetForm();
            loadCustomers();
        }
    } catch (err) {
        console.error("Error adding customer:", err);
    }
});

/**
 * 3️⃣ PÄIVITYS (Update)
 */
btnUpdate.addEventListener("click", async () => {
    const id = idInput.value;
    const updatedCustomer = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        birth_date: birthDateInput.value
    };

    try {
        const res = await fetch(`/api/persons/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCustomer)
        });

        if (res.ok) {
            resetForm();
            loadCustomers();
        }
    } catch (err) {
        console.error("Error updating customer:", err);
    }
});

/**
 * 3️⃣ POISTAMINEN (Delete)
 */
btnDelete.addEventListener("click", async () => {
    const id = idInput.value;
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
        const res = await fetch(`/api/persons/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            resetForm();
            loadCustomers();
        }
    } catch (err) {
        console.error("Error deleting customer:", err);
    }
});

// Peruutus-painike tyhjentää lomakkeen
btnClear.addEventListener("click", resetForm);

// Käynnistetään haku kun sivu latautuu
loadCustomers();