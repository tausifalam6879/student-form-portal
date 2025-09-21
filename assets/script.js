document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    if(form){
        form.addEventListener("submit", function(e){
            const answers = document.querySelector("#answers").value;
            if(answers.trim() === ""){
                alert("Please enter your answers before submitting.");
                e.preventDefault();
            }
        });
    }
});
