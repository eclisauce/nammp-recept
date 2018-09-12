// Tas bort och läggs rätt sedan.



function toggleBorder() {
  $('#collapseCategory').on('hide.bs.collapse', function () {
    $('.filters').removeClass('border-top');
  })

  $('#collapseCategory').on('show.bs.collapse', function () {
    $('.filters').addClass('border-top');
  })
}

toggleBorder();