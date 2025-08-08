const autocannon = require('autocannon');

const instance = autocannon({
    url: 'http://127.0.0.1:8000',  // ✅ fixed: no leading space
    duration: 30 // seconds
}, (err, result) => {
    if (err) {
        console.error('Error:', err);
        process.exit(1);
    }
    console.log(autocannon.printResult(result));
});

// Track progress
autocannon.track(instance, { renderProgressBar: true });
