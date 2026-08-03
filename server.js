const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Professional ESG Knowledge Base for local smart responses
const esgKnowledgeBase = [
    {
        keywords: ['brsr', 'business responsibility', 'sebi', 'reporting'],
        response: "BRSR (Business Responsibility and Sustainability Reporting) is mandated by SEBI for top listed entities in India. It requires companies to disclose their performance against the nine principles of the National Guidelines on Responsible Business Conduct (NGRBC), covering Environmental, Social, and Governance parameters, along with comprehensive ESG metrics and assurance details."
    },
    {
        keywords: ['scope', 'emission', 'carbon', 'ghg', 'greenhouse'],
        response: "Carbon emissions are categorized into three scopes under the GHG Protocol:\n• **Scope 1:** Direct emissions from owned or controlled sources (e.g., fuel combustion, company vehicles).\n• **Scope 2:** Indirect emissions from the generation of purchased electricity, steam, heating, and cooling consumed by the reporting company.\n• **Scope 3:** All other indirect emissions that occur in a company's value chain (e.g., supply chain, business travel, waste disposal, product use)."
    },
    {
        keywords: ['gri', 'global reporting', 'framework'],
        response: "The Global Reporting Initiative (GRI) Standards are the world's most widely used frameworks for sustainability reporting. They help businesses and organizations transparently understand and communicate their impacts on issues such as climate change, human rights, governance, and social well-being."
    },
    {
        keywords: ['what is esg', 'esg mean', 'define esg'],
        response: "ESG stands for Environmental, Social, and Governance. It is a framework used to assess an organization's business practices and performance on sustainability and ethical issues:\n• **Environmental:** Climate change strategy, carbon footprint, waste management, water usage, and biodiversity.\n• **Social:** Labor standards, workplace health & safety, diversity & inclusion, human rights, and community engagement.\n• **Governance:** Board diversity, executive compensation, business ethics, anti-corruption, and shareholder rights."
    }
];

app.post('/api/chat', (req, res) => {
    try {
        const { message } = req.body;
        const userQuery = message ? message.toLowerCase() : "";

        let matchedReply = "As an ESG and Sustainability professional assistant, I can help you with BRSR compliance frameworks, Scope 1-2-3 carbon emission calculations, GRI standard disclosures, and sustainability strategy. Could you please specify your query regarding these topics?";

        // Match keywords from the knowledge base
        for (let item of esgKnowledgeBase) {
            if (item.keywords.some(keyword => userQuery.includes(keyword))) {
                matchedReply = item.response;
                break;
            }
        }

        // General fallback for other professional queries
        if (matchedReply.includes("As an ESG") && userQuery.length > 3) {
            matchedReply = `Regarding your query on "${message}": In professional ESG consulting and sustainability reporting, data accuracy, alignment with frameworks like BRSR/GRI, and clear stakeholder communication are critical. Please let me know if you need specific metric breakdowns, data validation steps, or framework guidelines for this.`;
        }

        res.json({ reply: matchedReply });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ reply: "An error occurred while processing your request." });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (Local ESG Mode Active)`));