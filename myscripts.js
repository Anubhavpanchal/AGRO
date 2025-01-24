 // File upload and drag & drop interactions
  // const dropArea = document.getElementById('dropArea');
  // const fileInput = document.createElement('input');
  // fileInput.type = 'file';
  // fileInput.multiple = true;
  // fileInput.style.display = 'none';
  // dropArea.appendChild(fileInput);

  // let uploadedImages = []; // Store Base64 strings of images

  // Handle click to trigger file input
  dropArea.addEventListener('click', () => {
      fileInput.click();
  });

  // Handle file selection
  fileInput.addEventListener('change', handleFiles);

  // Handle file drop
  dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.classList.remove('dragging');
      handleFiles({ target: { files: e.dataTransfer.files } });
  });

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, (e) => {
          e.preventDefault();
      });
  });

  // Visual effect on drag
  dropArea.addEventListener('dragover', () => {
      dropArea.classList.add('dragging');
  });

  dropArea.addEventListener('dragleave', () => {
      dropArea.classList.remove('dragging');
  });

  // Handle files (from input or drop)
  function handleFiles(e) {
      const files = e.target.files;

      if (files.length) {
          uploadedImages = []; // Clear previously stored images
          Array.from(files).forEach(file => {
              if (file.type.startsWith('image/')) {
                  const reader = new FileReader();
                  reader.onload = function (event) {
                      uploadedImages.push(event.target.result); // Store Base64 image
                      console.log("I got an image"); // Log confirmation
                  };
                  reader.readAsDataURL(file);
              }
          });

          // Save images to sessionStorage and navigate to the next page
          setTimeout(() => {
              sessionStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
              window.location.href = 'new_page.html';
          }, 500); // Delay for Base64 generation
      }
  }

  // Modal display and closing interactions
  const modal = document.getElementById('signUpModal');
  const signUpButton = document.getElementById('signUpButton');
  const closeBtn = document.querySelector('.close-btn');

  signUpButton.addEventListener('click', () => {
      modal.style.display = 'flex'; // Display as flex for centering
  });

  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  // Backend communication
  document.getElementById('uploadButton').addEventListener('click', async () => {
      const formData = new FormData();
      const imageFile = document.getElementById('imageInput').files[0];
      formData.append('image', imageFile);

      try {
          const response = await fetch('http://abcd-1234.ngrok.io/upload', {
              method: 'POST',
              body: formData,
          });
          const result = await response.json();
          document.getElementById('result').innerText = 'Prediction: ' + result.prediction;
      } catch (error) {
          console.error('Error:', error);
          document.getElementById('result').innerText = 'Failed to connect to backend.';
      }
  });
});

