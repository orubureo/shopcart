/**
 * Initializes custom dropdown menus.
 * Toggles the active state on click and closes all dropdowns
 * when clicking outside.
 */
const dropdowns = document.querySelectorAll(".cus-dropdown");
dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector(".cus-dropdown-btn");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Close all other open dropdowns
    dropdowns.forEach(d => {
      if (d !== dropdown) {
        d.classList.remove("active");
        d.querySelector(".cus-dropdown-btn").classList.remove("active");
      }
    });

    // Toggle the clicked dropdown
    dropdown.classList.toggle("active");
    btn.classList.toggle("active");
  });
});

/**
 * Closes all dropdowns when the user clicks anywhere outside of them.
 */
document.addEventListener("click", () => {
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove("active");
    dropdown.querySelector(".cus-dropdown-btn").classList.remove("active");
  });
});


/**
 * Scroll reveal animation.
 * Adds the "active" class to elements with the "reveal" class
 * when they enter the viewport.
 */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.2 });

reveals.forEach((el) => observer.observe(el));


/**
 * Product image carousel.
 * Moves the carousel track left or right by one card width on
 * next/prev button click. Guards against null elements in case
 * the carousel is not present on the page.
 */
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;
const cardWidth = 220;

if (track && prevBtn && nextBtn) {

  /** Slides the carousel forward by one card */
  nextBtn.addEventListener("click", () => {
    const maxIndex = track.children.length - 3;
    if (currentIndex < maxIndex) {
      currentIndex++;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });

  /** Slides the carousel backward by one card */
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });
}


/**
 * Color swatch selector.
 * Updates the main product image to match the selected color swatch.
 * Highlights the active swatch with a ring and removes it from others.
 */
const swatches = document.querySelectorAll('.swatch');
const mainImage = document.getElementById('main-image');

if (swatches.length && mainImage) {
  swatches.forEach(btn => {

    /**
     * On click: swap the main image src to the swatch's data-image value
     * and update the active ring to the clicked swatch.
     */
    btn.addEventListener('click', () => {
      mainImage.src = btn.dataset.image;
      swatches.forEach(b => b.classList.remove('ring-2', 'ring-offset-2'));
      btn.classList.add('ring-2', 'ring-offset-2');
    });
  });
}


/**
 * Quantity selector.
 * Increases or decreases the item quantity.
 * Minimum value is 1 — the decrease button is disabled at that point.
 */
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const quantityDisplay = document.getElementById('quantity');

if (decreaseBtn && increaseBtn && quantityDisplay) {
  let quantity = 1;

  /** Increments the quantity by 1 */
  increaseBtn.addEventListener('click', () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  /** Decrements the quantity by 1, stopping at a minimum of 1 */
  decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });
}

/**
 * Buy Now button.
 * Redirects to checkout.html with the selected color and quantity
 * passed as URL parameters.
 */
const buyNowBtn = document.getElementById('buy-now');

if (buyNowBtn) {
  buyNowBtn.addEventListener('click', () => {
    const selectedSwatch = document.querySelector('.swatch.ring-2');
    const color = selectedSwatch ? selectedSwatch.dataset.color : 'Pink';
    const colorImg = selectedSwatch ? selectedSwatch.dataset.image : 'image/airpod-max-min.png';
    const quantity = quantityDisplay ? quantityDisplay.textContent : '1';

    const params = new URLSearchParams({
      product: 'AirPods Max',
      color: color,
      colorImg: colorImg,
      quantity: quantity,
      price: 549.00
    });


    navigateTo(`checkout.html?${params}`);

    // Continue Shopping button — update the onclick too
    onclick = "navigateTo('index.html')"
  });
}


/**
 * Checkout page order summary.
 * Reads order details from URL parameters and populates
 * the summary section. Only runs when on checkout.html.
 */

