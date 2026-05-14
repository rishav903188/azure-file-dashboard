async function uploadFile() {

  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "Please select a file";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {

    const response = await fetch(
      "https://azure-upload-backend-f0ccf6hrckdrftev.centralindia-01.azurewebsites.net/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    status.innerText = data.message;

  } catch (error) {
    console.error(error);
    status.innerText = "Upload failed";
  }
}