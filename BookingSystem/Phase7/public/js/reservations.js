import { requireAuthOrBlockPage, initAuthUI, getTokenPayload, logout } from './auth-ui.js';

window.logout = logout;

document.addEventListener("DOMContentLoaded", () => {
    if (!requireAuthOrBlockPage()) return;

    initAuthUI();

    const token = localStorage.getItem("token");
    const authHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const payload = getTokenPayload();

    const form = document.getElementById("reservationForm");
    const listContainer = document.getElementById("reservationList");
    const msgEl = document.getElementById("formMessage");
    const statusField = document.getElementById("statusField");

    const inputs = {
        id: document.getElementById("reservationId"),
        resourceId: document.getElementById("resourceId"),
        userId: document.getElementById("userId"),
        startTime: document.getElementById("startTime"),
        endTime: document.getElementById("endTime"),
        note: document.getElementById("note"),
        status: document.getElementById("status")
    };

    const btnSave = document.getElementById("btn-save");
    const btnDelete = document.getElementById("btn-delete");
    const btnCancel = document.getElementById("btn-cancel");

    if (payload && (payload.id || payload.userId)) {
        inputs.userId.value = payload.id || payload.userId;
    }

    fetchReservations();

    function showMessage(msg, isError = false) {
        msgEl.textContent = msg;
        msgEl.classList.remove("hidden");
        msgEl.className = `mt-6 rounded-2xl border px-4 py-3 text-sm font-semibold block transition-all duration-300 ${
            isError
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-brand-green/50 bg-brand-green/10 text-brand-green"
        }`;

        setTimeout(() => {
            msgEl.classList.add("hidden");
            msgEl.classList.remove("block");
        }, 5000);
    }

    function resetForm() {
        form.reset();
        inputs.id.value = "";
        inputs.status.value = "active";

        if (payload && (payload.id || payload.userId)) {
            inputs.userId.value = payload.id || payload.userId;
        }

        btnSave.textContent = "Create Reservation";
        btnDelete.classList.add("hidden");
        btnCancel.classList.add("hidden");
        statusField.classList.add("hidden");
    }

    function formatForInput(isoString) {
        if (!isoString) return "";
        const d = new Date(isoString);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
    }

    async function fetchReservations() {
        try {
            const url = `/api/reservations?_t=${Date.now()}`;
            const res = await fetch(url, { headers: authHeaders, cache: "no-store" });

            if (!res.ok) throw new Error(`Server returned ${res.status} ${res.statusText}`);

            const rawData = await res.json();

            let reservationsArray = [];
            if (Array.isArray(rawData)) {
                reservationsArray = rawData;
            } else if (rawData.data && Array.isArray(rawData.data)) {
                reservationsArray = rawData.data;
            } else if (rawData.reservations && Array.isArray(rawData.reservations)) {
                reservationsArray = rawData.reservations;
            } else {
                throw new Error("API did not return a valid list of reservations.");
            }

            renderList(reservationsArray);
        } catch (error) {
            console.error(error);
            listContainer.innerHTML = `<p class="text-sm font-semibold text-red-500 p-4 bg-red-50 rounded-2xl border border-red-200">Error loading reservations:<br>${error.message}</p>`;
        }
    }

    function renderList(reservations) {
        listContainer.innerHTML = "";

        if (reservations.length === 0) {
            listContainer.innerHTML = '<p class="text-sm text-black/50 p-4">No reservations found.</p>';
            return;
        }

        reservations.forEach(r => {
            const reservationId = r.id || r.reservation_id;
            const resId = r.resourceId || r.resource_id;
            const uId = r.userId || r.user_id;
            const sTime = r.startTime || r.start_time;
            const eTime = r.endTime || r.end_time;
            const status = r.status || "active";

            const div = document.createElement("div");
            div.className = "cursor-pointer rounded-2xl border border-black/10 p-4 hover:border-brand-blue hover:bg-brand-blue/5 transition-all duration-200";

            const startStr = sTime ? new Date(sTime).toLocaleString('fi-FI') : 'N/A';
            const endStr = eTime ? new Date(eTime).toLocaleString('fi-FI') : 'N/A';

            let statusColor = "text-black/50";
            if (status.toLowerCase() === "active") statusColor = "text-brand-green font-semibold";
            if (status.toLowerCase() === "cancelled") statusColor = "text-brand-primary";
            if (status.toLowerCase() === "completed") statusColor = "text-brand-blue font-semibold";

            div.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="font-semibold text-sm">Resource: ${resId || "?"}</span>
                    <span class="text-xs ${statusColor} uppercase">${status}</span>
                </div>
                <div class="text-xs text-black/70 mt-2">
                    <span class="font-semibold">User:</span> ${uId || "?"}
                </div>
                <div class="text-xs text-black/70 mt-1">
                    <span class="font-semibold">Time:</span> ${startStr} – ${endStr}
                </div>
                ${r.note ? `<div class="text-xs text-black/50 mt-1 italic">"${r.note}"</div>` : ''}
            `;

            const safeObj = {
                id: reservationId,
                resourceId: resId,
                userId: uId,
                startTime: sTime,
                endTime: eTime,
                note: r.note,
                status: status
            };

            div.addEventListener("click", () => populateForm(safeObj));
            listContainer.appendChild(div);
        });
    }

    function populateForm(r) {
        inputs.id.value = r.id;
        inputs.resourceId.value = r.resourceId || "";
        inputs.userId.value = r.userId || "";
        inputs.startTime.value = formatForInput(r.startTime);
        inputs.endTime.value = formatForInput(r.endTime);
        inputs.note.value = r.note || "";
        inputs.status.value = r.status ? r.status.toLowerCase() : "active";

        btnSave.textContent = "Update Reservation";
        btnDelete.classList.remove("hidden");
        btnCancel.classList.remove("hidden");
        statusField.classList.remove("hidden");

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = inputs.id.value;
        const method = id ? "PUT" : "POST";
        const url = id ? `/api/reservations/${id}` : "/api/reservations";

        const payloadData = {
            resourceId: parseInt(inputs.resourceId.value),
            userId: parseInt(inputs.userId.value),
            startTime: new Date(inputs.startTime.value).toISOString(),
            endTime: new Date(inputs.endTime.value).toISOString(),
            note: inputs.note.value,
            status: id ? inputs.status.value : "active"
        };

        if (id) {
            payloadData.id = parseInt(id);
        }

        try {
            const res = await fetch(url, {
                method,
                headers: authHeaders,
                body: JSON.stringify(payloadData)
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to save reservation.");
            }

            showMessage(id ? "Reservation updated successfully!" : "Reservation created successfully!");
            resetForm();
            await fetchReservations();
        } catch (error) {
            showMessage(error.message, true);
        }
    });

    btnDelete.addEventListener("click", async () => {
        const id = inputs.id.value;
        if (!id) return;

        if (!confirm("Are you sure you want to delete this reservation?")) return;

        try {
            const res = await fetch(`/api/reservations/${id}`, {
                method: "DELETE",
                headers: authHeaders
            });

            if (!res.ok) throw new Error("Failed to delete reservation.");

            showMessage("Reservation deleted successfully!");
            resetForm();
            await fetchReservations();
        } catch (error) {
            showMessage(error.message, true);
        }
    });

    btnCancel.addEventListener("click", resetForm);

    resetForm();
});