// This identifies your website in the createToken call below
Stripe.setPublishableKey('pk_test_WxKLpM1zo3D4vjzfAZcWiaBV');
// ...

function stripeResponseHandler(status, response) {
  var $form = $('#payment-form');

  if (response.error) {
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    console.log(token);
    console.log(response);
    alert(token);
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    $form.get(0).submit();
  }
};


$(function() {
  console.log($);
  alert('Working');
  $('#payment-form').on('submit', function(event) {
    event.preventDefault();
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);
    alert('Here');
    Stripe.card.createToken($form, stripeResponseHandler);
    alert('After');


    // Prevent the form from submitting with the default action
    return false;
  });

});
