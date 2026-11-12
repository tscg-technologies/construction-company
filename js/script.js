/**
 * CONSTRUCTION COMPANY - MASTER JAVASCRIPT
 * Vanilla JS features:
 * - Mobile Navigation Toggle
 * - Active Page Highlight
 * - Project Category Filtering
 * - Project Search Filter
 * - Project Details URL Navigation
 * - Contact Form Validation (Frontend Demo)
 * - Consultation Request Form Validation (Frontend Demo)
 * - FAQ Accordion
 * - Scroll-to-Top Button
 * - Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initProjectFiltering();
  initProjectSearch();
  initProjectDetailsPage();
  initConsultationForm();
  initContactForm();
  initScrollToTop();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (!toggleBtn || !siteNav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('open');
    siteNav.classList.toggle('open');
  });

  // Close nav when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !toggleBtn.contains(e.target) && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav on window resize above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   2. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('active');

      // Optional: Close sibling items in the same FAQ wrap
      const parentWrap = item.closest('.faq-wrap');
      if (parentWrap) {
        parentWrap.querySelectorAll('.faq-item').forEach((sibling) => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const siblingBtn = sibling.querySelector('.faq-trigger');
            if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. PROJECT CATEGORY FILTERING & SEARCH
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');
      applyProjectFilters();
    });
  });
}

function initProjectSearch() {
  const searchInput = document.getElementById('projectSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    applyProjectFilters();
  });
}

function applyProjectFilters() {
  const activeBtn = document.querySelector('.filter-btn.active');
  const activeCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

  const searchInput = document.getElementById('projectSearchInput');
  const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const projectCards = document.querySelectorAll('.project-card[data-category]');
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute('data-category');
    const cardTitle = card.querySelector('.card-title')?.innerText.toLowerCase() || '';
    const cardDesc = card.querySelector('p')?.innerText.toLowerCase() || '';

    const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
    const matchesSearch = (searchQuery === '' || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery));

    if (matchesCategory && matchesSearch) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const emptyMsg = document.getElementById('noProjectsMessage');
  if (emptyMsg) {
    emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

/* --------------------------------------------------------------------------
   4. PROJECT DETAILS POPULATION (for project-details.html)
   -------------------------------------------------------------------------- */
