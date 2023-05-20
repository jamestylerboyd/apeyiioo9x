document.getElementById("generateButton").addEventListener("click", async function () {
    // Animate the "Drafting..." button
    this.innerHTML = "Drafting...";
    this.style.pointerEvents = "none";
    this.style.opacity = 0.5;
  
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const bibleVersion = document.getElementById("bible").value;
    const question1 = document.getElementById("question1").value;
    const question2 = document.getElementById("question2").value;
    const question3 = document.getElementById("question3").value;
  
    try {
      const response = await fetch("/api/generate_devotional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob, bibleVersion, question1, question2, question3 }),
      });
  
      const data = await response.json();
      console.log(data); // Add this line
      const devotionalContent = data.devotionalContent;
  
      document.getElementById("devotionalContent").innerText = devotionalContent;
  
      // Hide the input module
      document.getElementById("inputModule").classList.add("hidden");
  
      // Show the generated and audio modules
      document.getElementById("resultModule").classList.remove("hidden");
      document.getElementById("generatedResult").classList.remove("hidden");
      document.getElementById("audioModule").classList.remove("hidden");
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating your devotional.");
    } finally {
      // Reset the "Generate Devotional" button
      const generateButton = document.getElementById("generateButton");
      generateButton.innerHTML = "Generate Devotional";
      generateButton.style.pointerEvents = "all";
      generateButton.style.opacity = 1;
    }
  });

document.getElementById('goBack').addEventListener('click', function() {
    // Hide the generated and audio modules
    document.getElementById('resultModule').classList.add('hidden');
    document.getElementById('generatedResult').classList.add('hidden');
    document.getElementById('audioModule').classList.add('hidden');

    // Show the input module
    document.getElementById('inputModule').classList.remove('hidden');

    // Reset the "Generate Devotional" button
    const generateButton = document.getElementById('generateButton');
    generateButton.innerHTML = "Generate Devotional";
    generateButton.style.pointerEvents = "all";
    generateButton.style.opacity = 1;
});
