Dropzone.options.mydz = {
    autoProcessQueue: false,
    uploadMultiple: true,
    maxFilesize: 500,
    parallelUploads: 100,
    maxFiles: 100,
    previewsContainer: ".dropzone-previews",
    dictRemoveFile: "Remove",
    // thumbnailWidth: 100,
    // thumbnailHeight: 100,

    addRemoveLinks: true,
    // acceptedFiles: "image/*,application/pdf,.psd"

    // The setting up of the dropzone
    init: function() {
        var myDropzone = this;

        // First change the button to actually tell Dropzone to process the queue.
        this.element.querySelector("input[type=submit]").addEventListener("click", function(e) {
          // Make sure that the form isn't actually being sent.
          e.preventDefault();
          e.stopPropagation();
          myDropzone.processQueue();
        });

        // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
        // of the sending event because uploadMultiple is set to true.
        this.on("sendingmultiple", function() {
          // Gets triggered when the form is actually being sent.
          // Hide the success button or the complete form.
        });
        this.on("successmultiple", function(files, response) {
            alert('successmultiple:' + response);

            window.location.replace('/postupload?files=' + response);
          // Gets triggered when the files have successfully been sent.
          // Redirect user or notify of success.
        });

        // this.on("success", function(files, response) {
        //     alert('success:' + response);

        //     files.previewTemplate.appendChild(document.createTextNode(response));

        //   // Gets triggered when the files have successfully been sent.
        //   // Redirect user or notify of success.
        // });


        this.on("errormultiple", function(files, response) {
          // Gets triggered when there was an error sending the files.
          // Maybe show form again, and notify user of error
        });

    }
};