const PROJECT_DATABASE = {
  'residential-complex': {
    title: 'Modern Residential Complex',
    category: 'Residential Buildings',
    location: 'Bengaluru, Karnataka (Demo Location)',
    buildingType: 'Multi-Storey Residential Towers',
    scope: 'Turnkey structural design, RCC framing, exterior facade, MEP coordination, landscaping',
    duration: '24 Months (Illustrative Timeline)',
    budget: '₹42.5 Crore (Demo Figure)',
    placeholderClass: 'ph-residential-building',
    placeholderLabel: 'Planned image: residential-building.jpg',
    overview: 'This illustrative multi-storey residential project highlights modern living aesthetics paired with sustainable structural engineering. The project includes reinforced concrete framework, energy-efficient glazing, seismic resistance, rainwater harvesting integration, and community recreational spaces.',
    materials: 'High-grade M30 & M40 concrete, Fe500D steel reinforcement, acoustic insulated glass units, low-VOC interior coatings, sustainable vitrified tiling.',
    status: 'Demo Completed Project'
  },
  'commercial-tower': {
    title: 'Contemporary Commercial Tower',
    category: 'Commercial Buildings',
    location: 'Cyber City, Hyderabad (Demo Location)',
    buildingType: 'Grade-A Commercial Office Tower (G+18)',
    scope: 'Heavy foundational piling, post-tensioned slabs, high-performance curtain wall glazing, intelligent HVAC integration',
    duration: '30 Months (Illustrative Timeline)',
    budget: '₹85.0 Crore (Demo Figure)',
    placeholderClass: 'ph-commercial-building',
    placeholderLabel: 'Planned image: commercial-building.jpg',
    overview: 'A contemporary corporate workspace building built to cater to large tech enterprises. Features double-glazed curtain walls for optimum natural daylighting, high-speed elevator banks, advanced fire safety systems, and flexible open-span office floor plates.',
    materials: 'Structural grade steel, post-tensioned concrete slabs, double-glazed curtain wall system, energy-efficient chillers, smart building management sensors.',
    status: 'Demo Completed Project'
  },
  'premium-villa': {
    title: 'Premium Villa Development',
    category: 'Villas',
    location: 'Whitefield, Bengaluru (Demo Location)',
    buildingType: 'Luxury Independent G+2 Villa',
    scope: 'Custom architectural foundation, cantilever terraces, bespoke interior civil work, rooftop solar integration, private pool waterproofing',
    duration: '14 Months (Illustrative Timeline)',
    budget: '₹3.8 Crore (Demo Figure)',
    placeholderClass: 'ph-villa-construction',
    placeholderLabel: 'Planned image: villa-construction.jpg',
    overview: 'Designed for bespoke luxury and architectural sophistication, this custom residential villa combines wide open cantilevered balconies, natural stone cladding, double-height living spaces, and insulated structural envelopes.',
    materials: 'Italian marble flooring, thermal break aluminium fenestration, engineered hardwood decking, premium waterproofing membranes, solar PV integration.',
    status: 'Demo Handed Over'
  },
  'urban-apartment': {
    title: 'Urban Apartment Project',
    category: 'Apartment Projects',
    location: 'Pune, Maharashtra (Demo Location)',
    buildingType: 'Mid-Rise Apartment Community (G+12)',
    scope: 'Pre-cast construction technology, basement car parking, water recycling plant, seismic-compliant shear wall structure',
    duration: '18 Months (Illustrative Timeline)',
    budget: '₹28.0 Crore (Demo Figure)',
    placeholderClass: 'ph-residential-building',
    placeholderLabel: 'Planned image: residential-building.jpg',
    overview: 'An urban housing project optimizing space efficiency and rapid construction timelines using modular formwork systems and monolithic concrete pouring techniques for durable, cost-effective urban living.',
    materials: 'Monolithic concrete shear walls, modular formwork panels, anti-skid vitrified tiles, UPVC noise-reduction windows.',
    status: 'Demo Completed Project'
  },
  'industrial-warehouse': {
    title: 'Industrial Warehouse Development',
    category: 'Industrial Buildings',
    location: 'Sriperumbudur, Chennai (Demo Location)',
    buildingType: 'Pre-Engineered Steel Industrial Warehouse',
    scope: 'PEB steel super-structure, heavy-duty laser-screed flooring, loading docks, fire sprinkler networks, high-bay LED layout',
    duration: '10 Months (Illustrative Timeline)',
    budget: '₹18.5 Crore (Demo Figure)',
    placeholderClass: 'ph-construction-equipment',
    placeholderLabel: 'Planned image: construction-equipment.jpg',
    overview: 'Engineered for logistics, freight, and supply chain operations, featuring large clear spans without interior columns, heavy-duty industrial flooring with high abrasion resistance, and automated docking bays.',
    materials: 'High-tensile structural steel frames, standing seam insulated roof panels, FM2 specification laser-screed concrete floor, high-density polyurethane joints.',
    status: 'Demo Completed Project'
  },
  'modern-office': {
    title: 'Modern Office Building',
    category: 'Commercial Buildings',
    location: 'BKC, Mumbai (Demo Location)',
    buildingType: 'Corporate Headquarters & Executive Suites',
    scope: 'Comprehensive building expansion, structural retrofitting, energy-efficient HVAC overhaul, acoustic partition installations',
    duration: '16 Months (Illustrative Timeline)',
    budget: '₹36.0 Crore (Demo Figure)',
    placeholderClass: 'ph-completed-project',
    placeholderLabel: 'Planned image: completed-project.jpg',
    overview: 'A corporate renovation and new-wing expansion focused on modern engineering ergonomics, energy efficiency, state-of-the-art conference facilities, and green building performance standards.',
    materials: 'Acoustic ceiling baffles, composite aluminium cladding, low-E glass facade, micro-cement flooring, intelligent lighting control grids.',
    status: 'Demo Handed Over'
  },
  'residential-renovation': {
    title: 'Residential Renovation Project',
    category: 'Renovation Projects',
    location: 'Alwarpet, Chennai (Demo Location)',
    buildingType: 'Heritage Villa Structural Renovation & Expansion',
    scope: 'Structural reinforcement, column strengthening, kitchen & bathroom overhaul, damp-proofing injection, MEP replacement',
    duration: '8 Months (Illustrative Timeline)',
    budget: '₹1.2 Crore (Demo Figure)',
    placeholderClass: 'ph-interior-construction',
    placeholderLabel: 'Planned image: interior-construction.jpg',
    overview: 'A deep-renovation project converting an aging two-storey residential structure into an open-plan contemporary residence with reinforced load-bearing columns, modern plumbing manifolds, and custom architectural woodwork.',
    materials: 'Carbon fiber polymer wrapping for column retrofitting, crystalline waterproofing slurry, engineered timber, moisture-resistant drywall.',
    status: 'Demo Completed'
  },
  'infrastructure-project': {
    title: 'Infrastructure Development Project',
    category: 'Infrastructure Projects',
    location: 'Ahmedabad, Gujarat (Demo Location)',
    buildingType: 'Civil Flyover & Arterial Roadway Expansion',
    scope: 'Deep pile foundations, pier caps, pre-stressed concrete girders, drainage culverts, high-load asphalt wearing courses',
    duration: '22 Months (Illustrative Timeline)',
    budget: '₹95.0 Crore (Demo Figure)',
    placeholderClass: 'ph-infrastructure-project',
    placeholderLabel: 'Planned image: infrastructure-project.jpg',
    overview: 'An illustrative civil infrastructure project highlighting high-capacity foundational engineering, segmental girder launching, grade-separated junctions, and long-term durability against extreme weather conditions.',
    materials: 'Pre-stressed concrete (PSC) girders, high-yield corrosion-resistant steel, elastomeric bridge bearings, dense bituminous macadam.',
    status: 'Demo In Progress'
  }
};

