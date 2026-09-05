const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');

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
  botRoot.shadowRoot.querySelectorAll('.bpHeaderContainer, .bpHeaderContentContainer').forEach((element) => {
    element.style.setProperty('background', '#171717', 'important');
    element.style.setProperty('background-color', '#171717', 'important');
    element.style.setProperty('background-image', 'none', 'important');
    element.style.setProperty('color', '#ffffff', 'important');
  });
  botRoot.shadowRoot.querySelectorAll('.bpHeaderContainer button, .bpHeaderContentContainer button').forEach((element) => {
    element.style.setProperty('background', '#171717', 'important');
    element.style.setProperty('background-color', '#171717', 'important');
    element.style.setProperty('color', '#ffffff', 'important');
  });
  botRoot.shadowRoot.querySelectorAll('.bpFabContainer, .bpFabIcon').forEach((element) => {
    element.style.setProperty('background-color', '#171717', 'important');
    element.style.setProperty('color', '#ffffff', 'important');
  });
  botRoot.shadowRoot.querySelectorAll('.bpContainer, .bpComposerContainer').forEach((element) => {
    element.style.setProperty('background-color', '#f5f5f5', 'important');
    element.style.setProperty('color', '#171717', 'important');
  });
  if (botRoot.shadowRoot.querySelector('#mmba-botpress-theme')) return !headings.some((heading) => heading.textContent.trim() === 'Bot');
  const theme = document.createElement('style');
  theme.id = 'mmba-botpress-theme';
  theme.textContent = `.bpReset { --bpPrimary-1: #ffffff !important; --bpPrimary-50: #f5f5f5 !important; --bpPrimary-100: #e5e5e5 !important; --bpPrimary-200: #cfcfcf !important; --bpPrimary-500: #222222 !important; --bpPrimary-600: #171717 !important; --bpPrimary-700: #333333 !important; --bpPrimary-800: #111111 !important; --bpGray-50: #f5f5f5 !important; --bpGray-100: #e8e8e8 !important; font-family: 'Manrope', Arial, sans-serif !important; } .bpReset button { background: #222222 !important; color: #ffffff !important; border: 1px solid #222222 !important; border-radius: 0 !important; font-family: inherit !important; } .bpReset input, .bpReset textarea { background: #ffffff !important; color: #171717 !important; border: 1px solid #a8a8a8 !important; border-radius: 0 !important; font-family: inherit !important; } .bpReset .bpFab, .bpReset .bpFabContainer, .bpReset .bpFabIcon { background: #171717 !important; color: #ffffff !important; border: 1px solid #555555 !important; box-shadow: 0 10px 24px rgba(0,0,0,.28) !important; } .bpReset .bpWebchat, .bpReset [class*='Webchat'], .bpReset [class*='webchat'] { background: #f5f5f5 !important; color: #171717 !important; border: 1px solid #8f8f8f !important; box-shadow: 0 20px 45px rgba(0,0,0,.22) !important; } .bpReset.bpHeaderContainer, .bpReset.bpHeaderContentContainer, .bpHeaderContainer, .bpHeaderContentContainer { background: #171717 !important; color: #ffffff !important; border-bottom: 1px solid #3f3f3f !important; } .bpReset .bpMessageBlocksBubble, .bpMessageBlocksBubble { background: #e8e8e8 !important; color: #171717 !important; } .bpReset [class*='Message'], .bpReset [class*='message'] { color: #171717 !important; }`;
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