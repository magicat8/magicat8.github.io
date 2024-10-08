from browser import document, alert

def submit_data(event):
    name_input = document["name"].value  # Get the value of the input field
    document["output"].text = f"Hello, {name_input}!"  # Display the personalized greeting
    alert("Button clicked!")  # Debugging alert

# Bind the submit_data function to the button click event
document["submit-button"].bind("click", submit_data)