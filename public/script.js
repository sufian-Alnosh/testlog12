document.getElementById('get-info').addEventListener('click', async () => {
    try {
        const response = await fetch('/visitor-info');
        const data = await response.json();
        displayInfo(data);
    } catch (error) {
        console.error('Error fetching visitor info:', error);
    }
});

function displayInfo(info) {
    const infoTable = document.getElementById('info-table');
    infoTable.innerHTML = `
        <table>
            <tr><th>المعلومة</th><th>القيمة</th></tr>
            <tr><td>IP</td><td>${info.ip}</td></tr>
            <tr><td>المدينة</td><td>${info.city}</td></tr>
            <tr><td>المنطقة</td><td>${info.region}</td></tr>
            <tr><td>الدولة</td><td>${info.country}</td></tr>
            <tr><td>الموقع الجغرافي</td><td>${info.loc}</td></tr>
            <tr><td>مقدم الخدمة</td><td>${info.org}</td></tr>
        </table>
    `;
}



async function fetchVisitorData() {
    try {
        const response = await fetch('/visitor-info');
        const data = await response.json();
        console.log(data);  // طباعة البيانات للتحقق
        displayInfo(data);
    } catch (error) {
        console.error('Error fetching visitor info:', error);
    }
}