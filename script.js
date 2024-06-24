function validatePhoneNumber(input) {
  // Allow only numbers, '+', and '-' in the customer phone number input box
  input.value = input.value.replace(/[^0-9+\-\s]/g, "");
}
const disableSubmitButton = () => {
  const button1 = document.getElementById("submitpage");
  const mobileCheck = document.getElementById("customerMobileNo").value;
  const agentCheck = document.getElementById("agentName").value;
   if (!mobileCheck || !agentCheck) {
  button1.disabled = true;
  button1.style.cursor = "not-allowed";
  button1.style.opacity = "0.3";
   }
};
 disableSubmitButton();

 function submitForm() {

  const customerMobileNo = document.getElementById("customerMobileNo").value;
  const agentName = document.getElementById("agentName").value;
  const messageElement = document.getElementById("message");
  const formElement = document.getElementById("userForm");
  const headingElement = document.getElementById("formHeading");
  const senderr = customerMobileNo.substring(0, 8) + agentName.substring(0, 8);

  // Validate form inputs
  if (!customerMobileNo || !agentName) {
    messageElement.textContent = "Please fill in both fields.";
    messageElement.style.color = "red";
    messageElement.style.display = "block";
    return;
  }

  // Prepare data for API call
  const data = {
    botId: "x1713349984836",
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
      "x-api-key": "4VJXybunT7tjarLxZj5x1izqrcFM3Nr-bhfV1TOi",
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
      } else {
        messageElement.textContent =
          "There was an error with your submission. Please try again.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
      }
    })
    .catch((error) => {
      messageElement.textContent =
        "There was an error with your submission. Please try again.";
      messageElement.style.color = "red";
      messageElement.style.display = "block";
    });
}
