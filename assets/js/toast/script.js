$(document).ready(function() {
  $('.close-toast').click(function() {
    $('.wrapper-toast-main').remove()
  })
})

$(document).on('click', function() {
  $('.wrapper-toast-main').remove()
});

function closeToast() {
  $('.wrapper-toast-main').remove()
}

// Successfully Toast
function successToast(message) {
  const container = $('#show-toast');
  const html = `
    <div class="wrapper-toast-main">
      <div class="toast-main-show success-toast-show">
          <div class="container-1-toast-main">
              <i class="fas fa-check-circle"></i>
          </div>
          <div class="container-2-toast-main">
              <p>Success</p>
              <p>${message}</p>
          </div>
          <button class="close-toast">&times;</button>
      </div>
    </div>
  ` 
  container.html(html)
}

// Failed Toast
function failedToast(message) {
  const container = $('#show-toast');
  const html = `
    <div class="wrapper-toast-main">
      <div class="toast-main-show error-toast-show">
          <div class="container-1-toast-main">
              <i class="fas fa-times-circle"></i>
          </div>
          <div class="container-2-toast-main">
              <p>Failed</p>
              <p>${messgae}</p>
          </div>
          <button class="close-toast">&times;</button>
      </div>
    </div>
  `
  container.html(html)
}

// Pending 
function pendingToast(message) {
  const container = $('#show-toast')
  const html = `
    <div class="wrapper-toast-main">
      <div class="toast-main-show info-toast-show">
          <div class="container-1-toast-main">
              <i class="fas fa-info-circle"></i>
          </div>
          <div class="container-2-toast-main">
              <p>Pending</p>
              <p>${message}</p>
          </div>
          <button class="close-toast">&times;</button>
      </div>
    </div>
  `
  container.html(html)
}

// Warning Toast
function warningToast(message) {
  const container = $('#show-toast')
  const html = `
    <div class="wrapper-toast-main">
      <div class="toast-main-show warning-toast-show">
          <div class="container-1-toast-main">
              <i class="fas fa-exclamation-circle"></i>
          </div>
          <div class="container-2-toast-main">
              <p>Warning</p>
              <p>${message}</p>
          </div>
          <button class="close-toast">&times;</button>
      </div>
    </div>
  `
  container.html(html)
}


function skeletonSearchShow() {
  const container = $('#skeleton-loading-search')
  const html = `
    <span class="position-absolute top-50 end-0 translate-middle-y lh-0 me-1" id="spinner-search" data-kt-search-element="spinner">
      <span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
    </span>
  `
  container.html(html)
}

function skeletonSearchHide() {
  const container = $('#skeleton-loading-search')
  const html = `
    <span class="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1" id="spinner-search" data-kt-search-element="spinner">
      <span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
    </span>
  `
  container.html(html)
}