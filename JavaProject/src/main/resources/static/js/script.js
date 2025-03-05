$(document).ready(function() {
    $('#reg-form').validate({
        rules: {
            firstName: {
                required: true,
                minlength: 4
            },
            lastName: {
                required: true,
                minlength: 4
            },
            userName: {
                required: true,
                minlength: 4
            },
            emailId: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20,

            },
            password2: {
                required: true,
                equalTo: "#password"
            },
        },
        messages: {
            password:   {
                required: "Please enter a password.",
                minlength: "Password must be at least 8 characters long."
            },
            password2: {
                equalTo: "Passwords do not match!"
            },
        },
        submitHandler: function(form) {
            let password = $('#password').val();
            let confirmPassword = $('#password2').val();
            if (password.trim() !== confirmPassword.trim()) {
                Swal.fire(
                    'Password does not match?',
                    'Try Again',
                    'question'
                )
            } else {
                let formData = new FormData(form);
                $.ajax({
                    url: "/doSignup",
                    type: 'POST',
                    data: formData,
                    success: function(data, textStatus, jqXHR) {
                        if (data.trim() === 'success') {
                            Swal.fire("Good job!", "Registered Successfully. We are going Redirect to Login Page!", "success")
                                .then((value) => {
                                    window.location = "/signin";
                                });
                        } else {
                            Swal.fire("Please Try Again ",data);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        Swal.fire("Something Went Wrong !!! Try Again!!");
                    },
                    processData: false,
                    contentType: false
                });
            }
        }
    });
});
function openModal(imageUrl, productName, productDescription, productPrice) {
    // Set product data in the modal
    document.getElementById('modalProductImage').src = imageUrl;
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductDescription').textContent = productDescription;
    document.getElementById('modalProductPrice').textContent = '$' + productPrice;

    // Show the modal
    document.getElementById('productModal').classList.remove('hidden');
}

// Close the modal when the "X" button is clicked
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('productModal').classList.add('hidden');
});

// Close the modal when clicking outside the modal content
document.getElementById('productModal').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('hidden');
    }
});