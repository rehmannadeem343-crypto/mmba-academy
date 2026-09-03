const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');

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
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const resourceName = link.textContent.replace('PDF ↗', '').trim();
    const year = link.closest('article').querySelector('.folder').textContent.trim().split(' ')[0];
    const file = new Blob([`MMBA Academy\n${year} ${resourceName}\n\nOfficial paper resource placeholder. Replace this file with the board PDF when published.`], { type: 'text/plain' });
    const download = document.createElement('a');
    download.href = URL.createObjectURL(file);
    download.download = `MMBA-${year}-${resourceName.replaceAll(' ', '-')}.txt`;
    download.click();
    URL.revokeObjectURL(download.href);
  });
});