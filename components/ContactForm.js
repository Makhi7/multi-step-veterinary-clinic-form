
import React, {useState} from "react";

function ContactForm() {
    const [currentStep, setCurrentStep] = useState(1);
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleNextStep = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const handlePreviousStep = () => {
      setCurrentStep(currentStep - 1);
    };
  
    const handleSubmit = async () => {
      const formData = { name, email, message };
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log('Form data sent:', data);
      } catch (error) {
        console.error('Error sending form data:', error);
      }
    };
  
    const validateStepOne = () => {
      return name !== '' && email !== '';
    };
  
    const validateStepTwo = () => {
      return message !== '';
    };
  
    return (
      <div>
        {currentStep === 1 && (
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
  
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
  
            <button onClick={handleNextStep} disabled={!validateStepOne()}>
              Next
            </button>
          </div>
        )}
  
        {currentStep === 2 && (
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
  
            <button onClick={handlePreviousStep}>Previous</button>
            <button onClick={handleSubmit} disabled={!validateStepTwo()}>
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
  
export default ContactForm;