if (window.location.pathname.includes('checkout.html')) {
  const params = new URLSearchParams(window.location.search);

  const product = params.get('product');
  const color = params.get('color');
  const colorImg = params.get('colorImg');
  const quantity = params.get('quantity');
  const price = params.get('price');
  const total = (parseFloat(price) * parseInt(quantity)).toFixed(2);

  const get = id => document.getElementById(id);

  if (get('order-product')) get('order-product').textContent = product;
  if (get('order-quantity')) get('order-quantity').textContent = `0${quantity}`;
  if (get('color')) get('color').textContent = color;
  if (get('order-price')) get('order-price').textContent = `$${price}`;
  if (get('order-subtotal')) get('order-subtotal').textContent = `$${total}`;
  if (get('order-total')) get('order-total').textContent = `$${total}`;
  if (get('order-color-img')) get('order-color-img').src = colorImg;
}

/**
 * Delivery Information save/edit toggle.
 * On save: hides the form, populates and shows the summary view.
 * On edit: hides the summary, shows the form again.
 */
const saveDeliveryBtn = document.getElementById('save-delivery');
const editDeliveryBtn = document.getElementById('edit-delivery');
const deliveryForm = document.getElementById('delivery-form');
const deliverySummary = document.getElementById('delivery-summary');

if (saveDeliveryBtn) {
  saveDeliveryBtn.addEventListener('click', () => {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('delivery-email').value.trim();

    // Require at least a name before saving
    if (!firstName && !lastName) return;

    // Populate summary
    document.getElementById('summary-name').textContent = `${firstName} ${lastName}`;
    document.getElementById('summary-address').textContent = `${address}, ${city} ${zip}`;
    document.getElementById('summary-phone').textContent = phone;
    document.getElementById('summary-email').textContent = email;

    // Swap form → summary
    deliveryForm.classList.add('hidden');
    deliverySummary.classList.remove('hidden');
    saveDeliveryBtn.classList.add('hidden');
    editDeliveryBtn.classList.remove('hidden');
  });
}

if (editDeliveryBtn) {
  editDeliveryBtn.addEventListener('click', () => {
    // Swap summary → form
    deliverySummary.classList.add('hidden');
    deliveryForm.classList.remove('hidden');
    editDeliveryBtn.classList.add('hidden');
    saveDeliveryBtn.classList.remove('hidden');
  });
}

/**
 * Credit card input formatting.
 * Card number: groups of 4 digits separated by spaces (1234 5678 9012 3456)
 * Expiry: auto-inserts slash after month (MM / YY)
 * CVC: numbers only, max 4 digits
 */
const cardNumber = document.getElementById('card-number');
const cardExpiry = document.getElementById('card-expiry');
const cardCvc = document.getElementById('card-cvc');

if (cardNumber) {
  cardNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');        // strip non-digits
    value = value.substring(0, 16);                        // max 16 digits
    value = value.match(/.{1,4}/g)?.join(' ') ?? value;   // group into 4s
    e.target.value = value;
  });
}

if (cardExpiry) {
  cardExpiry.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');         // strip non-digits
    value = value.substring(0, 4);                          // max 4 digits

    if (value.length >= 3) {
      value = value.substring(0, 2) + ' / ' + value.substring(2); // MM / YY
    }

    e.target.value = value;
  });
}

if (cardCvc) {
  cardCvc.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3); // digits only
  });
}

/**
 * Place Order button.
 * Validates delivery info is saved before showing success modal.
 * Generates a random transaction ID and shows the success modal.
 */
const placeOrderBtn = document.getElementById('place-order');
const orderModal = document.getElementById('order-modal');
const transactionId = document.getElementById('transaction-id');

