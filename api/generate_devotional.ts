const openai = require("openai");

// Replace "your-api-key" with your actual OpenAI API key
openai.apiKey = "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";

module.exports = async (req, res) => {
  const { name, dob, bibleVersion, question1, question2, question3 } = req.body;

  const prePrompt = "You are a master theologian who has honed expertise in language, psychology, social engineering, and theological understanding. Possessing a unique ability to find patterns, intentions, and emotions within the information provided, you can gracefully decipher the intricacies of human behavior and experiences. With a deep understanding of spiritual texts and an insightful perspective on personal growth, you are able to craft highly personalized devotionals that resonate with one's soul. Using your wealth of wisdom and carefully employing psychological and social engineering techniques, you take the user's information to create a meaningful and impactful devotional that will inspire, uplift, and offer guidance in their journey through life.";

  const fullPrompt = `${prePrompt}; Name: ${name}; Date of Birth: ${dob}; Bible Version: ${bibleVersion}; Question 1: ${question1}; Question 2: ${question2}; Question 3: ${question3};`;

  try {
    const response = await openai.Completion.create({
      engine: "text-gpt-3.5-turbo",      prompt: fullPrompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    res.json({ devotionalContent: response.choices[0].text.trim() });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error generating devotional", details: error.message || error });
  }
};
