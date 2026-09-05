const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');

const admissionsWebhook = 'https://hook.eu1.make.com/n4su8h7eple12yrdqjyfdev1ae2jkd14';

const contactCard = document.querySelector('.contact-card');
if (contactCard) {
  const admissionsForm = document.createElement('form');
  admissionsForm.id = 'admissions-form';
  admissionsForm.className = 'admissions-form';
  admissionsForm.action = admissionsWebhook;
  admissionsForm.method = 'post';
  admissionsForm.innerHTML = `
    <label>Student full name<input name="studentName" type="text" placeholder="Student's full name" autocomplete="name" required></label>
    <label>Father / guardian name<input name="guardianName" type="text" placeholder="Father or guardian name" required></label>
    <label>Class for admission<select name="classLevel" required><option value="">Select class</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></label>
    <label>Board<select name="board" required><option value="">Select board</option><option>Federal Board</option><option>Punjab Board</option><option>Other</option></select></label>
    <label>Subject group<select name="subjectGroup"><option value="">Select subject group</option><option>Pre-Medical</option><option>Pre-Engineering</option><option>Commerce</option><option>Arts / General</option></select></label>
    <label>Previous school name<input name="previousSchool" type="text" placeholder="School name"></label>
    <label>Previous class percentage / grade<input name="previousGrade" type="text" placeholder="For example: 82% or A grade"></label>
    <label>Phone / WhatsApp number<input name="phone" type="tel" placeholder="+92 322 3834771" pattern="\\+?[0-9\\s\\-]{10,17}" autocomplete="tel" required></label>
    <label>Email address<input name="email" type="email" placeholder="you@example.com" autocomplete="email" required></label>
    <label>City / area<input name="cityArea" type="text" placeholder="Rawalpindi, Pakistan"></label>
    <label>Preferred batch timing<select name="batchTiming"><option value="">Select timing</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
    <label>Additional message / questions<textarea name="message" rows="3" placeholder="Anything else you would like us to know?"></textarea></label>
    <button class="button button-red" type="submit">Submit application <span>↗</span></button>
    <p class="form-status" role="status" aria-live="polite"></p>`;
  contactCard.appendChild(admissionsForm);
  admissionsForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = admissionsForm.querySelector('button[type="submit"]');
    const status = admissionsForm.querySelector('.form-status');
    submitButton.disabled = true;
    status.textContent = 'Sending enquiry...';
    try {
      const formData = new FormData(admissionsForm);
      formData.append('source', 'MMBA Academy website');
      formData.append('enquiryType', 'Admissions');
      formData.append('submittedAt', new Date().toISOString());
      await fetch(admissionsWebhook, { method: 'POST', mode: 'no-cors', body: formData });
      admissionsForm.reset();
      status.textContent = 'Application received. We will contact you soon.';
    } catch {
      status.textContent = 'Unable to send right now. Please email us directly.';
    } finally {
      submitButton.disabled = false;
    }
  });
}

const botpressInject = document.createElement('script');
botpressInject.src = 'https://cdn.botpress.cloud/webchat/v3.7/inject.js';
document.head.appendChild(botpressInject);

const botpressConfig = document.createElement('script');
botpressConfig.src = 'https://files.bpcontent.cloud/2026/07/26/10/20260726100403-QO3OBXAF.js';
const applyBotpressTheme = () => {
  const botRoot = document.querySelector('#fab-root');
  if (!botRoot?.shadowRoot) return false;
  const headings = [...botRoot.shadowRoot.querySelectorAll('h1, h2, h3')];
  headings.forEach((heading) => {
    if (heading.textContent.trim() === 'Bot') heading.textContent = 'MMBA Academy';
  });
  if (botRoot.shadowRoot.querySelector('#mmba-botpress-theme')) return !headings.some((heading) => heading.textContent.trim() === 'Bot');
  const theme = document.createElement('style');
  theme.id = 'mmba-botpress-theme';
  theme.textContent = `.bpReset { --bpPrimary-1: #ffffff !important; --bpPrimary-50: #ffffff !important; --bpPrimary-100: #f4f4f4 !important; --bpPrimary-200: #e6e6e6 !important; --bpPrimary-500: #d9362b !important; --bpPrimary-600: #c52e25 !important; --bpPrimary-700: #a9251e !important; --bpPrimary-800: #111111 !important; --bpGray-50: #ffffff !important; --bpGray-100: #f2f2f2 !important; --bpGray-200: #dedede !important; font-family: 'Manrope', Arial, sans-serif !important; } .bpReset button { background: #d9362b !important; color: #ffffff !important; border: 1px solid #d9362b !important; border-radius: 2px !important; font-family: inherit !important; } .bpReset input, .bpReset textarea { background: #ffffff !important; color: #111111 !important; border: 1px solid #bdbdbd !important; border-radius: 2px !important; font-family: inherit !important; } .bpReset .bpFab, .bpReset .bpFabContainer, .bpReset .bpFabIcon { background: #111111 !important; color: #ffffff !important; border: 1px solid #111111 !important; box-shadow: 0 10px 24px rgba(0,0,0,.24) !important; } .bpReset .bpWebchat, .bpReset [class*='Webchat'], .bpReset [class*='webchat'] { background: #f2f2f2 !important; color: #111111 !important; border: 1px solid #bdbdbd !important; box-shadow: 0 20px 45px rgba(0,0,0,.2) !important; } .bpReset [class*='Header'], .bpReset [class*='header'] { background: #111111 !important; color: #ffffff !important; border-bottom: 2px solid #d9362b !important; } .bpReset [class*='Message'], .bpReset [class*='message'] { color: #111111 !important; } .bpReset [class*='UserMessage'], .bpReset [class*='userMessage'] { background: #d9362b !important; color: #ffffff !important; }`;
  botRoot.shadowRoot.appendChild(theme);
  return true;
};

botpressInject.addEventListener('load', () => {
  document.head.appendChild(botpressConfig);
  const themeObserver = new MutationObserver(applyBotpressTheme);
  themeObserver.observe(document.body, { childList: true, subtree: true });
  let attempts = 0;
  const themeTimer = window.setInterval(() => {
    const applied = applyBotpressTheme();
    attempts += 1;
    if (applied || attempts > 40) window.clearInterval(themeTimer);
  }, 250);
});

const ownerPhone = document.querySelector('a[href="tel:+92510000000"]');
if (ownerPhone) {
  ownerPhone.href = 'tel:+923223834771';
  ownerPhone.textContent = '+92 322 3834771';
}

document.querySelectorAll('.contact-details a[href="mailto:hello@mmba.edu.pk"]').forEach((emailLink) => {
  emailLink.href = 'mailto:mmba841@gmail.com';
  emailLink.textContent = 'mmba841@gmail.com';
});

document.querySelectorAll('.contact-card a[href="mailto:hello@mmba.edu.pk"], .site-footer a[href="mailto:hello@mmba.edu.pk"]').forEach((emailLink) => {
  emailLink.href = 'mailto:mmba841@gmail.com';
});

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.archive-grid a').forEach((link) => {
  link.href = 'https://mail.fbise.edu.pk/Old%20Question%20Paper.php';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});