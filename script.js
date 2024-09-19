function validatePhoneNumber(input) {
  // Allow only numbers, '+', and '-' in the customer phone number input box
  input.value = input.value.replace(/[^0-9+\-\s]/g, "");
}
function disableSubmitButton() {
  const button1 = document.getElementById("submitpage");
  button1.disabled = true;
  button1.style.cursor = "not-allowed";
  button1.style.opacity = "0.3";
   
};


 function submitForm() {
 disableSubmitButton();
  const customerMobileNo = document.getElementById("customerMobileNo").value;
  const agentName = document.getElementById("agentName").value;
  const messageElement = document.getElementById("message");
  const formElement = document.getElementById("userForm");
  const headingElement = document.getElementById("formHeading");
  const senderr = customerMobileNo.substring(0, 8) + agentName.substring(0, 8);
  alret("Click OK to confirm that you are creating a ticket." + agentName) 

  // Validate form inputs
  if (!customerMobileNo || !agentName) {
    messageElement.textContent = "Please fill in both fields.";
    messageElement.style.color = "red";
    messageElement.style.display = "block";
    return;
  }
  // Prepare data for API call
  const data = {
    botId: "x1713349982667",
    sender: senderr,
    data: {
      event: {
        code: "data-from-genesys",
        data: {
          name: agentName,
          phone: customerMobileNo,
        },
      },
    },
  };

  // Make the API call
  fetch("https://cloud.yellow.ai/integrations/sync/v1/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": "08NLNWKu00T0p--MiRECJvRkdng1j2lrbSNXrzE6",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        formElement.style.display = "none";
        headingElement.style.display = "none";
        messageElement.textContent = "Thank you for your submission!";
        messageElement.style.color = "green";
        messageElement.style.display = "block";
        setTimeout(function() {
                location.reload();
            }, 2000)
      } else {
        messageElement.textContent =
          "There was an error with your submission. Please try again...";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("API call failed:", error);
      messageElement.textContent =
        "There was an error with your submission. Please try again.";
      messageElement.style.color = "red";
      messageElement.style.display = "block";
    });
}
