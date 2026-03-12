const test = async () => {
    try {
        console.log('Fetching...');
        const res = await fetch('https://akram-coaching.onrender.com/api/chargily/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 14800,
                currency: 'DZD',
                planName: 'Test',
                clientName: 'Test Name',
                clientEmail: 'test@example.com',
                successUrl: 'http://localhost:5173',
                failureUrl: 'http://localhost:5173'
            })
        });
        const text = await res.text();
        console.log('Status:', res.status);
        console.log('Data:', text);
    } catch (e) {
        console.error('Fetch Error:', e);
    }
};
test();
