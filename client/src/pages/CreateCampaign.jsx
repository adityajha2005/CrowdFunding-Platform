import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from '../context';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign, address } = useStateContext(); // Get createCampaign and address from context
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  // Initialize Web3 connection and listen for account changes (handled in the context)
  useEffect(() => {
    // You can put any additional setup needed here if required
    // The wallet connection logic is now handled in the StateContextProvider

    return () => {
      // Cleanup can go here if needed
    };
  }, []);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      alert('Please connect your Web3 wallet first.');
      return;
    }

    // Validate all required fields
    if (!form.name || !form.title || !form.description || !form.target || !form.deadline || !form.image) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate target amount is a valid number
    if (isNaN(parseFloat(form.target)) || parseFloat(form.target) <= 0) {
      alert('Please enter a valid target amount.');
      return;
    }

    // Validate deadline is in the future
    if (new Date(form.deadline).getTime() < new Date().getTime()) {
      alert('Deadline must be in the future.');
      return;
    }

    setIsLoading(true);
    try {
      // Verify image URL
      const imageExists = await new Promise((resolve) => {
        checkIfImage(form.image, (exists) => resolve(exists));
      });

      if (!imageExists) {
        alert('Please provide a valid image URL');
        setForm((prev) => ({ ...prev, image: '' }));
        setIsLoading(false);
        return;
      }

      // Create campaign
      await createCampaign({
        ...form,
        target: ethers.utils.parseUnits(form.target, 18)
      });

      alert('Campaign created successfully!');
      navigate('/');
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert(`Failed to create campaign: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {!address && ( // Check if wallet is connected
        <div className="w-full p-4 mb-4 bg-yellow-500 text-white rounded-lg">
          Please connect your Web3 wallet to create a campaign.
        </div>
      )}
      
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
          labelName="Campaign Image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton 
            btnType="submit"
            title={isLoading ? "Creating..." : "Submit new campaign"}
            styles="bg-[#1dc071]"
            disabled={isLoading || !address} // Use address from context to disable button if not connected
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