function initProjectDetailsPage() {
  const detailContainer = document.getElementById('projectDetailContainer');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || 'residential-complex';
  const data = PROJECT_DATABASE[projectId] || PROJECT_DATABASE['residential-complex'];

  // Update page title
  document.title = `${data.title} | Construction Company`;

  // Update elements
  const titleEl = document.getElementById('projTitle');
  const catEl = document.getElementById('projCategory');
  const locEl = document.getElementById('projLocation');
  const typeEl = document.getElementById('projType');
  const scopeEl = document.getElementById('projScope');
  const durEl = document.getElementById('projDuration');
  const budEl = document.getElementById('projBudget');
  const statEl = document.getElementById('projStatus');
  const overEl = document.getElementById('projOverview');
  const matEl = document.getElementById('projMaterials');
  const breadcrumbEl = document.getElementById('projBreadcrumb');
  const placeholderEl = document.getElementById('projPlaceholder');

  if (titleEl) titleEl.innerText = data.title;
  if (catEl) catEl.innerText = data.category;
  if (locEl) locEl.innerText = data.location;
  if (typeEl) typeEl.innerText = data.buildingType;
  if (scopeEl) scopeEl.innerText = data.scope;
  if (durEl) durEl.innerText = data.duration;
  if (budEl) budEl.innerText = data.budget;
  if (statEl) statEl.innerText = data.status;
  if (overEl) overEl.innerText = data.overview;
  if (matEl) matEl.innerText = data.materials;
  if (breadcrumbEl) breadcrumbEl.innerText = data.title;

  if (placeholderEl) {
    placeholderEl.className = `img-placeholder ${data.placeholderClass}`;
    const tag = placeholderEl.querySelector('.img-placeholder-tag');
    if (tag) tag.innerText = data.placeholderLabel;
    const pTitle = placeholderEl.querySelector('.img-placeholder-title');
    if (pTitle) pTitle.innerText = data.title;
  }
}