if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', () => {

    // Check if delivery is saved
    const isDeliverySaved = deliverySummary && !deliverySummary.classList.contains('hidden');

    if (!isDeliverySaved) {
      if (saveDeliveryBtn) {
        saveDeliveryBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        saveDeliveryBtn.classList.add('btn-error');
        setTimeout(() => saveDeliveryBtn.classList.remove('btn-error'), 2000);
      }
      alert('Please fill in and save your delivery information first.');
      return;
    }

    // Validate card details
    const cardHolderName = document.getElementById('card-holder-name')?.value.trim();
    const cardEmail = document.getElementById('card-email')?.value.trim();
    const cardNum = document.getElementById('card-number')?.value.trim();
    const cardExp = document.getElementById('card-expiry')?.value.trim();
    const cardCvcVal = document.getElementById('card-cvc')?.value.trim();

    if (!cardHolderName || !cardEmail || !cardNum || !cardExp || !cardCvcVal) {
      alert('Please fill in all payment details before placing your order.');
      document.getElementById('card-number')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (cardNum.replace(/\s/g, '').length < 16) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }

    if (cardExp.length < 7) {
      alert('Please enter a valid expiry date (MM / YY).');
      return;
    }

    if (cardCvcVal.length < 3) {
      alert('Please enter a valid 3-digit CVC.');
      return;
    }

    // Show processing state on button
    placeOrderBtn.disabled = true;
    placeOrderBtn.innerHTML = `
      <span class="loading loading-spinner loading-sm"></span>
      Processing...
    `;

    // Wait 3 seconds then show success modal
    setTimeout(() => {

      // Reset button
      placeOrderBtn.disabled = false;
      placeOrderBtn.innerHTML = 'Place Order';

      // Generate transaction ID and show modal
      const txnId = Math.floor(1000000000 + Math.random() * 9000000000);
      if (transactionId) transactionId.textContent = txnId;

      orderModal.classList.remove('hidden');
      lucide.createIcons();

    }, 3000);
  });
}

/**
 * Search dropdown.
 * Shows popular categories when the search input is focused.
 * Hides when clicking outside the search wrapper.
 */
const searchInput = document.getElementById('search-input');
const searchDropdown = document.getElementById('search-dropdown');
const searchWrapper = document.getElementById('search-wrapper');

if (searchInput && searchDropdown) {

  // Show dropdown on focus
  searchInput.addEventListener('focus', () => {
    searchDropdown.classList.remove('hidden');
  });

  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchWrapper.contains(e.target)) {
      searchDropdown.classList.add('hidden');
    }
  });
}

/**
 * Page transition effect.
 * Fades in a loading overlay before navigating to any internal link.
 * Makes page changes feel smoother and more realistic.
 */

/** Shows the overlay then redirects after a short delay */
function navigateTo(url, delay = 800) {
  const overlay = document.getElementById('page-transition');
  if (overlay) {
    overlay.style.pointerEvents = 'all';
    overlay.style.opacity = '1';
  }
  setTimeout(() => {
    window.location.href = url;
  }, delay);
}

// Intercept all internal <a> link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');

  if (
    link &&
    link.href &&
    !link.href.startsWith('mailto') &&
    !link.href.startsWith('tel') &&
    !link.target &&
    link.hostname === window.location.hostname
  ) {
    e.preventDefault();
    navigateTo(link.href);
  }
});

// Fade out overlay when page finishes loading
window.addEventListener('pageshow', () => {
  const overlay = document.getElementById('page-transition');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  }
});

/**
 * Mobile search toggle.
 * Shows/hides the search bar below the navbar on mobile
 * when the search icon is clicked.
 */
const mobileSearchToggle = document.getElementById('mobile-search-toggle');
const mobileSearchBar = document.getElementById('mobile-search-bar');
const mobileSearchInput = document.getElementById('mobile-search-input');
const mobileSearchDropdown = document.getElementById('mobile-search-dropdown');
const mobileSearchWrapper = document.getElementById('mobile-search-wrapper');

if (mobileSearchToggle && mobileSearchBar) {
  mobileSearchToggle.addEventListener('click', () => {
    mobileSearchBar.classList.toggle('hidden');
    if (!mobileSearchBar.classList.contains('hidden')) {
      mobileSearchInput.focus();
    }
  });
}

if (mobileSearchInput && mobileSearchDropdown) {
  mobileSearchInput.addEventListener('focus', () => {
    mobileSearchDropdown.classList.remove('hidden');
    lucide.createIcons();
  });

  document.addEventListener('click', (e) => {
    if (mobileSearchWrapper && !mobileSearchWrapper.contains(e.target) &&
      e.target !== mobileSearchToggle) {
      mobileSearchDropdown.classList.add('hidden');
    }
  });
}