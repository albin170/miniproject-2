async function check() {
    const symptom = document.getElementById("symptom").value.trim();
    const resultDiv = document.getElementById("result");

    if (!symptom) {
        resultDiv.innerText = "Please enter symptoms.";
        return;
    }

    resultDiv.innerText = "Analyzing symptoms using AI...";

    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symptom })
        });

        const data = await response.json();
        resultDiv.innerText = data.result;
    } catch {
        resultDiv.innerText = "Error connecting to AI service.";
    }
}
