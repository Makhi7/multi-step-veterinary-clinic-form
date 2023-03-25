
import React, {useState} from "react";

function ContactForm() {
    // the current step of the form
    const [currentStep, setCurrentStep] = useState(1);
  
    // form input set using the useState() from react
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petBreed, setPetBreed] = useState('');
  
    const [reasonForVisit, setReasonForVisit] = useState('');
    const [prefferedDateForAppointment, setPrefferedDate] = useState('');
  
    // Step controllers: to go to next step of form
    // or go to previous step of form
    const handleNextStep = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const handlePreviousStep = () => {
      setCurrentStep(currentStep - 1);
    };
  
  
    // After filling the data of form the submit button
    // that creates Post API
    const handleSubmit = async () => {
      const formData = { name, email, petName, petType, petBreed, reasonForVisit, prefferedDateForAppointment };
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
        alert('Form submitted successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error sending form data:', error);
        alert('Error submitting form data. Please try again later.');
      }
    };
  
  
    // Gates that check if the a step is filled with data
    const validateStepOne = () => {
      return name !== '' && email !== '';
    };
  
    const validateStepTwo = () => {
      return petName !== '' && petType !== '' && petBreed !== '';
    };


    const validateStepThree = () => {
      return reasonForVisit !== '' && prefferedDateForAppointment !== '';
    };
  
  
    // the form layout of each step
    return (
      <div className="max-w-xl mx-auto">
      {currentStep === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium mb-4">Step 1: Owner Information</h2>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name:</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className="flex justify-end space-x-2">
            <button onClick={handleNextStep} disabled={!validateStepOne()} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Next
            </button>
          </div>
        </div>
      )}
  
      {currentStep === 2 && (
      <div className="space-y-4">
        <h2 className="text-lg font-medium mb-4">Step 2: Pet Information</h2>
        
            <label htmlFor="pet-name" className="block text-gray-700 font-medium mb-1">
              Pet Name:
            </label>
            <input
              type="text"
              id="pet-name"
              value={petName}
              onChange={(event) => setPetName(event.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          
          
            <label htmlFor="pet-type" className="block text-gray-700 font-medium mb-1">
              Pet Type:
            </label>
            <input
              type="text"
              id="pet-type"
              value={petType}
              onChange={(event) => setPetType(event.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
      
            <label htmlFor="pet-breed" className="block text-gray-700 font-medium mb-1">
              Pet Breed:
            </label>
            <input
              type="text"
              id="pet-breed"
              value={petBreed}
              onChange={(event) => setPetBreed(event.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        

        <div className="mt-4 space-x-4">
          <button
            onClick={handlePreviousStep}
            className="px-4 py-2 bg-gray-400 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            Previous
          </button>

          <button
            onClick={handleNextStep}
            disabled={!validateStepTwo()}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${!validateStepTwo() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Next
          </button>
        </div>
      </div>
    )}

    {currentStep === 3 && (
      <div className="final-step">

          <h2 className="text-lg font-medium mb-4">Step 2: Appointment details</h2>

          <label htmlFor="appointment-reason" className="block text-gray-700 font-medium mb-1">Reason for Appointment:</label>
          <textarea
              id="appointment-reason"
              value={reasonForVisit}
              onChange={(event) => setReasonForVisit(event.target.value)}
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label htmlFor="set-appointment" className="block text-gray-700 font-medium mb-1">Set Apointment</label>
          <input 
            type="date"
            value={prefferedDateForAppointment}
            onChange={(event) => setPrefferedDate(event.target.value)}
            id="set-appointment"
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className ="mt-4 space-x-4">
            
              <button
                onClick={handlePreviousStep}
                className="px-4 py-2 bg-gray-400 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                Previous
              </button>

              <button onClick={handleSubmit} disabled={!validateStepThree()} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>

          </div>
        </div>
      ) }
    </div>
    );
  }
  
export default ContactForm;


