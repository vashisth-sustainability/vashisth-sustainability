// ================= 1. SMOOTH SCROLLING SETUP =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Agar sirf '#' hai, toh default behavior mat todo
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ================= 2. CONTACT FORM SUBMISSION (WEB3FORMS) =================
const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const button = form.querySelector('button[type="submit"]');
        const originalButtonText = button.innerText;
        button.innerText = "Sending...";
        button.disabled = true; 

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonResponse = await response.json();
            if (response.status == 200) {
                alert("Thank you! Your enquiry has been sent successfully. We will get back to you soon.");
                form.reset(); 
            } else {
                console.log(response);
                alert(jsonResponse.message || "Something went wrong. Please try again.");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Network error. Please check your internet connection.");
        })
        .finally(() => {
            button.innerText = originalButtonText;
            button.disabled = false;
        });
    });
}
// ================= 3. AI AGENT LOGIC (ENGLISH DEFAULT & MULTILINGUAL) =================
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const chatMessages = document.getElementById('chat-messages');

// Global toggle function triggered by HTML onclick events
function toggleEcoChat() {
    const chatWin = document.getElementById('ai-chat-window');
    if (chatWin) {
        const currentDisplay = window.getComputedStyle(chatWin).display;
        if (currentDisplay === 'none') {
            chatWin.style.setProperty('display', 'flex', 'important');
        } else {
            chatWin.style.setProperty('display', 'none', 'important');
        }
    }
}

async function handleUserMessage() {
    const query = chatInput.value.trim();
    if (!query) return;

    appendMessage(query, 'user');
    chatInput.value = '';

    const loadingDiv = appendMessage("Thinking...", 'bot');

    try {
        const reply = await generateSmartResponse(query);
        loadingDiv.innerText = reply;
    } catch (error) {
        loadingDiv.innerText = "Maaf kijiye, server se connect karne me samasya aa rahi hai.";
    }
}

function appendMessage(text, sender) {
    if (!chatMessages) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.innerText = text;
    
    // Inline styling application
    if (sender === 'user') {
        msgDiv.style.background = "#0b6e4f";
        msgDiv.style.color = "white";
        msgDiv.style.padding = "10px 14px";
        msgDiv.style.borderRadius = "12px 12px 0px 12px";
        msgDiv.style.marginBottom = "10px";
        msgDiv.style.maxWidth = "85%";
        msgDiv.style.alignSelf = "flex-end";
        msgDiv.style.marginLeft = "auto";
        msgDiv.style.lineHeight = "1.4";
    } else {
        msgDiv.style.background = "#e2f0d9";
        msgDiv.style.color = "#2e5618";
        msgDiv.style.padding = "10px 14px";
        msgDiv.style.borderRadius = "12px 12px 12px 0px";
        msgDiv.style.marginBottom = "10px";
        msgDiv.style.maxWidth = "85%";
        msgDiv.style.alignSelf = "flex-start";
        msgDiv.style.lineHeight = "1.4";
    }
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll down
    
    return msgDiv; // Yeh line zaroori hai
}

// Input and Send button events listeners
if (sendChatBtn && chatInput) {
    sendChatBtn.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleUserMessage();
        }
    });
}

// ================= 4. SCROLL ANIMATION OBSERVER =================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
async function generateSmartResponse(input) {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: input })
        });

        const data = await response.json();
        return data.reply;
        
    } catch (error) {
        console.error("AI Connection Error:", error);
        return "Filhal server connect nahi ho pa raha hai. Kripya check karein ki server.js chal raha hai ya nahi!";
    }
}

window.addEventListener('scroll', revealSections);

function revealSections() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Page load hote hi ek baar run karne ke liye
revealSections();

// Mobile Menu Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".eco-navbar ul");

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});