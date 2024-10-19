import React from 'react';
import Button from './button';

interface DonationConfirmationProps {
  trackDonationText: string;
  continueBrowsingText: string;
}

const DonationConfirmation: React.FC<DonationConfirmationProps> = ({
  trackDonationText,
  continueBrowsingText
}) => {
  return (
    <main className="flex overflow-hidden flex-col items-center px-20 pt-14 pb-28 text-center bg-white max-md:px-5 max-md:pb-24">
      <section className="flex flex-col ml-12 max-w-full w-[777px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/379f72f7059fd3f043ce3162f085258e14a09f17d9b3e543d86c66fdd82acb33?placeholderIfAbsent=true&apiKey=28e4f0274ca84e4c8ae5ae66ad5e0c1e"
          alt="Donation confirmation icon"
          className="object-contain self-center w-24 aspect-[0.97]"
        />
        <h1 className="mt-7 text-3xl leading-10 text-violet-950 max-md:max-w-full">
          Congratulations! <br /> Your donation was gone through!
        </h1>
        <div className="flex flex-col mt-4 ml-10 max-w-full w-[620px]">
          <p className="self-center text-base font-medium leading-7 text-slate-900 text-opacity-40 w-[464px] max-md:max-w-full">
            You will receive an email with tracking information once your donation have been spent.
          </p>
          <div className="flex flex-wrap gap-5 justify-between mt-14 text-lg leading-none max-md:mt-10 max-md:max-w-full">
            <Button variant="text" className="self-start mt-2.5 text-indigo-600">
              {trackDonationText}
            </Button>
            <Button variant="primary" className="px-6 py-2 text-white bg-indigo-600 rounded-[100px] max-md:px-5">
              {continueBrowsingText}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DonationConfirmation;