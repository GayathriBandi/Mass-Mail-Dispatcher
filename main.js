(function(){
    emailjs.init('dwXD0GjwbSf8IGsMb');
  })();
  function sendEmails() {
    var senderEmail = document.getElementById("senderEmail").value;
    var message = document.getElementById("message").value;
    var subject = document.getElementById("subject").value;
    var validEmails = [];
    var invalidEmails = [];
    var file = document.getElementById("csvFile").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      var csv = event.target.result;
      var lines = csv.split('\n');
      for (var i = 0; i < lines.length; i++) {
        var email = lines[i].trim();
        var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
        if (emailRegex.test(email)) {
          validEmails.push(email);
        } else {
          invalidEmails.push(email);
        }
      }
      for (var j = 0; j < validEmails.length; j++) {
        var templateParams = {
          to_name: validEmails[j],
          from_name: senderEmail,
          message: message,
          subject: subject
        };
        emailjs.send('default_service', 'template_643tkoo', templateParams)
          .then(function(response) {
            console.log("SUCCESS", response);
          }, function(error) {
            console.log("FAILED", error);
          });
      }
      alert("Emails sent to valid email addresses.");
    };
  }
  document.getElementById("csvFile").addEventListener("change", function() {
    var validEmails = [];
    var invalidEmails = [];
    var file = document.getElementById("csvFile").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      var csv = event.target.result;
      var lines = csv.split('\n');
      for (var i = 0; i < lines.length; i++) {
        var email = lines[i].trim();
        var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
        if (emailRegex.test(email)) {
          validEmails.push(email);
        } else {
          invalidEmails.push(email);
        }
      }
      document.getElementById("validEmails").innerHTML = validEmails.join("<br><br>");
      document.getElementById("invalidEmails").innerHTML = invalidEmails.join("<br><br>");
      document.getElementById("validEmailCount").innerText = "(" + validEmails.length + ")";
      document.getElementById("invalidEmailCount").innerText = "(" + invalidEmails.length + ")";
    };
  });
  