/* --------------------------------------------------------------------------
   5. CONSULTATION REQUEST FORM VALIDATION (Frontend Demo)
   -------------------------------------------------------------------------- */
function initConsultationForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Fields to validate
    const nameField = form.querySelector('#consultName');
    const phoneField = form.querySelector('#consultPhone');
    const emailField = form.querySelector('#consultEmail');
    const projectTypeField = form.querySelector('#consultProjectType');
    const dateField = form.querySelector('#consultDate');
    const locationField = form.querySelector('#consultLocation');
    const descField = form.querySelector('#consultDesc');
    const alertBox = form.querySelector('.form-status-alert');

    // Reset previous errors
    form.querySelectorAll('.form-control').forEach((input) => input.classList.remove('error'));

    // Validate Name
    if (!nameField.value.trim()) {
      showFieldError(nameField);
      isValid = false;
    }

    // Validate Phone (at least 10 digits)
    const phoneVal = phoneField.value.trim().replace(/[^0-9]/g, '');
    if (!phoneVal || phoneVal.length < 10) {
      showFieldError(phoneField);
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim() || !emailPattern.test(emailField.value.trim())) {
      showFieldError(emailField);
      isValid = false;
    }

    // Validate Project Type
    if (!projectTypeField.value) {
      showFieldError(projectTypeField);
      isValid = false;
    }

    // Validate Location
    if (!locationField.value.trim()) {
      showFieldError(locationField);
      isValid = false;
    }

    // Validate Date
    if (!dateField.value) {
      showFieldError(dateField);
      isValid = false;
    }

    if (isValid) {
      if (alertBox) {
        alertBox.className = 'form-status-alert success';
        alertBox.innerText = 'Your demo consultation request has been submitted successfully.';
        alertBox.style.display = 'block';
      }
      form.reset();
      // Scroll to alert
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      if (alertBox) {
        alertBox.className = 'form-status-alert error';
        alertBox.innerText = 'Please check the highlighted fields and ensure all required information is provided.';
        alertBox.style.display = 'block';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM VALIDATION (Frontend Demo)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nameField = form.querySelector('#contactName');
    const emailField = form.querySelector('#contactEmail');
    const phoneField = form.querySelector('#contactPhone');
    const serviceField = form.querySelector('#contactService');
    const messageField = form.querySelector('#contactMessage');
    const alertBox = form.querySelector('.form-status-alert');

    // Reset errors
    form.querySelectorAll('.form-control').forEach((input) => input.classList.remove('error'));

    if (!nameField.value.trim()) {
      showFieldError(nameField);
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim() || !emailPattern.test(emailField.value.trim())) {
      showFieldError(emailField);
      isValid = false;
    }

    if (!messageField.value.trim()) {
      showFieldError(messageField);
      isValid = false;
    }

    if (isValid) {
      if (alertBox) {
        alertBox.className = 'form-status-alert success';
        alertBox.innerText = 'Your demo message has been submitted successfully. (Demo frontend form only)';
        alertBox.style.display = 'block';
      }
      form.reset();
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      if (alertBox) {
        alertBox.className = 'form-status-alert error';
        alertBox.innerText = 'Please complete all required fields correctly before submitting.';
        alertBox.style.display = 'block';
      }
    }
  });
}

function showFieldError(inputElement) {
  if (inputElement) {
    inputElement.classList.add('error');
  }
}

/* --------------------------------------------------------------------------
   7. SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
