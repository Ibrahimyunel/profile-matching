function wrongValue(res) {
  swal({
    title: "Request berhasil!",
    text: "Silahkan cek email untuk melihat password anda!",
    icon: "success",
    button: true,
  })
    .then(() => {
      $(res).removeAttr("onclick");
      $(res).prev().prop("disabled", true).attr("checked", false);
    });
}

function restartProject() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert the data that you have input!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, restart it!'
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}

function errorValidation(arr) {
  var newArr = [...arr];
  var parss = $.parseHTML(newArr[0]);

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: " ",
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed) {
      for(var i = 1; i < newArr.length; i++) {
        eval(newArr[i]);
      }
    }
  });
  $(".swal2-html-container").append(parss);
}